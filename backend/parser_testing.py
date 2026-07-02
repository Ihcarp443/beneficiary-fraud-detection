from pprint import pprint

from services.ocr.ocr_service import OCRService
from services.llm.llm_service import HfProvider
from services.parser.parser_service import ParserService
from services.parser.confidenceMerger import ConfidenceMerger

ocr = OCRService()

llm = HfProvider()

parser = ParserService(llm)
merger = ConfidenceMerger()

print("Running OCR...\n")

ocr_result = ocr.extract("passport-sample.pdf")

print("================ OCR TEXT ================")
print(ocr_result.full_text)

print("\n\nRunning Parser...\n")

parsed = parser.parse_application(
    ocr_result.full_text
)

print("================ PARSED JSON ================")

pprint(parsed, sort_dicts=False)

final = merger.merge(
    parsed,
    ocr_result
)

applicant=final.get("applicant")
for k,v in applicant.items():
    print(k,"---",v)