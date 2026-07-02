from types import SimpleNamespace


class RiskService:

    def calculate(self, findings):

        print("[Risk]")

        return SimpleNamespace(
            score=35,
            level="Medium"
        )