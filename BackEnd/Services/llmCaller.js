import fs from "fs";
import axios from 'axios';


export async function callFastApiModel(path, prompt) {
    const audioBuffer = fs.readFileSync(path);
    const base64Audio = audioBuffer.toString('base64');
  try {
    const response = await axios.post(process.env.FAST_API_URL + '/model', {
        "prompt": prompt,
        "audio_data": base64Audio
    });

    console.log('Response from FastAPI:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Error sending request:', error.response?.data || error.message);
  }
}
