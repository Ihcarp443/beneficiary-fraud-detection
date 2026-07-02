from rapidfuzz import fuzz

from .normalizers import Normalizer


class Comparators:

    @staticmethod
    def exact(a, b):

        return a == b


    @staticmethod
    def compare_name(a, b):

        a = Normalizer.normalize_name(a)
        b = Normalizer.normalize_name(b)

        if a is None or b is None:
            return False

        return fuzz.ratio(a, b) >= 90


    @staticmethod
    def compare_address(a, b):

        a = Normalizer.normalize_address(a)
        b = Normalizer.normalize_address(b)

        if a is None or b is None:
            return False

        return fuzz.ratio(a, b) >= 80


    @staticmethod
    def compare_date(a, b):

        a = Normalizer.normalize_date(a)
        b = Normalizer.normalize_date(b)

        return a == b


    @staticmethod
    def compare(method, a, b):

        if method == "name":
            return Comparators.compare_name(a, b)

        if method == "address":
            return Comparators.compare_address(a, b)

        if method == "date":
            return Comparators.compare_date(a, b)

        return Comparators.exact(a, b)