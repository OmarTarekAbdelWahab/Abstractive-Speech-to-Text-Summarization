import fastAPI from "../utility/fastAPI";



export const modelService = {
  async sendTextOnly(prompt: string): Promise<string> {
    try {
        const response = await fastAPI.post<any>('/model', JSON.stringify({prompt: prompt}));
        const data = response.data as { response: string };
        console.log("Response from model:", data.response);
        return data.response || "No response from model.";
    } catch (error) {
      throw new Error('Failed to send text');
    }
  },

  async sendAudioWithText(filename: string, content_type: string, audio_data: string, prompt: string): Promise<string> {
    try {
      const response = await fastAPI.post<any>('/upload', JSON.stringify({
            filename: filename,
            content_type: content_type,
            audio_data: audio_data,
            prompt: prompt
          }));
      const data = response.data as { response: string };
      console.log("Response from model:", data.response);
      return data.response || "No response from model.";
    } catch (error) {
      throw new Error('Failed to send audio with text');
    }
  }
};