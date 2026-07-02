from copy import deepcopy
import re


class ConfidenceMerger:

    @staticmethod
    def normalize(text):
        text = text.lower()
        text = re.sub(r"[^a-z0-9]", "", text)
        return text

    def merge(self, parsed_document, ocr_result):

        parsed_document = deepcopy(parsed_document)

        ocr_words = []

        for page in ocr_result.pages:
            for word in page.words:
                ocr_words.append(word)

        applicant = parsed_document.get("applicant", {})

        for field, data in applicant.items():

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

        matched_scores = []

        normalized_source = self.normalize(source_text)

        for word in ocr_words:

            normalized_word = self.normalize(word.text)

            if normalized_word in normalized_source:
                matched_scores.append(word.confidence)

        if not matched_scores:
            return None

        return round(
            sum(matched_scores) / len(matched_scores),
            4
        )