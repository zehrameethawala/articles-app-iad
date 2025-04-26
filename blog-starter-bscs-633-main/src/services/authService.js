const API_URL = "http://localhost:3000/auth";

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const updateProfile = async (profileData) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const updateProfilePicture = async (formData) => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3000/auth/profile-picture", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
  
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data.user));
    return data;
  };