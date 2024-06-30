import { apiClient } from "../constant/api";
// Get the current date
const currentDate = new Date();
  
// Format the date to yyyy/MM/dd
const formattedDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');

export const Statistical = async (): Promise<any> => {
  
  const res = await apiClient?.get(`/api/ThongKe/ThongKeDoanhThu?fr_NgayTao=2021%2F11%2F29&to_NgayTao=${formattedDate}`);
  return res?.data;
};

export const TopCustomer = async():Promise<any> =>{
 const res = await apiClient?.post(`/api/ThongKe/ThongKe_Top_Cus?fr_NgayTao=2020%2F02%2F20&to_NgayTao=${formattedDate}`);
 return res?.data
}