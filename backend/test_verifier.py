from services.verifier.verifier_service import VerifierService
from services.risk.risk_service import RiskService
from services.llm.llm_service import LLMService


application = {
    "document_title": "Application Form",
    "document_type": "application",
    "fields": {'application_no': {'value': 'APP-2026-0001', 'source_text': 'APP-2026-0001', 'confidence': 0.992}, 
                  'application_date': {'value': '02 July 2026', 'source_text': '02 July 2026', 'confidence': 0.9968}, 
                  'full_name': {'value': 'Rahul Sharma', 'source_text': 'Rahul Sharma', 'confidence': 0.9994}, 
                  'fathers_name': {'value': 'Suresh Sharma', 'source_text': 'Suresh Sharma', 'confidence': 0.9998}, 
                  'date_of_birth': {'value': '12/06/1998', 'source_text': '12/06/1998', 'confidence': 0.9995}, 
                  'gender': {'value': 'Male', 'source_text': 'Male', 'confidence': 0.9707}, 
                  'aadhaar_number': {'value': '1234 5678 9012', 'source_text': '1234 5678 9012', 'confidence': 0.9993}, 
                  'pan_number': {'value': 'ABCDE1234F', 'source_text': 'ABCDE1234F', 'confidence': 0.9899}, 
                  'mobile_number': {'value': '9876543210', 'source_text': '9876543210', 'confidence': 0.9839}, 
                  'email_address': {'value': 'rahul.sharma@email.com', 'source_text': 'rahul.sharma@email.com', 'confidence': 0.9994}, 
                  'current_residential_address': {'value': 'Flat 203, Green Residency, Sector 21, Noida, Uttar Pradesh - 201301', 'source_text': 'Flat 203, Green Residency, Sector 21, Noida, Uttar Pradesh - 201301', 'confidence': 0.9962}, 
                  'permanent_address': {'value': 'Flat 203, Green Residency, Sector 21, Noida, Uttar Pradesh - 201301', 'source_text': 'Flat 203, Green Residency, Sector 21, Noida, Uttar Pradesh - 201301', 'confidence': 0.9962}, 
                  'occupation': {'value': 'Private Employee', 'source_text': 'Private Employee', 'confidence': 0.9999}, 
                  'employer': {'value': 'ABC Technologies Pvt. Ltd.', 'source_text': 'ABC Technologies Pvt. Ltd.', 'confidence': 0.9995}, 
                  'monthly_income': {'value': '₹45,000', 'source_text': '₹45,000', 'confidence': 0.9893}, 
                  'annual_income': {'value': '5,40,000', 'source_text': '5,40,000', 'confidence': 0.9703}, 
                  'bank_name': {'value': 'State Bank of India', 'source_text': 'State Bank of India', 'confidence': 0.9978}, 
                  'bank_branch': {'value': 'Sector 18 Noida', 'source_text': 'Sector 18 Noida', 'confidence': 1.0}, 
                  'account_number': {'value': '12345678901', 'source_text': '12345678901', 'confidence': 0.9993}, 
                  'ifsc': {'confidence': None}
            }
}


# supporting_documents = [

#     # -------------------------
#     # Aadhaar
#     # -------------------------
#     {
#         "document_title": "Aadhaar",
#         "document_type": "aadhaar",
#         "applicant": {
#             "full_name": {
#                 "value": "Rahul Sharma",
#                 "source_text": "RAHUL SHARMA",
#                 "confidence": 0.99
#             },
#             "aadhaar_number": {
#                 "value": "123412341234",
#                 "source_text": "1234 1234 1234",
#                 "confidence": 0.99
#             },
#             "address": {
#                 "value": "21 MG Road, Delhi",
#                 "source_text": "21 MG ROAD DELHI",
#                 "confidence": 0.94
#             }
#         }
#     },

#     # -------------------------
#     # Bank Statement
#     # -------------------------
#     {
#         "document_title": "Bank Statement",
#         "document_type": "bank_statement",
#         "applicant": {
#             "full_name": {
#                 "value": "Rahul Kumar Sharma",
#                 "source_text": "RAHUL K SHARMA",
#                 "confidence": 0.95
#             },
#             "address": {
#                 "value": "21 MG Road, Delhi",
#                 "source_text": "21 MG ROAD DELHI",
#                 "confidence": 0.96
#             }
#         }
#     },

#     # -------------------------
#     # PAN
#     # -------------------------
#     {
#         "document_title": "PAN Card",
#         "document_type": "pan",
#         "applicant": {
#             "full_name": {
#                 "value": "Rahul Sharma",
#                 "source_text": "RAHUL SHARMA",
#                 "confidence": 0.99
#             },
#             "date_of_birth": {
#                 "value": "1998-06-12",
#                 "source_text": "12/06/1998",
#                 "confidence": 0.98
#             }
#         }
#     }

# ]
supporting_documents=  [
    {'document_title': 'Aadhaar Card', 
     'owner': 'applicant', 
     'fields': {
         'full_name': {'value': 'Rahul Kumar', 'source_text': 'Rahul Kumar', 'confidence': 0.9989}, 
         'date_of_birth': {'value': '15/08/1995', 'source_text': '15/08/1995', 'confidence': 1.0}, 
         'gender': {'value': 'Male', 'source_text': 'Male', 'confidence': 0.9981}, 
         'aadhaar_number': {'value': '1234 5678 9012', 'source_text': '1234 5678 9012', 'confidence': 0.9997}
        }, 
         'document_type': 'aadhaar_card'}, 
    {'document_title': 'BSES Electricity Bill', 
     'owner': 'applicant', 
     'fields': {
         'utility_provider': {'value': 'BSES Rajdhani Power Limited', 'source_text': 'BSES Rajdhani Power Limited', 'confidence': 0.9999}, 
         'bill_month': {'value': 'May 2024', 'source_text': 'May 2024', 'confidence': 0.9937}, 
         'consumer_id': {'value': '20001234567', 'source_text': '20001234567', 'confidence': 1.0}, 
         'account_number': {'value': '1234567890', 'source_text': '1234567890', 'confidence': 0.9988}, 
         'customer_name': {'value': 'Rahul Kumar', 'source_text': 'Rahul Kumar', 'confidence': 0.998}, 
         'address': {'value': '123, Green Park New Delhi-110016', 'source_text': '123, Green Park\nNew Delhi-110016', 'confidence': 0.9982}, 
         'bill_date': {'value': '01/05/2024', 'source_text': '01/05/2024', 'confidence': 0.9997}, 
         'due_date': {'value': '15/05/2024', 'source_text': '15/05/2024', 'confidence': 0.9999}, 
         'total_amount_due': {'value': '1,234.00', 'source_text': '₹1,234.00', 'confidence': 0.9381}, 
         'amount_in_words': {'value': 'One Thousand Two Hundred Thirty Four Only', 'source_text': 'One Thousand Two Hundred Thirty Four Only', 'confidence': 0.9974}
         }, 
      'document_type': 'utility_bill'}, 
      {'document_title': 'Income Certificate', 
       'owner': 'applicant', 
       'fields': {'full_name': {'value': 'Rahul Kumar', 'source_text': 'Rahul Kumar', 'confidence': 0.9999}, 
                  'father_name': {'value': 'Suresh Kumar', 'source_text': 'Suresh Kumar', 'confidence': 0.9888}, 
                  'address': {'value': '123, Green Park, Lucknow, Uttar Pradesh - 226001', 'source_text': '123, Green Park, Lucknow, Uttar Pradesh - 226001', 'confidence': 0.9999}, 
                  'annual_income': {'value': '2,50,000', 'source_text': '2,50,000', 'confidence': 0.99}, 
                  'annual_income_words': {'value': 'Two Lakh Fifty Thousand Only', 'source_text': 'Two Lakh Fifty Thousand Only', 'confidence': 0.99}, 
                  'financial_year': {'value': '2023-2024', 'source_text': '2023-2024', 'confidence': 0.9942}, 
                  'issuing_authority': {'value': 'Tehsildar', 'source_text': 'Tehsildar', 'confidence': 0.9832}, 
                  'issue_date': {'value': '10/04/2024', 'source_text': '10/04/2024', 'confidence': 0.984}, 
                  'issuing_location': {'value': 'Lucknow', 'source_text': 'Lucknow', 'confidence': 0.9999}, 
                  'issuing_department': {'value': 'Revenue Department', 'source_text': 'REVENUE DEPARTMENT', 'confidence': 0.9966}, 
                  'issuing_government': {'value': 'Government of Uttar Pradesh', 'source_text': 'GOVERNMENT OF UTTAR PRADESH', 'confidence': 0.9687}
                  }, 
        'document_type': 'income_certificate'
        }, 
        {'document_title': 'Income Certificate', 
         'owner': 'applicant', 
         'fields': {'full_name': {'value': 'Rahul Kumar', 'source_text': 'Rahul Kumar', 'confidence': 0.9999}, 
                    'father_name': {'value': 'Suresh Kumar', 'source_text': 'Suresh Kumar', 'confidence': 0.9888}, 
                    'address': {'value': '123, Green Park, Lucknow, Uttar Pradesh - 226001', 'source_text': '123, Green Park, Lucknow, Uttar Pradesh - 226001', 'confidence': 0.9999}, 
                    'annual_income': {'value': '2,50,000', 'source_text': '2,50,000', 'confidence': 0.99}, 
                    'annual_income_words': {'value': 'Two Lakh Fifty Thousand Only', 'source_text': 'Two Lakh Fifty Thousand Only', 'confidence': 0.99}, 
                    'financial_year': {'value': '2023-2024', 'source_text': '2023-2024', 'confidence': 0.9942}, 
                    'issuing_authority': {'value': 'Tehsildar', 'source_text': 'Tehsildar', 'confidence': 0.9832}, 
                    'issue_date': {'value': '10/04/2024', 'source_text': '10/04/2024', 'confidence': 0.984}, 
                    'issue_location': {'value': 'Lucknow', 'source_text': 'Lucknow', 'confidence': 0.9999}, 
                    'issuing_department': {'value': 'REVENUE DEPARTMENT', 'source_text': 'REVENUE DEPARTMENT', 'confidence': 0.9966}, 
                    'issuing_government': {'value': 'GOVERNMENT OF UTTAR PRADESH', 'source_text': 'GOVERNMENT OF UTTAR PRADESH', 'confidence': 0.9687}}, 
                    'document_type': 'employment_letter'}
                ]
# [
#     {'document_title': 'Permanent Account Number Card', 
#      'owner': 'applicant', 
#      'fields': {
#          'permanent_account_number': {'value': 'ABCDE1234F', 'source_text': 'ABCDE1234F', 'confidence': 1.0}, 
#          'name': {'value': 'Rahul Sharma', 'source_text': 'Rahul Sharma', 'confidence': 0.9993}, 
#          'fathers_name': {'value': 'SURESH SHARMA', 'source_text': 'SURESH SHARMA', 'confidence': 0.9999}, 
#          'date_of_birth': {'value': '12/06/1998', 'source_text': '12/06/1998', 'confidence': 0.992}, 
#          'issuing_authority': {'value': 'INCOME TAX DEPARTMENT Government of India', 'source_text': 'INCOME TAX DEPARTMENT Government of India', 'confidence': 0.9917}
#          }, 
#     'document_type': 'pan'}
# ]


service = VerifierService()

result = service.verify(
    application,
    supporting_documents
)

print("\nVerification Results\n")
print("=" * 80)
print(result)

risk = RiskService()
risk = risk.calculate(result["findings"])

        # Example:
        #
        # {
        #   score: 82,
        #   level: "High"
        # }

        # ----------------------------------------------------
        # Step 7 : Generate AI Explanation
        # ----------------------------------------------------
llm = LLMService()
summary = llm.generate_summary(
    application,
    result,
    risk
)


# print("\nVerification Results\n")
# print("=" * 80)

# for r in result:
#     print(f"Field      : {r['field']}")
#     print(f"Status     : {r['status']}")
#     print(f"Application: {r['application_value']}")
#     print(f"Evidence   : {r['supporting_value']}")
#     # print(f"Document   : {r['document_type']}")
#     print("-" * 80)