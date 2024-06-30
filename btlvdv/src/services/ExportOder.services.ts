import { apiClient } from "../constant/api";
export const GetAllCartHistory = async (MaKH: number): Promise<any> => {
  const data = { MaKH }; // Đóng gói dữ liệu vào một đối tượng JSON
  try {
    const res = await apiClient?.post(`/api/HoaDonBan/GetListHistoryCart`, data);  
    return res?.data;
  } catch (error) {
    console.error("Error while fetching cart history:", error);
    throw error;
  }
};