import axiosInstance from "../../shared/axiosInstance";

export const getMySubmissions = async () => {
  const response = await axiosInstance.get("/submissions/me");
  return response.data;
};