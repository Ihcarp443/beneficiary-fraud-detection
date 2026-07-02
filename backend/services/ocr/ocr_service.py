import os

os.environ["PADDLE_PDX_ENABLE_MKLDNN_BYDEFAULT"] = "0"
os.environ["FLAGS_use_mkldnn"] = "0"

from paddleocr import PaddleOCR
import fitz
from PIL import Image
import io
import numpy as np

import pprint



from .ocr_result import (
    OCRResult,
    OCRPage,
    OCRWord,
)

class OCRService:

    def __init__(self):

        self.reader = PaddleOCR(
                lang="en",
                use_doc_orientation_classify=False,
                use_doc_unwarping=False,
                use_textline_orientation=False,
                enable_mkldnn=False,
            )

    def extract(self, pdf_path: str) -> OCRResult:
        print(f"[OCRService] Extracting text from {pdf_path}")

        document = fitz.open(pdf_path)

        pages = []
        
        for page in document:
        
            pix = page.get_pixmap(dpi=300)

            image_bytes = pix.tobytes("png")

            image = Image.open(io.BytesIO(image_bytes))

            pages.append(image)


        all_pages = []

        full_text = []

        total_confidence = 0

        total_words = 0

        for page_index, page in enumerate(pages):

            image_array = np.array(page)
            result = self.reader.predict(image_array)
            # result = self.reader.predict(page)

            page_words = []
            page_text = []
            page_confidence_sum = 0

            page_result = result[0]

            texts = page_result["rec_texts"]
            scores = page_result["rec_scores"]
            boxes = page_result["dt_polys"]

            for text, score, bbox in zip(texts, scores, boxes):
            
                page_words.append(
                    OCRWord(
                        text=text,
                        confidence=float(score),
                        bbox=bbox.tolist()
                    )
                )

                page_text.append(text)

                page_confidence_sum += float(score)
                total_confidence += float(score)
                total_words += 1

            confidence = (
                page_confidence_sum / len(page_words)
                if page_words
                else 0
            )

            all_pages.append(
                OCRPage(
                    page_number=page_index + 1,
                    text="\n".join(page_text),
                    confidence=confidence,
                    words=page_words,
                )
            )

            full_text.extend(page_text)

        average = (
            total_confidence / total_words
            if total_words
            else 0
        )
        print(f"[OCRService] Average confidence: {average:.4f}, full text length: {len(full_text)} characters")
        print(f"[OCRService] Total pages processed: {len(all_pages)}")
        return OCRResult(
            full_text="\n".join(full_text),
            average_confidence=average,
            pages=all_pages,
        )
