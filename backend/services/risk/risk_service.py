from types import SimpleNamespace


class RiskService:

    def calculate(self, findings):

        print("[Risk]",findings)

        score = 0
        reasons = []

        for finding in findings:

            status = finding["status"]
            importance = finding["importance"]
            authoritative = finding["authoritative"]
            field = finding["field"]

            # -----------------------------
            # VERIFIED
            # -----------------------------

            if status == "MATCH":

                if importance == "HIGH":
                    score -= 5

                continue

            # -----------------------------
            # MISMATCH
            # -----------------------------

            if status == "MISMATCH":

                if importance == "HIGH":
                    score += 40

                elif importance == "MEDIUM":
                    score += 20

                else:
                    score += 10

                reasons.append(
                    f"{field} does not match {finding['document']}"
                )

            # -----------------------------
            # MISSING
            # -----------------------------

            elif status == "MISSING":

                if authoritative:
                    score += 30
                else:
                    score += 15

                reasons.append(
                    f"{field} could not be verified"
                )

        score = max(score, 0)
        score = min(score, 100)

        if score >= 61:
            level = "HIGH"
        elif score >= 31:
            level = "MEDIUM"
        else:
            level = "LOW"

        print('score',score,level,reasons)

        return SimpleNamespace(
            score=score,
            level=level,
            reasons=reasons
        )