class LLMService:

    def generate_summary(
        self,
        application,
        findings,
        risk
    ):

        print("[LLM]")

        return f"""
Overall Risk : {risk.level}

Risk Score : {risk.score}

One discrepancy found.

Income does not match.
"""