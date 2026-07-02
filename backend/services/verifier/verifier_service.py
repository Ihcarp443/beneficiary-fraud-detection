class VerifierService:

    def verify(
        self,
        application,
        supporting_documents
    ):

        print("[Verifier]")

        return [
            {
                "field": "income",
                "status": "Mismatch",
                "application": 15000,
                "document": 14500
            }
        ]