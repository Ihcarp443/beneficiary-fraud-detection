import uuid
from pathlib import Path
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
        ) or f"ANALYSIS{str(uuid.uuid4())[:8]}"
        print(f"[AnalysisService] Created analysis {analysis_number} for user {user_id}")
                

        # ----------------------------------------------------
        # Step 2 : Store Uploaded Documents
        # ----------------------------------------------------
        app_ref = self.storage.save(
                user_id=user_id,
                analysis_uuid=analysis_uuid,
                analysis_number=analysis_number,
                document=application,
                document_type="application"
            )
        filename = Path(application.filename).stem
        print(f"[AnalysisService] Processing application document: {filename}")
        self.repository.save_document(
            analysis_uuid=analysis_uuid,
            user_id=user_id,
            document_type="application",
            document_name=filename,
            content_type=application.content_type,
            file_path=app_ref,
        )
        application_ref = {
                "ref": app_ref,
                "doc_type": filename
            }
        
        supporting_ocr = []

        for document in supporting_documents:
            filename = Path(document.filename).stem
            print(f"[AnalysisService] Processing supporting document: {filename}")
            ref = self.storage.save(
                user_id=user_id,
                analysis_uuid=analysis_uuid,
                analysis_number=analysis_number,
                document=document,
                document_type="supporting"
            )
            self.repository.save_document(
                analysis_uuid=analysis_uuid,
                user_id=user_id,
                document_type="supporting",
                document_name=filename,
                content_type=document.content_type,
                file_path=ref,
            )

            # ===========OCR FOR SUPPORT DOC===========
            supporting_ocr.append({
                "ocr": self.ocr.extract(ref),
                "document_type": filename
            })
        

        

        # ----------------------------------------------------
        # Step 3 : OCR
        # ----------------------------------------------------

        application_ocr = self.ocr.extract(application_ref["ref"])
        
        # OCR FOR SUPPORT DOC IS ALREADY DONE ABOVE IN THE LOOP

        # ----------------------------------------------------
        # Step 4 : Parse Documents
        # ----------------------------------------------------
        application_data = self.parser.parse_application(
            application_ocr,
            application_ref["doc_type"]
        )

        supporting_data = []
        for doc in supporting_ocr:
            supporting_data.append(
                self.parser.parse_document(
                    doc["ocr"],
                    doc["document_type"]
                )
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

        self.repository.save_analysis(
            analysis_uuid=analysis_uuid,
            analysis_number=analysis_number,
            user_id=user_id,
            verification_result=findings,
            risk_score=risk.score,
            risk_level=risk.level,
            llm_summary=summary,
            masked_report=masked_report,
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