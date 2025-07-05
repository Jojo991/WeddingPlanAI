import { pipeline, env } from '@huggingface/transformers';

env.allowLocalModels = false;
env.useBrowserCache = true;

let textToImagePipeline: any = null;

const initializeImagePipeline = async () => {
  if (!textToImagePipeline) {
    console.log('Initializing AI image generation pipeline...');
    textToImagePipeline = await pipeline(
      'text-to-image' as any,
      'Xenova/stable-diffusion-2-1-base',
      {
        device: 'cpu', // or 'webgpu' if available
        dtype: 'fp32',
      }
    );
  }
  return textToImagePipeline;
};

export const generateImageFromPrompt = async (prompt: string): Promise<string> => {
  try {
    console.log(`Generating image for prompt: "${prompt}"`);
    const generator = await initializeImagePipeline();

    const result = await generator(prompt, {
      num_inference_steps: 20,
      guidance_scale: 7.5,
      width: 512,
      height: 512,
    });

    console.log('Pipeline result:', result);

    if (Array.isArray(result) && result.length > 0) {
      return result[0]; // base64 string
    } else if (result?.images && Array.isArray(result.images) && result.images.length > 0) {
      return result.images[0];
    } else if (typeof result === 'string') {
      return result;
    } else {
      throw new Error('Unexpected pipeline result format');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return createFallbackImage(prompt);
  }
};

export const generateVideoThumbnail = async (prompt: string): Promise<string> => {
  const videoPrompt = `Cinematic wedding video thumbnail: ${prompt}`;
  return generateImageFromPrompt(videoPrompt);
};

const createFallbackImage = (prompt: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Failed to generate image', canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText(`Prompt: ${prompt}`, canvas.width / 2, canvas.height / 2 + 20);
  }

  return canvas.toDataURL('image/png');
};
