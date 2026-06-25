import axiosInstance from "../../shared/axiosInstance";

export const runCode = async (data) => {
  const response = await axiosInstance.post("/run", data);
  return response.data;
};

export const submitCode = async (data) => {
  const response = await axiosInstance.post("/submit", data);
  return response.data;
};

export const reviewCode = async (code) => {
  const response = await axiosInstance.post("/ai-review", { code });
  return response.data;
};