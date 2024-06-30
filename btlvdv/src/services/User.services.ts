import { apiClient } from "../constant/api";

export const getChiTietTaiKhoan = async (data:any): Promise<any> => {  
  const res = await apiClient?.post(`https://localhost:44381/api/UserControllers/GetChiTietTaiKhoan?MaTK=`+data);
  return res?.data;
};