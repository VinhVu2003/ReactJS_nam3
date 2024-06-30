import { Table } from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import { useEffect, useState } from "react";


function ProductSelling() {
  const [data, setData] = useState<any[]>([]);

  async function Load() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/ThongKe/ThongKe_SP_BanChay",
        {
          page: "1",
          pageSize: "5",
        }
      );
      // Assuming response.data.data is an array of products with unique identifiers
      const products = response.data.data.map((product: any, index: number) => ({
        ...product,
        key: index, // Ensure each product has a unique key
      }));
      setData(products);
    } catch (error) {
      console.error("Failed to load data", error);
    }
  }

  useEffect(() => {
    Load();
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#EEEEEE",
          padding: "20px",
          borderRadius: "10px",
          width: "117%",
        }}
      >
        <h2>Sản phẩm bán chạy</h2>
        <Table dataSource={data} pagination={false} style={{ width: "115%", marginTop: "10px" }}>
        <Column title="STT" dataIndex="key" key="key" />
          <Column
            title="Ảnh"
            dataIndex="anhDaiDien"
            key="anhDaiDien"
            render={(anhDaiDien: string) => (
              <img
                src={"../assets" + anhDaiDien}
                alt="Ảnh"
                style={{ width: 30, height: "auto" }}
              />
            )}
          />
          <Column title="Tên sản phẩm" dataIndex="tenSanPham" key="tenSanPham" />
          {/* <Column title="Size" dataIndex="tenSize" key="tenSize" /> */}
          <Column title="Giá" dataIndex="gia" key="gia" />
          <Column title="Sản lượng" dataIndex="tongSoLuong" key="tongSoLuong" />
        </Table>
      </div>
    </>
  );
}

export default ProductSelling;
