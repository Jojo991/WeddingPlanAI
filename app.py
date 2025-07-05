import os
import io
import time
import base64
import uuid
import pathlib
from PIL import Image
from flask import Flask, request, jsonify, send_from_directory
from dotenv import load_dotenv

# Google Cloud & GenAI imports
from google.cloud import storage
from google import genai
from google.genai import types

# Load .env file relative to this file location
dotenv_path = pathlib.Path(__file__).parent.parent / '.env'
load_dotenv(dotenv_path)

# Optionally set ADC path environment variable if provided
GOOGLE_APPLICATION_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if GOOGLE_APPLICATION_CREDENTIALS:
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = GOOGLE_APPLICATION_CREDENTIALS

app = Flask(
    __name__,
    static_folder="../build",  # React build folder
    static_url_path="/"
)

LOCAL_IMAGE_DIR = os.path.join('static', 'generated_images')
os.makedirs(LOCAL_IMAGE_DIR, exist_ok=True)

API_KEY = os.environ.get("GOOGLE_API_KEY")
PROJECT_ID = os.environ.get("PROJECT_ID")
LOCATION = os.environ.get("GOOGLE_CLOUD_REGION", "us-central1")
GCS_BUCKET_NAME = os.environ.get("GCS_BUCKET_NAME")

MODEL_ID_IMAGE = 'gemini-2.0-flash-exp-image-generation'
MODEL_ID_VIDEO = "veo-3.0-generate-preview"

if not all([API_KEY, PROJECT_ID, GCS_BUCKET_NAME, LOCATION]):
    raise RuntimeError("Missing required environment variables. Check your .env file.")

try:
    gemini_image_client = genai.Client(api_key=API_KEY)
    print(f"Gemini Image Client initialized successfully for model: {MODEL_ID_IMAGE}")

    veo_video_client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
    print(f"Veo Video Client (Vertex AI) initialized successfully for project: {PROJECT_ID}")

    gcs_client = storage.Client(project=PROJECT_ID)
    print("Google Cloud Storage Client initialized successfully.")

except Exception as e:
    print(f"Error during client initialization: {e}")
    gemini_image_client = veo_video_client = gcs_client = None


def upload_bytes_to_gcs(image_bytes: bytes, bucket_name: str, destination_blob_name: str) -> str:
    if not gcs_client:
        raise ConnectionError("GCS client is not initialized.")

    bucket = gcs_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_string(image_bytes, content_type='image/png')

    gcs_uri = f"gs://{bucket_name}/{destination_blob_name}"
    print(f"Image successfully uploaded to {gcs_uri}")
    return gcs_uri


@app.route('/generate', methods=['POST'])
def generate_video_from_sketch():
    if not all([gemini_image_client, veo_video_client, gcs_client]):
        return jsonify({"error": "A server-side client is not initialized. Check server logs."}), 500

    if not request.json or 'image_data' not in request.json:
        return jsonify({"error": "Missing image_data in request"}), 400

    base64_image_data = request.json['image_data']
    user_prompt = request.json.get('prompt', '').strip()

    try:
        # Decode base64 image data (sketch)
        base64_data = base64_image_data.split(',', 1)[1] if ',' in base64_image_data else base64_image_data
        image_bytes = base64.b64decode(base64_data)
        sketch_pil_image = Image.open(io.BytesIO(image_bytes))

        default_prompt = "Convert this sketch into a photorealistic image as if it were taken from a real DSLR camera."
        prompt_to_use = user_prompt if user_prompt else default_prompt

        response = gemini_image_client.models.generate_content(
            model=MODEL_ID_IMAGE,
            contents=[prompt_to_use],
            config=types.GenerateContentConfig(response_modalities=['IMAGE'])
        )

        if not response.candidates:
            raise ValueError("Gemini image generation returned no candidates.")

        generated_image_bytes_base64 = None
        for part in response.candidates[0].content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith('image/'):
                generated_image_bytes_base64 = part.inline_data.data
                break

        if not generated_image_bytes_base64:
            raise ValueError("Gemini did not return an image in the response.")

        generated_image_bytes = base64.b64decode(generated_image_bytes_base64)
        print("Image generated successfully.")

        local_filename = f"generated-image-{uuid.uuid4()}.png"
        local_image_path = os.path.join(LOCAL_IMAGE_DIR, local_filename)
        with open(local_image_path, "wb") as f:
            f.write(generated_image_bytes)
        print(f"Image saved locally: {local_image_path}")

    except Exception as e:
        print(f"Error during Gemini image generation: {e}")
        return jsonify({"error": f"Failed to generate image: {e}"}), 500

    try:
        print("\n--- Uploading generated image to GCS ---")
        unique_id = uuid.uuid4()
        image_blob_name = f"images/generated-image-{unique_id}.png"
        output_gcs_prefix = f"gs://{GCS_BUCKET_NAME}/videos/"

        image_gcs_uri = upload_bytes_to_gcs(generated_image_bytes, GCS_BUCKET_NAME, image_blob_name)

        print("\n--- Generating video with Veo ---")
        default_video_prompt = "Animate this image. Add subtle, cinematic motion."
        video_prompt = user_prompt if user_prompt else default_video_prompt

        operation = veo_video_client.models.generate_videos(
            model=MODEL_ID_VIDEO,
            prompt=video_prompt,
            image=types.Image(gcs_uri=image_gcs_uri, mime_type="image/png"),
            config=types.GenerateVideosConfig(
                aspect_ratio="16:9",
                output_gcs_uri=output_gcs_prefix,
                duration_seconds=8,
                person_generation="allow_adult",
                enhance_prompt=True,
                generate_audio=True
            ),
        )

        timeout_seconds = 300
        start_time = time.time()
        while not operation.done:
            if time.time() - start_time > timeout_seconds:
                raise TimeoutError("Video generation timed out.")
            time.sleep(15)
            operation = veo_video_client.operations.get(operation)
            print(operation)

        print("Video generation operation complete.")

        if not operation.response or not operation.result.generated_videos:
            raise ValueError("Veo operation completed but returned no video.")

        video_gcs_uri = operation.result.generated_videos[0].video.uri
        video_blob_name = video_gcs_uri.replace(f"gs://{GCS_BUCKET_NAME}/", "")
        public_video_url = f"https://storage.googleapis.com/{GCS_BUCKET_NAME}/{video_blob_name}"

        return jsonify({
            "generated_video_url": public_video_url,
            "generated_image_local_path": local_image_path
        })

    except Exception as e:
        print(f"An error occurred during video generation: {e}")
        return jsonify({"error": f"Failed to generate video: {e}"}), 500


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
