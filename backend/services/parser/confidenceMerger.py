from copy import deepcopy
import re
from rapidfuzz import fuzz

class ConfidenceMerger:

    @staticmethod
    def normalize(text):
        text = text.lower()
        text = re.sub(r"[^a-z0-9]", "", text)
        return text

    def _match_special_fields(self, source_text, ocr_words):

        patterns = [
            r"\b\d{10}\b",                                     # Phone
            r"\b\d{2}-[A-Z]{3}-\d{4}\b",                       # Date (05-DEC-1975)
            r"\b\d{4}-\d{2}-\d{2}\b",                          # Date (1975-12-05)
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", # Email
            r"\b[A-Z][0-9]{7}\b",                             # Passport Number
        ]

        for pattern in patterns:

            matches = re.findall(pattern, source_text, flags=re.IGNORECASE)

            for match in matches:

                normalized_match = self.normalize(match)

                for word in ocr_words:

                    if self.normalize(word.text) == normalized_match:
                        return round(word.confidence, 4)

        return None

    def _fuzzy_match_confidence(self, source_text, ocr_words, threshold=90):

        best_score = 0
        best_confidence = None

        normalized_source = self.normalize(source_text)

        for word in ocr_words:

            normalized_word = self.normalize(word.text)

            if not normalized_word:
                continue

            score = fuzz.partial_ratio(
                normalized_word,
                normalized_source
            )

            if score > best_score:
                best_score = score
                best_confidence = word.confidence

        if best_score >= threshold:
            return round(best_confidence, 4)

        return None

    def merge(self, parsed_document, ocr_result):

        parsed_document = deepcopy(parsed_document)
        
        ocr_words = []

        for page in ocr_result.pages:
            ocr_words.extend(page.words)

        fields  = parsed_document.get("fields", {})

        for _, data in fields.items():

            source_text = data.get("source_text")

            if not source_text:
                data["confidence"] = None
                continue

            data["confidence"] = self._calculate_confidence(
                source_text,
                ocr_words
            )

        return parsed_document

    def _calculate_confidence(self, source_text, ocr_words):

        print(f"[ConfidenceMerger] Calculating confidence for source text: {source_text}")

        matched_scores = []

        normalized_source = self.normalize(source_text)

        # ----------------------------
        # Normal Matching
        # ----------------------------
        for word in ocr_words:

            normalized_word = self.normalize(word.text)

            if normalized_word and normalized_word in normalized_source:
                matched_scores.append(word.confidence)

        if matched_scores:
            return round(
                sum(matched_scores) / len(matched_scores),
                4
            )

        # ----------------------------
        # Fallback for special fields
        # ----------------------------
        confidence = self._match_special_fields(
            source_text,
            ocr_words
        )

        if confidence is not None:
            return confidence

        # ----------------------------
        # Final fallback: Fuzzy Match
        # ----------------------------
        return self._fuzzy_match_confidence(
            source_text,
            ocr_words
        )