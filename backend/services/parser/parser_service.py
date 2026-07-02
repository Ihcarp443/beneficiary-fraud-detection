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