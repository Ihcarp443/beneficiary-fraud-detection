import re


class Normalizer:

    @staticmethod
    def normalize_name(value):

        if value is None:
            return None

        value = value.strip()

        value = re.sub(r"\s+", " ", value)

        return value.lower()


    @staticmethod
    def normalize_date(value):

        if value is None:
            return None

        return value.strip()


    @staticmethod
    def normalize_phone(value):

        if value is None:
            return None

        return re.sub(r"\D", "", value)


    @staticmethod
    def normalize_pan(value):

        if value is None:
            return None

        return value.replace(" ", "").upper()


    @staticmethod
    def normalize_address(value):

        if value is None:
            return None

        return value.lower().strip()