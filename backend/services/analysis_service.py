import uuid

from models.analysis_result import AnalysisResult


class AnalysisService:

    def __init__(
        self,
        storage_service,
        ocr_service,
        parser_service,
        verifier_service,
        risk_service,
        llm_service,
        masking_service,
        repository
    ):
        self.storage = storage_service
        self.ocr = ocr_service
        self.parser = parser_service
        self.verifier = verifier_service
        self.risk = risk_service
        self.llm = llm_service
        self.masking = masking_service
        self.repository = repository

    def analyze(self, user_id, application, supporting_documents):

        # ----------------------------------------------------
        # Step 1 : Create Analysis
        # ----------------------------------------------------

        analysis_uuid = str(uuid.uuid4())

        analysis_number = self.repository.get_next_analysis_number(
            user_id
        )
                

        # ----------------------------------------------------
        # Step 2 : Store Uploaded Documents
        # ----------------------------------------------------

        application_ref = self.storage.save(
            user_id=user_id,
            analysis_id=analysis_number,
            document=application,
            document_type="application"
        )
        supporting_refs = []

        for document in supporting_documents:

            ref = self.storage.save(
                user_id=user_id,
                analysis_id=analysis_uuid,
                analysis_folder=analysis_number,
                document=document,
                document_type="supporting"
            )

            supporting_refs.append(ref)

        # ----------------------------------------------------
        # Step 3 : OCR
        # ----------------------------------------------------

        application_text = self.ocr.extract(application_ref)

        supporting_text = []

        for ref in supporting_refs:
            supporting_text.append(
                self.ocr.extract(ref)
            )

        # ----------------------------------------------------
        # Step 4 : Parse Documents
        # ----------------------------------------------------

        application_data = self.parser.parse_application(
            application_text
        )

        supporting_data = []

        for text in supporting_text:
            supporting_data.append(
                self.parser.parse_document(text)
            )

        # ----------------------------------------------------
        # Step 5 : Verification
        # ----------------------------------------------------

        findings = self.verifier.verify(
            application_data,
            supporting_data
        )

        # ----------------------------------------------------
        # Step 6 : Risk Assessment
        # ----------------------------------------------------

        risk = self.risk.calculate(findings)

        # Example:
        #
        # {
        #   score: 82,
        #   level: "High"
        # }

        # ----------------------------------------------------
        # Step 7 : Generate AI Explanation
        # ----------------------------------------------------

        summary = self.llm.generate_summary(
            application_data,
            findings,
            risk
        )

        # ----------------------------------------------------
        # Step 8 : Mask Sensitive Information
        # ----------------------------------------------------

        masked_report = self.masking.mask(
            summary
        )

        # ----------------------------------------------------
        # Step 9 : Persist Analysis
        # ----------------------------------------------------

        self.repository.save(
            analysis_id=analysis_id,
            application=application_data,
            supporting_documents=supporting_data,
            findings=findings,
            risk=risk,
            report=masked_report
        )

        # ----------------------------------------------------
        # Step 10 : Return Response
        # ----------------------------------------------------

        return AnalysisResult(
            analysis_id=analysis_uuid,
            risk_score=risk.score,
            risk_level=risk.level,
            findings=findings,
            summary=masked_report
        )