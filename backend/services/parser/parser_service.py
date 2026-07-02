<<<<<<< Updated upstream
class ParserService:

    def parse_application(self, text):

        print("[Parser] Parsing Application")

        return {
            "name": "Rahul Sharma",
            "dob": "12/04/1995",
            "income": 15000
        }

    def parse_document(self, text):

        print("[Parser] Parsing Supporting Document")

        return {
            "document_type": "BANK_STATEMENT",
            "name": "Rahul Sharma",
            "income": 14500
        }
=======
from langchain_core.output_parsers import JsonOutputParser

from .prompt import (
    APPLICATION_PROMPT,
    DOCUMENT_PROMPT,
)

# from llm.llm_service import HfProvider

class ParserService:

    def __init__(self, llm):
        self.llm = llm
        self.parser = JsonOutputParser()

    def _parse(self, prompt: str):

        response = self.llm.generate(prompt)

        if not response or not response.content:
            raise ValueError("LLM returned an empty response.")

        try:
            return self.parser.parse(response.content)

        except Exception as e:
            raise ValueError(
                f"Failed to parse LLM response:\n{response.content}"
            ) from e

    def parse_application(self, text: str):

        prompt = APPLICATION_PROMPT.format(
            OCR_TEXT=text
        )

        return self._parse(prompt)

    def parse_document(self, text: str):

        prompt = DOCUMENT_PROMPT.format(
            OCR_TEXT=text
        )

        return self._parse(prompt)
>>>>>>> Stashed changes
