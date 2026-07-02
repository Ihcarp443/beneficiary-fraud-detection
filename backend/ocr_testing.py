from services.ocr.ocr_service import OCRService

ocr = OCRService()

result = ocr.extract(
    "passport-sample.pdf"
)

print("==========================AVERAGE SCORE=========================")
print(result.average_confidence)

print("==========================FULL TEXT=========================")
print(result.full_text)


for page in result.pages:
    print("==========================PAGGE NO=========================")
    print(page.page_number)
    print("==========================CONFIDENCE=========================")
    print(page.confidence)
    print("==========================TEXT=========================")
    print(page.text)
    print("*******************************************************************************************************")