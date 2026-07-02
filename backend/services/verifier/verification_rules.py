# DOCUMENT_RULES = {
#     "aadhaar": {
#         "full_name": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "date_of_birth": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "address": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#     },

#     "pan": {
#         "full_name": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "date_of_birth": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "pan_number": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#     },

#     "bank_statement": {
#         "account_holder_name": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": False,
#         },
#         "account_number": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "ifsc_code": {
#             "compare": True,
#             "importance": "HIGH",
#             "authoritative": True,
#         },
#         "address": {
#             "compare": False,
#             "importance": "LOW",
#             "authoritative": False,
#         },
#     }
# }
DOCUMENT_RULES = {

    "application": {
        "full_name": {
            "required": True
        },
        "date_of_birth": {
            "required": True
        },
        "address": {
            "required": True
        },
        "income": {
            "required": True
        }
    },

    "aadhaar": {

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

        "address": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "address"
        }

    },

    "pan": {

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

        "pan_number": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "exact"
        }

    },

    "bank_statement": {

        "account_holder_name": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": False,
            "maps_to": "full_name",
            "method": "name"
        },

        "account_number": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "exact"
        },

        "ifsc_code": {
            "compare": True,
            "importance": "HIGH",
            "authoritative": True,
            "method": "exact"
        }

    }

}