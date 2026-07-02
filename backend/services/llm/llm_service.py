from langchain_huggingface import (
    ChatHuggingFace,
    HuggingFaceEndpoint,
)
from dotenv import load_dotenv
import os

load_dotenv()


class HfProvider:

    def __init__(self):

        endpoint = HuggingFaceEndpoint(
            repo_id="google/gemma-4-31B-it",
            huggingfacehub_api_token=os.getenv("HF_TOKEN"),
            max_new_tokens=1000,
        )

        self.model = ChatHuggingFace(llm=endpoint)

    def generate(self, prompt: str):
        return self.model.invoke(prompt)


class LLMService:

    def generate_summary(
        self,
        application,
        findings,
        risk
    ):

        print("[LLM]")

        return f"""
            Overall Risk : {risk.level}

            Risk Score : {risk.score}

            One discrepancy found.

            Income does not match.
        """