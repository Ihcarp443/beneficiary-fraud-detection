import os

class LocalStorageService:

    def __init__(self, upload_dir="uploads"):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    def save(
        self,
        user_id: str,
        analysis_uuid: str,
        analysis_number: str,
        document,
        document_type: str
    ):
        print(f"[LocalStorageService] Saving document for user {user_id}, analysis {analysis_uuid}, type {document_type}, filename {document.filename}")

        if document_type == "application":
            folder = "application"
        else:
            folder = "supporting_docs"

        base_path = os.path.join(
            self.upload_dir,
            str(user_id),
            folder,
            analysis_number
        )

        os.makedirs(base_path, exist_ok=True)

        file_path = os.path.join(
            base_path,
            document.filename
        )

        with open(file_path, "wb") as f:
            f.write(document.content)

        return file_path