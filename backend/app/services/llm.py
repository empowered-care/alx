import google.generativeai as genai
from groq import Groq
from app.core.config import settings
import os

class LLMService:
    def __init__(self):
        self.primary_llm = settings.PRIMARY_LLM
        
        # Setup Gemini
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
        else:
            self.gemini_model = None

        # Setup Groq
        if settings.GROQ_API_KEY:
            self.groq_client = Groq(api_key=settings.GROQ_API_KEY)
        else:
            self.groq_client = None

    async def get_completion(self, prompt: str) -> str:
        """
        Get completion from the configured primary LLM.
        """
        if self.primary_llm == "gemini" and self.gemini_model:
            try:
                response = self.gemini_model.generate_content(prompt)
                return response.text
            except Exception as e:
                return f"Gemini Error: {str(e)}"
        
        elif (self.primary_llm == "groq" or self.primary_llm == "grok") and self.groq_client:
            try:
                chat_completion = self.groq_client.chat.completions.create(
                    messages=[
                        {
                            "role": "user",
                            "content": prompt,
                        }
                    ],
                    model=settings.GROQ_MODEL_NAME,
                )
                return chat_completion.choices[0].message.content
            except Exception as e:
                return f"Groq Error: {str(e)}"
            
        return "No LLM configured or available."

    async def analyze_health_data(self, user_data: str) -> str:
        prompt = f"""
        As a clinical health assistant, analyze the following user health data and provide:
        1. Potential health risks (Hypertension, Diabetes, Burnout, etc.)
        2. Severity level (Low, Medium, High)
        3. Actionable wellness recommendations.

        User Data:
        {user_data}

        Format the output as a JSON-like structure.
        """
        return await self.get_completion(prompt)

llm_service = LLMService()
