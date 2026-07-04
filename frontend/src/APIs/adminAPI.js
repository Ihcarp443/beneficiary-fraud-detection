const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export const adminApi = {
  async getApplications() {
    const response = await fetch(`${API_BASE_URL}/results/all/ADMIN`);

    if (!response.ok) {
      throw new Error("Failed to fetch applications");
    }

    return response.json();
  },

  async getApplication(id) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch application");
    }

    return response.json();
  },

  async updateApplication(id, data) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update application");
    }

    return response.json();
  },

  async approveApplication(id, comment) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/approve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to approve application");
    }

    return response.json();
  },

  async declineApplication(id, comment) {
    const response = await fetch(`${API_BASE_URL}/applications/${id}/decline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    });

    if (!response.ok) {
      throw new Error("Failed to decline application");
    }

    return response.json();
  },
  async getApplicationDocuments (analysisUuid){
  try {
    // const response = await api.get(`/results/${analysisUuid}`);
    const response = await fetch(`/results/${analysisUuid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching application documents:", error);
    throw error;
  }
},
};


