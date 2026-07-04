from .verification_rules import DOCUMENT_RULES
from .comparators import Comparators

class VerifierService:

    def verify(self, application, supporting_documents):

        print("[Verifier] Starting verification process...")

        findings = []

        # Document-wise status
        document_summary = {}

        application_fields = application.get("fields", {})

        for document in supporting_documents:

            document_type = (
                document.get("document_type", "")
                .lower()
                .replace(" ", "_")
            )

            document_summary[document_type] = {
                "document": document_type,
                "matched": 0,
                "mismatched": 0,
                "missing": 0,
                "status": None,
                "severity": None
            }

        # ----------------------------------------------------
        # Verify every application field
        # ----------------------------------------------------

        for app_field, app_data in application_fields.items():

            app_value = app_data.get("value")

            print(f"\nChecking Application Field: {app_field}")

            for document in supporting_documents:

                document_type = (
                    document.get("document_type", "")
                    .lower()
                    .replace(" ", "_")
                )

                print(f"Document : {document_type}")

                rules = DOCUMENT_RULES.get(document_type, {})

                matched_document_field = None
                matched_rule = None

                # Find which document field maps to this application field
                for document_field, rule in rules.items():

                    target_field = rule.get("maps_to", document_field)

                    if isinstance(target_field, list):

                        if app_field in target_field:
                            matched_document_field = document_field
                            matched_rule = rule
                            break

                    else:

                        if target_field == app_field:
                            matched_document_field = document_field
                            matched_rule = rule
                            break

                if matched_document_field is None:
                    continue

                supporting_value = (
                    document
                    .get("fields", {})
                    .get(matched_document_field, {})
                    .get("value")
                )

                # ----------------------------
                # Field missing
                # ----------------------------

                if supporting_value is None:

                    findings.append(
                        {
                            "field": app_field,
                            "document": document_type,
                            "status": "NOT_FOUND",
                            "application_value": app_value,
                            "supporting_value": None,
                            "importance": matched_rule["importance"],
                            "authoritative": matched_rule["authoritative"]
                        }
                    )

                    document_summary[document_type]["missing"] += 1

                    continue

                # ----------------------------
                # Compare
                # ----------------------------

                matched = Comparators.compare(
                    matched_rule["method"],
                    app_value,
                    supporting_value
                )

                findings.append(
                    {
                        "field": app_field,
                        "document": document_type,
                        "status": "MATCH" if matched else "MISMATCH",
                        "application_value": app_value,
                        "supporting_value": supporting_value,
                        "importance": matched_rule["importance"],
                        "authoritative": matched_rule["authoritative"]
                    }
                )

                if matched:
                    document_summary[document_type]["matched"] += 1
                else:
                    document_summary[document_type]["mismatched"] += 1

        # ----------------------------------------------------
        # Calculate document status
        # ----------------------------------------------------

        for summary in document_summary.values():

            mismatch = summary["mismatched"]
            missing = summary["missing"]

            if mismatch == 0 and missing == 0:

                summary["status"] = "Verified"
                summary["severity"] = "Low"

            elif mismatch <= 1 and missing <= 1:

                summary["status"] = "Pending"
                summary["severity"] = "Medium"

            else:

                summary["status"] = "Rejected"
                summary["severity"] = "High"

        print("\nVerification Complete")
        print("Summarry",document_summary)

        
        return {
            "findings": findings,
            "document_summary": list(document_summary.values())
        }