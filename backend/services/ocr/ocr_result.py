from dataclasses import dataclass, field


@dataclass
class OCRWord:
    text: str
    confidence: float
    bbox: list


@dataclass
class OCRPage:
    page_number: int
    text: str
    confidence: float
    words: list[OCRWord] = field(default_factory=list)


@dataclass
class OCRResult:
    full_text: str
    average_confidence: float
    pages: list[OCRPage] = field(default_factory=list)