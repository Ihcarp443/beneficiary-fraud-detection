
from .verification_rules import DOCUMENT_RULES
from .comparators import Comparators


class VerifierService:

    def verify(
        self,
        application,
        supporting_documents
    ):

        print("[Verifier]")

        findings = []

        application_fields = application.get("applicant", {})

        for app_field, app_data in application_fields.items():

            app_value = app_data.get("value")

            for document in supporting_documents:

                document_type = (
                    document["document_type"]
                    .lower()
                    .replace(" ", "_")
                )

                rules = DOCUMENT_RULES.get(document_type, {})

                for document_field, rule in rules.items():

                    if not rule["compare"]:
                        continue

                    target_field = rule.get("maps_to", document_field)

                    if target_field != app_field:
                        continue

                    supporting_value = (
                        document
                        .get("applicant", {})
                        .get(document_field, {})
                        .get("value")
                    )

                    if supporting_value is None:
                        continue

                    matched = Comparators.compare(
                        rule["method"],
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
                            "importance": rule["importance"],
                            "authoritative": rule["authoritative"]
                        }
                    )

        return findings
# from verifier.verification_rules import DOCUMENT_RULES


# class VerifierService:

#     def verify(
#         self,
#         application,
#         supporting_documents
#     ):

#         print("[Verifier]")

#         findings = []

#         application_fields = application.get("applicant", {})

#         for field_name, app_field in application_fields.items():

#             application_value = app_field.get("value")

#             supporting_matches = []

#             for document in supporting_documents:

#                 document_type = (
#                     document.get("document_type", "")
#                     .lower()
#                     .replace(" ", "_")
#                 )

#                 rules = DOCUMENT_RULES.get(document_type, {})

#                 field_rule = rules.get(field_name)

#                 if not field_rule:
#                     continue

#                 if not field_rule["compare"]:
#                     continue

#                 supporting_field = (
#                     document
#                     .get("applicant", {})
#                     .get(field_name)
#                 )

#                 if not supporting_field:
#                     continue

#                 supporting_matches.append(
#                     {
#                         "document_type": document_type,
#                         "value": supporting_field.get("value"),
#                         "importance": field_rule["importance"],
#                         "authoritative": field_rule["authoritative"],
#                     }
#                 )

#             if not supporting_matches:

#                 findings.append(
#                     {
#                         "field": field_name,
#                         "status": "NO_SUPPORTING_EVIDENCE",
#                         "application": application_value,
#                         "documents": []
#                     }
#                 )

#                 continue

#             matched = False

#             for doc in supporting_matches:

#                 if (
#                     str(application_value).strip().lower()
#                     ==
#                     str(doc["value"]).strip().lower()
#                 ):

#                     matched = True
#                     break

#             findings.append(
#                 {
#                     "field": field_name,
#                     "status": "MATCH" if matched else "MISMATCH",
#                     "application": application_value,
#                     "documents": supporting_matches
#                 }
#             )

#         return findings