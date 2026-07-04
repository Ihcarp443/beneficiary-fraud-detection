import copy
import re


class MaskingService:

    # -----------------------------
    # Mask plain text
    # -----------------------------
    def mask(self, text: str) -> str:

        if not text:
            return text

        # Aadhaar
        text = re.sub(
            r"\b\d{4}\s?\d{4}\s?\d{4}\b",
            "XXXX XXXX XXXX",
            text,
        )

        # PAN
        text = re.sub(
            r"\b[A-Z]{5}[0-9]{4}[A-Z]\b",
            "XXXXX9999X",
            text,
        )

        # Phone
        text = re.sub(
            r"\b\d{10}\b",
            "XXXXXXXXXX",
            text,
        )

        # Email
        text = re.sub(
            r"[\w\.-]+@[\w\.-]+\.\w+",
            "*****@*****.***",
            text,
        )

        return text

    # -----------------------------
    # Mask parsed JSON
    # -----------------------------
    def mask_json(self, document: dict) -> dict:

        if not document:
            return document

        data = copy.deepcopy(document)

        fields = data.get("fields", {})

        for field_name, field in fields.items():

            value = field.get("value")

            if value is None:
                continue

            value = str(value)

            if field_name in {
                "full_name",
                "father_name",
                "mother_name"
            }:

                field["value"] = self._mask_name(value)

            elif field_name in {
                "aadhaar_number"
            }:

                field["value"] = self._mask_aadhaar(value)

            elif field_name in {
                "pan",
                "pan_number"
            }:

                field["value"] = self._mask_pan(value)

            elif field_name in {
                "mobile_number",
                "phone_number"
            }:

                field["value"] = self._mask_phone(value)

            elif field_name == "email_address":

                field["value"] = self._mask_email(value)

            elif "address" in field_name:

                field["value"] = self._mask_address(value)

            elif field_name == "account_number":

                field["value"] = self._mask_account(value)

        return data

    # ====================================================
    # Helper methods
    # ====================================================

    def _mask_name(self, name):

        parts = name.split()

        masked = []

        for part in parts:

            if len(part) <= 1:
                masked.append("*")
            else:
                masked.append(part[0] + "*" * (len(part) - 1))

        return " ".join(masked)

    def _mask_phone(self, phone):

        digits = re.sub(r"\D", "", phone)

        if len(digits) < 4:
            return "XXXXXXXXXX"

        return "XXXXXX" + digits[-4:]

    def _mask_email(self, email):

        if "@" not in email:
            return "*****"

        username, domain = email.split("@", 1)

        return username[:2] + "***@" + domain

    def _mask_aadhaar(self, aadhaar):

        digits = re.sub(r"\D", "", aadhaar)

        if len(digits) != 12:
            return "XXXX XXXX XXXX"

        return "XXXX XXXX " + digits[-4:]

    def _mask_pan(self, pan):

        if len(pan) != 10:
            return "XXXXX9999X"

        return pan[:2] + "XXXXX" + pan[-3:]

    def _mask_account(self, account):

        if len(account) <= 4:
            return "****"

        return "*" * (len(account) - 4) + account[-4:]

    def _mask_address(self, address):

        if len(address) < 12:
            return "******"

        return address[:10] + "..."