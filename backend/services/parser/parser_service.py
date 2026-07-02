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
        print("[ParserService] LLM response:", response.content[:100])

        if not response or not response.content:
            raise ValueError("LLM returned an empty response.")

        try:
            return self.parser.parse(response.content)

        except Exception as e:
            raise ValueError(
                f"Failed to parse LLM response:\n{response.content}"
            ) from e

    def parse_application(self, text: str):
        print("[ParserService] Parsing application text, text[0:100]:", text[:40])

        prompt = APPLICATION_PROMPT.format(
            OCR_TEXT=text
        )

        return self._parse(prompt)

    def parse_document(self, text: str):
        print("[ParserService] Parsing supporting document text, text[0:100]:", text[:40])

        prompt = DOCUMENT_PROMPT.format(
            OCR_TEXT=text
        )

        return self._parse(prompt)
