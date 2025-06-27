import fs from "fs";
import axios from 'axios';


export async function callModelAudioPrompt(path, prompt) {
    const audioBuffer = fs.readFileSync(path);
    const base64Audio = audioBuffer.toString('base64');
  try {
    const response = await axios.post(process.env.FAST_API_URL + '/audio', {
        "prompt": prompt,
        "audio_data": base64Audio
    });

    console.log('Response from FastAPI:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Error sending request:', error.response?.data || error.message);
  }
}

export async function callModelMessagePrompt(message, prompt) {

  try {
    const response = await axios.post(process.env.FAST_API_URL + '/message', {
        "prompt": prompt,
        "message": message
    });

    console.log('Response from FastAPI:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Error sending request:', error.response?.data || error.message);
  }
}
