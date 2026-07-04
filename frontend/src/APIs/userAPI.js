const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return {
      id: null,
      role: null,
    };
  }

  return JSON.parse(user);
};

export const userApi = {

submitApplication: async (applicationFile,supportingDocuments) => {
    const formData = new FormData();
    const {id,role} = getUser();
    
    formData.append("userId", id);
    // formData.append("role", role);

    formData.append(
        "application",
        applicationFile
    );

    supportingDocuments.forEach((file) => {
    formData.append("supporting_documents", file);
    });

    const response = await fetch(
        `${API_BASE_URL}/analyze`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        throw new Error("Analysis failed");
    }

    return response.json();
},

  async getMyApplications() {
    const { id, role } = getUser();

    const response = await fetch(`${API_BASE_URL}/applications/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return response.json();
  },

//   async uploadDocument(formData) {
//     const { id, role } = getUser();

//     formData.append("userId", id);
//     formData.append("role", role);

//     const response = await fetch(`${API_BASE_URL}/documents/upload`, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to upload document");
//     }

//     return response.json();
//   },
   async trackApplication(applicationId) {
    const { id, role } = getUser();

    const response = await fetch(`${API_BASE_URL}/applications/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId,
        userId: id,
        role,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch application");
    }

    return response.json();
  },
};