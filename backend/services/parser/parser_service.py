from langchain_core.output_parsers import JsonOutputParser

from .prompt import (
    APPLICATION_PROMPT,
    DOCUMENT_PROMPT,
)
from .confidenceMerger import ConfidenceMerger


# from llm.llm_service import HfProvider

class ParserService:

    def __init__(self, llm):
        self.llm = llm
        self.parser = JsonOutputParser()
        self.merger = ConfidenceMerger()

    def _parse(self, prompt: str):

        response = self.llm.generate(prompt)
        print("[ParserService] LLM response:", response.content)

        if not response or not response.content:
            raise ValueError("LLM returned an empty response.")

        try:
            return self.parser.parse(response.content)

        except Exception as e:
            raise ValueError(
                f"Failed to parse LLM response:\n{response.content}"
            ) from e

    def parse_application(self, ocr_result, doc_type):

        prompt = APPLICATION_PROMPT.format(
            OCR_TEXT=ocr_result.full_text
        )
        
        parsed = self._parse(prompt)
        parsed["document_type"] = doc_type
        return self.merger.merge(
            parsed,
            ocr_result
        )

    def parse_document(self, ocr_result,doc_type):

        prompt = DOCUMENT_PROMPT.format(
            OCR_TEXT=ocr_result.full_text
        )

        parsed = self._parse(prompt)
        parsed["document_type"] = doc_type
        return self.merger.merge(
            parsed,
            ocr_result
        )






# surname --- {'value': 'Gupta', 'source_text': 'Surname , GUPTA', 'confidence': 0.9519}
# given_name --- {'value': 'Rahul', 'source_text': 'Given name RAHUL', 'confidence': 0.9997}
# previous_name --- {'value': 'Rahulkumar Sureshbhai Gupta', 'source_text': 'RAHULKUMAR SURESHBHAI GUPTA', 'confidence': 0.9995}
# email_id --- {'value': 'rahulgupta@gmail.com', 'source_text': 'Email id rahulgupta@gmail.com', 'confidence': 0.993}
# phone_number --- {'value': '9725551212', 'source_text': 'PhNo 9725551212', 'confidence': None}
# mobile_number --- {'value': '9729998888', 'source_text': 'MobileNo 9729998888', 'confidence': None}
# date_of_birth --- {'value': '1975-12-05', 'source_text': 'Date of birth 05-DEC-1975', 'confidence': None}
# sex --- {'value': 'Male', 'source_text': 'Sex MALE', 'confidence': 0.9994}
# place_of_birth --- {'value': 'Surat', 'source_text': 'Place of birth SURAT', 'confidence': 1.0}
# country_of_birth --- {'value': 'Surat Gujarat', 'source_text': 'Country\nSURAT GUJARAT', 'confidence': 0.9999}
# eye_color --- {'value': 'Black', 'source_text': 'Colour of eyes\nBLACK', 'confidence': 1.0}
# height --- {'value': '156', 'source_text': 'Height\n156', 'confidence': 0.9718}
# hair_color --- {'value': 'Black', 'source_text': 'Color of Hair BLACK', 'confidence': 0.9975}
# distinguishing_marks --- {'value': 'Nil', 'source_text': 'Visible distinguishing marks, if any NIL', 'confidence': 0.9834}
# permanent_address --- {'value': '134 PARK AVENUE, APT A2\nALLEN, TX 75002', 'source_text': 'Permanent Address :\n134 PARK AVENUE, APT A2\nALLEN, TX 75002', 'confidence': 0.9902}
# other_address --- {'value': '423 SUDARSHAN SOCIETY\nADAJAN PATIA\nSURAT 390 032', 'source_text': 'Other Adress\n423 SUDARSHAN SOCIETY\nADAJAN PATIA\nSURAT 390 032', 'confidence': 0.9999}
# father_name --- {'value': 'Suresh Gupta', 'source_text': 'Name of Father\nSURESH GUPTA', 'confidence': 1.0}
# father_country_of_birth --- {'value': 'India', 'source_text': 'Country of his birth INDIA', 'confidence': 0.9995}
# mother_name --- {'value': 'Sarita Gupta', 'source_text': 'Name of MotherSARITA GUPTA', 'confidence': None}
# mother_country_of_birth --- {'value': 'India', 'confidence': None}
