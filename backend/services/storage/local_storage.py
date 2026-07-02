import os

class LocalStorage:

    def __init__(self, upload_dir="uploads"):
        self.upload_dir = upload_dir
        os.makedirs(self.upload_dir, exist_ok=True)

    def save(
        self,
        user_id: str,
        analysis_id: str,
        document_type: str,
        document,
        analysis_folder: str | None = None
    ):

        if document_type == "application":
            folder = "application"
        else:
            folder = "supporting_docs"

        base_path = os.path.join(
            self.upload_dir,
            user_id,
            analysis_id,
            analysis_folder,
            folder
        )

        os.makedirs(base_path, exist_ok=True)

        file_path = os.path.join(
            base_path,
            document.filename
        )

        with open(file_path, "wb") as f:
            f.write(document.content)

        return file_path