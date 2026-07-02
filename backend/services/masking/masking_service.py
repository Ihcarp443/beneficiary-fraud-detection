class MaskingService:

    def mask(self, report):

        print("[Masking]")

        return report.replace(
            "Rahul Sharma",
            "R**** Sharma"
        )