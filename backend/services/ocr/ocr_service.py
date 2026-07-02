class OCRService:

    def extract(self, document_path):
        print(f"[OCR] {document_path}")

        return f"""
        OCR text extracted from

        {document_path}

        Name : Rahul Sharma

        DOB : 12/04/1995

        Income : 15000
        """