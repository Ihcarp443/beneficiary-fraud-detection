DOCUMENT_RULES = {

    # ---------------------------------------------------------
    # Application (reference only)
    # ---------------------------------------------------------
    "application": {

        "application_no": {"required": True},
        "date": {"required": True},

        "full_name": {"required": True},
        "father_name": {"required": True},
        "date_of_birth": {"required": True},
        "gender": {"required": True},

        "aadhaar_number": {"required": True},
        "pan_number": {"required": True},

        "mobile_number": {"required": True},
        "email_address": {"required": True},

        "current_residential_address": {"required": True},
        "permanent_address": {"required": True},

        "occupation": {"required": True},
        "employer": {"required": True},

        "monthly_income": {"required": True},
        "annual_income": {"required": True},

        "bank_name": {"required": True},
        "branch": {"required": True},
    },

    # ---------------------------------------------------------
    # Aadhaar
    # ---------------------------------------------------------
    "aadhaar": {

        "aadhaar_number": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "exact"
        },

        "full_name": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "name"
        },

        "date_of_birth": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "date"
        },

        "gender": {
            "compare": True,
            "importance": "MEDIUM",
            "authoritative": True,
            "method": "exact"
        },

        "address": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "maps_to": "permanent_address",
            "method": "address"
        },

        "city": {
            "compare": False
        },

        "state": {
            "compare": False
        },

        "pincode": {
            "compare": False
        }
    },

    # ---------------------------------------------------------
    # PAN
    # ---------------------------------------------------------
    "pan": {

        "pan": {
            "compare": True,
            "maps_to": "pan_number",
            "importance": "HIGH",
            "authoritative": True,
            "method": "exact"
        },

        "full_name": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "name"
        },

        "fathers_name": {
            "compare": True,
            "maps_to": "father_name",
            "importance": "MEDIUM",
            "authoritative": True,
            "method": "name"
        },

        "date_of_birth": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "date"
        },

        "issuing_authority": {
            "compare": False
        }
    },

    # ---------------------------------------------------------
    # Bank Statement
    # ---------------------------------------------------------
    "bank_statement": {

        "account_holder_name": {
            "compare": True,
            "maps_to": "full_name",
            "importance": "HIGH",
            "authoritative": False,
            "method": "name"
        },

        "bank_name": {
            "compare": True,
            "maps_to": "bank_name",
            "importance": "MEDIUM",
            "authoritative": True,
            "method": "text"
        },

        "branch": {
            "compare": True,
            "maps_to": "branch",
            "importance": "LOW",
            "authoritative": True,
            "method": "text"
        },

        "account_number": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "numeric"
        },

        "ifsc_code": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": False,
            "method": "numeric"
        },

        "monthly_income": {
            "compare": True,
            "maps_to": "monthly_income",
            "importance": "HIGH",
            "authoritative": False,
            "method": "numeric"
        }
    }
}
