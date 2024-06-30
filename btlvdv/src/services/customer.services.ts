import { apiClient } from "../constant/api";
export const CustomerSearch = async (
    data: any,
  ): Promise<any> => {
    const res = await apiClient?.post(`/api/Khach/search`, data);  
    return res?.data;
  };