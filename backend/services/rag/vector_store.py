from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings

embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5"
)

vector_store = Chroma(
    collection_name="beneficiary_analysis",
    embedding_function=embeddings,
    persist_directory="./vector_db"
)