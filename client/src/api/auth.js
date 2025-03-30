import axios from "axios";

export const register = async (username, email, password) => {
  try {
    const response = await axios.post("/auth/register", {
      username,
      email,
      password,
    });
    const { user } = response.data;
    return user;
  } catch (error) {
    console.error("Error registering:", error);
    return Promise.reject(error?.response?.data?.message ?? "Error");
  }
};
