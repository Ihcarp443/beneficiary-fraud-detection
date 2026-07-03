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

    def analyze(self, user_id, application, supporting_documents,doc_type="abc"):

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

        application_ref = self.storage.save(
                user_id=user_id,
                analysis_uuid=analysis_uuid,
                analysis_number=analysis_number,
                document=application,
                document_type="application"
            )
        
        self.repository.save_document(
            analysis_uuid=analysis_uuid,
            user_id=user_id,
            document_type="application",
            document_name=application.filename,
            content_type=application.content_type,
            file_path=application_ref,
        )

        
        supporting_refs = []

# ===============SUPPORTING DOC TYPE have to dicsuss================

#         supporting_documents = [
#              {
#                  "file": aadhaar_file,
#                  "document_type": "aadhaar"
#              },
#              {
#                  "file": pan_file,
#                  "document_type": "pan"
#              }
#       ]
        for document in supporting_documents:

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
                document_name=document.filename,
                content_type=document.content_type,
                file_path=ref,
            )

            supporting_refs.append(ref)

        

        

        # ----------------------------------------------------
        # Step 3 : OCR
        # ----------------------------------------------------

        application_ocr = self.ocr.extract(application_ref)

        supporting_ocr = []

        for ref in supporting_refs:

            supporting_ocr.append(
                self.ocr.extract(ref)
            )

        # ----------------------------------------------------
        # Step 4 : Parse Documents
        # ----------------------------------------------------

        # application_data = self.parser.parse_application(
        #         application_ocr
        #     )
        if doc_type == "":
            application_data = self.parser.parse_application(
                    application_ocr
                )
        else:
            application_data = self.parser.parse_document(
                    application_ocr,doc_type
                )

        supporting_data = []

        for doc in supporting_ocr:
            supporting_data.append(
                self.parser.parse_document(
                    application_ocr,
                    doc_type
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