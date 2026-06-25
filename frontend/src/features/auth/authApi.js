import axiosInstance from "../../shared/axiosInstance";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};