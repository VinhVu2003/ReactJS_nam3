import { Breadcrumb, theme, Image, Space, Card, Statistic } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import DashboardCard from "../../shared/ad/Dashboard/DashboardCard";
import ProductSelling from "../../shared/ad/Dashboard/TableProductSelling";
import { useEffect, useState } from "react";
import { ProductSearch } from "../../services/product.services";
import { CustomerSearch } from "../../services/customer.services";
import { Statistical } from "../../services/statistical.services";
import TopCus from "../../shared/ad/Dashboard/TableTopCus";

// import ImgUser from "../assets/anh/admin.png";
// Argon Dashboard 2 MUI example components

const AdminHome = function () {
  const [totalPro, setTotalPro] = useState<number>(0);
  const [totalCus, setTotalCus] = useState<number>(0);
  const[totalCart,setTotalCart] = useState<any>(0);
  const[revenue,setRevenue] = useState<any>(0);
  const loadDataPro = async () => {
    let result = await ProductSearch({
      page: "1",
      pageSize: "100",
    });
    // console.log(result.data)
    const totalQty = result.data.reduce((sum: number, product: { soLuong: number }) => {
      return sum + product.soLuong;
    }, 0);
    setTotalPro(totalQty)
    // console.log(totalQty)
  };
  const loadDataCart = async()=>{
    let res = await Statistical();
    // console.log(res)
    setTotalCart(res.soDonHang)
    setRevenue(res.doanhThu)
  }
  const loadDataCus = async () => {
    let result = await CustomerSearch({
      page: "1",
      pageSize: "100",
    });
    // console.log(result.data)
    const totalQty = result.data.length
    // console.log(totalQty)
    setTotalCus(totalQty)
  };
  useEffect(()=>{
    loadDataPro()
    loadDataCus()
    loadDataCart()
  },[])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <div
        style={{
          width: "100%",
          padding: 24,
          minHeight: 100,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Space direction="horizontal">
          <DashboardCard 
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title="Đơn hàng"
            value={totalCart}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title="Hàng tồn"
            value={totalPro}
          />
          {/* Inventory */}
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title="Khách hàng"
            value={totalCus}
          />
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title="Doanh thu"
            value={revenue}
          />
          {/* DOanh thu */}
          
        </Space>
      </div>

      <div style={{ width: "100%", padding: 24 }}>
        <Space>
          <ProductSelling />
        </Space>
      </div>

      <div style={{ width: "100%", padding: 24 }}>
        <Space>
          <TopCus />
        </Space>
      </div>
    </>
  );
};

export default AdminHome;
