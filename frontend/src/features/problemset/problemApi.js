import axiosInstance from "../../shared/axiosInstance";

export const getAllProblems = async () => {
  const response = await axiosInstance.get("/problems");
  return response.data;
};

export const getProblemById = async (id) => {
  const response = await axiosInstance.get(`/problems/${id}`);
  return response.data;
};