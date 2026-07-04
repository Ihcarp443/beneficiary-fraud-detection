const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const getUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return {
      userId: null,
      type: null,
    };
  }

  return JSON.parse(user);
};

export const userApi = {
  async submitApplication(data) {
    const { userId, type } = getUser();

    const response = await fetch(`${API_BASE_URL}/applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        userId,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit application");
    }

    return response.json();
  },

  async getMyApplications() {
    const { userId, type } = getUser();

    const response = await fetch(`${API_BASE_URL}/applications/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return response.json();
  },

  async uploadDocument(formData) {
    const { userId, type } = getUser();

    formData.append("userId", userId);
    formData.append("type", type);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload document");
    }

    return response.json();
  },
   async trackApplication(applicationId) {
    const { userId, type } = getUser();

    const response = await fetch(`${API_BASE_URL}/applications/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId,
        userId,
        type,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch application");
    }

    return response.json();
  },
};