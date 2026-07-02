from services.verifier.verifier_service import VerifierService


application = {
    "document_title": "Application Form",
    "document_type": "application",
    "applicant": {
        "full_name": {
            "value": "Rahul Sharma",
            "source_text": "RAHUL SHARMA",
            "confidence": 0.98
        },
        "date_of_birth": {
            "value": "1998-06-12",
            "source_text": "12/06/1998",
            "confidence": 0.96
        },
        "aadhaar_number": {
            "value": "123412341234",
            "source_text": "1234 1234 1234",
            "confidence": 0.99
        },
        "phone_number": {
            "value": "9876543210",
            "source_text": "9876543210",
            "confidence": 0.97
        },
        "address": {
            "value": "21 MG Road, Delhi",
            "source_text": "21 MG ROAD DELHI",
            "confidence": 0.93
        }
    }
}


supporting_documents = [

    # -------------------------
    # Aadhaar
    # -------------------------
    {
        "document_title": "Aadhaar",
        "document_type": "aadhaar",
        "applicant": {
            "full_name": {
                "value": "Rahul Sharma",
                "source_text": "RAHUL SHARMA",
                "confidence": 0.99
            },
            "aadhaar_number": {
                "value": "123412341234",
                "source_text": "1234 1234 1234",
                "confidence": 0.99
            },
            "address": {
                "value": "21 MG Road, Delhi",
                "source_text": "21 MG ROAD DELHI",
                "confidence": 0.94
            }
        }
    },

    # -------------------------
    # Bank Statement
    # -------------------------
    {
        "document_title": "Bank Statement",
        "document_type": "bank_statement",
        "applicant": {
            "full_name": {
                "value": "Rahul Kumar Sharma",
                "source_text": "RAHUL K SHARMA",
                "confidence": 0.95
            },
            "address": {
                "value": "21 MG Road, Delhi",
                "source_text": "21 MG ROAD DELHI",
                "confidence": 0.96
            }
        }
    },

    # -------------------------
    # PAN
    # -------------------------
    {
        "document_title": "PAN Card",
        "document_type": "pan",
        "applicant": {
            "full_name": {
                "value": "Rahul Sharma",
                "source_text": "RAHUL SHARMA",
                "confidence": 0.99
            },
            "date_of_birth": {
                "value": "1998-06-12",
                "source_text": "12/06/1998",
                "confidence": 0.98
            }
        }
    }

]


service = VerifierService()

result = service.verify(
    application,
    supporting_documents
)

print("\nVerification Results\n")
print("=" * 80)

for r in result:
    print(f"Field      : {r['field']}")
    print(f"Status     : {r['status']}")
    print(f"Application: {r['application_value']}")
    print(f"Evidence   : {r['supporting_value']}")
    # print(f"Document   : {r['document_type']}")
    print("-" * 80)