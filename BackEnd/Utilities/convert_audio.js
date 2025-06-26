// convertAudio.js
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { tmpdir } from 'os';
import { join } from 'path';
import { writeFile, readFile, unlink } from 'fs/promises';
import crypto from 'crypto';

/**
 * Convert a base64-encoded or raw Buffer of webm audio to a wav Buffer.
 * @param {Buffer} webmBuffer - Raw webm audio buffer
 * @returns {Promise<Buffer>} - Converted wav buffer
 */
export async function convertWebmBufferToWav(webmBuffer, outputPath) {
  const tmpInput = join(tmpdir(), `input-${crypto.randomUUID()}.webm`);
  console.log("Converting webm to wav...", tmpInput, outputPath);
  try {
    // Save buffer to a temporary file
    await writeFile(tmpInput, webmBuffer);

    // Run ffmpeg to convert to .wav
    await new Promise((resolve, reject) => {
      ffmpeg(tmpInput)
        .toFormat('wav')
        .on('error', reject)
        .on('end', resolve)
        .save(outputPath);
    });

    // Read the result back into a Buffer
    const wavBuffer = await readFile(outputPath);
    return wavBuffer;
  } finally {
    // Clean up temporary files
    await Promise.allSettled([
      unlink(tmpInput)
    ]);
  }
}
