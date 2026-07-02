from services.analysis_service import AnalysisService
from services.storage.local_storage import LocalStorageService
from services.ocr.ocr_service import OCRService
from services.parser.parser_service import ParserService
from services.verifier.verifier_service import VerifierService
from services.risk.risk_service import RiskService
from services.llm.llm_service import LLMService
from services.masking.masking_service import MaskingService
from services.repository.analysis_repository import AnalysisRepository

analysis_service = AnalysisService(
    storage_service=LocalStorageService(),
    ocr_service=OCRService(),
    parser_service=ParserService(),
    verifier_service=VerifierService(),
    risk_service=RiskService(),
    llm_service=LLMService(),
    masking_service=MaskingService(),
    repository=AnalysisRepository()
)