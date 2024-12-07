import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() { 
    this.genAI = new GoogleGenerativeAI('');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' })
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response =  await result.response;
      console.log("Gem Response: ", response);
      return response.text();
    } catch (error) {
      console.error('Error generating respon', error);
      return 'Sorry: Error generating respon';
    }
  }
}
