# APPLICATION_PROMPT='''
# You are an expert document information extraction engine for a Beneficiary Fraud Detection System.

# Your task is to analyze the OCR text extracted from an application form and convert it into a structured JSON object 
# Return ONLY valid JSON. No markdown. No explanation.

# The OCR text may contain:
# - OCR mistakes
# - Missing spaces
# - Broken lines
# - Watermarks
# - Noise
# - Empty fields
# - Decorative text

# Your job is to understand the document and extract all information that could later be used for identity verification or fraud detection.

# ------------------------------------
# IMPORTANT RULES
# ------------------------------------

# 1. Return ONLY valid JSON.
# Do not return markdown.
# Do not explain anything.

# 2. Detect the application type and generate a human-readable document title.

# Examples:
# - Indian Passport Application
# - Beneficiary Registration Form
# - Scholarship Application Form
# - Pension Application
# - Insurance Claim Form
# - Loan Application Form

# 3. Return the document type.

# Examples:
# passport_application
# beneficiary_application
# scholarship_application
# loan_application
# insurance_application

# 4. Every extracted field MUST have the following structure:

# {{
#     "value": ...,
#     "source_text": ...,
# }}

# 5. "value"

# Return the normalized value.

# Examples:

# 05-DEC-1975
# →
# 1975-12-05

# RAHUL GUPTA
# →
# Rahul Gupta

# 6. "source_text"

# This is VERY IMPORTANT.

# Copy the ORIGINAL OCR text exactly as it appeared.

# Do NOT:
# - correct OCR mistakes
# - rewrite text
# - fix capitalization
# - remove spaces
# - insert spaces

# The source_text MUST be an exact substring of the OCR input.

# Example:

# OCR

# Surname , GUPTA
# Given name RAHUL

# Return

# {{
#     "value":"Rahul Gupta",
#     "source_text":"Surname , GUPTA\nGiven name RAHUL",
#       "confidence":null
# }}

# 8. If a value is missing, return

# {{
#     "value": null,
#     "source_text": null,
#      "confidence":null
# }}

# 9. Never invent information.

# 10. Ignore decorative text such as:

# SAMPLE
# SPECIMEN
# COPY
# DO NOT ACCEPT
# WATERMARK
# IMMIHELP

# 11. Normalize dates into YYYY-MM-DD.

# 12. Keep names in Proper Case.

# 13. Preserve addresses exactly as written except for obvious OCR mistakes.

# 14. Extract every useful field present in the document. Do not limit yourself to a predefined set of fields.

# 15. Store every extracted field inside the "applicant" object.

# ------------------------------------
# Expected JSON Structure (example only)
# ------------------------------------

# {{
#     "document_title": "...",
#     "document_type": "...",
#     "applicant": {{
#         "<field_name>": {{
#             "value": "...",
#             "source_text": "...",
#             "confidence":null
#         }}
#     }}
# }}

# The field names inside "applicant" are NOT fixed.

# Create meaningful field names based on the document.

# Examples include:
# - full_name
# - father_name
# - mother_name
# - passport_number
# - email
# - phone
# - date_of_birth
# - address
# - nationality
# - occupation

# Extract every useful field you can identify.

# If a field cannot be confidently determined from the OCR text, return

# {
#     "value": null,
#     "source_text": null,
#     "confidence":null
# }

# Do not guess or infer missing values.

# ------------------------------------
# OCR TEXT
# ------------------------------------

# {OCR_TEXT}
# '''


APPLICATION_PROMPT = """
You are an expert document parser for a Beneficiary Fraud Detection System.

Your task is to convert OCR text from an application document into structured JSON.

Return ONLY valid JSON.
No markdown.
No explanation.

Rules:

- Detect the application type.
- Generate a human readable document_title.
- Generate a machine readable document_type.
- Extract every useful applicant field that may later be verified.
- Do not limit yourself to predefined fields.
- Ignore watermarks, sample text and decorative text.
- Never invent missing information.
-Only extract information explicitly present in the OCR text. Never infer, calculate, translate, or combine information from multiple unrelated sections.

Instruction:

-If multiple interpretations are possible,return null instead of guessing.
-Never infer values from nearby text.
-Only extract values explicitly present.
-Preserve the original OCR formatting,including line breaks,punctuationand spacing.
-Do not flatten multiple OCR lines into one.
-If a field label exists but the value appears to belong to another field, return null instead of guessing.
-Do not split joined words unless they are explicitly separated in the OCR.
-Extract every identifiable field. Do not stop after extracting common identity fields.

For source_text include the complete OCR label together with the extracted value whenever available.
-----
Good
----

Phone No 9876543210

Email id abc@gmail.com

Name of Father
SURESH GUPTA

Permanent Address :
134 PARK AVENUE

----
Bad
---
9876543210

abc@gmail.com

SURESH GUPTA

Normalize values:
- Names → Proper Case
- Dates → YYYY-MM-DD
- Emails, phone numbers, IDs → normalized when possible

Use snake_case for all JSON keys.

Examples:
full_name
date_of_birth
passport_number
father_name
address
phone_number

Each extracted field must have this structure:

{{
  "value": ...,
  "source_text": ...,
  "confidence":null
}}

Requirements:

- value = normalized value
- source_text = exact OCR text used to derive the value
- If unavailable:

{{
  "value": null,
  "source_text": null,
  "confidence":null
}}

Return JSON in this format:

{{
  "document_title": "...",
  "document_type": "...",
  "applicant": {{
      "<dynamic_field_name>": {{
          "value": "...",
          "source_text": "...",
      }}
  }}
}}

OCR TEXT:

{OCR_TEXT}
"""

DOCUMENT_PROMPT=""