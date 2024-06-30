import { Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { TopCustomer } from "../../../services/statistical.services";

function TopCus() {
  const [data, setData] = useState<any[]>([]);
  async function Load() {
    try{
        let res = await TopCustomer()
        // console.log(res)
        const TOp5 =res.slice(0,5);
        const products = TOp5.map((product: any, index: number) => ({
          ...product,
          key: index, // Ensure each product has a unique key
        }));
        setData(products);
        
    } 
    catch{

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
          width: "137%",
        }}
      >
        <h2>Khách hàng thân thuộc</h2>
        <Table
          dataSource={data}
          pagination={false}
          style={{ width: "115%", marginTop: "10px" }}
        >
          
          <Column
            title="Mã khách hàng"
            dataIndex="maKH"
            key="maKH"
            hidden={true}
          />
          <Column title="STT" dataIndex="key" key="key" />
          <Column title="Tên khách hàng" dataIndex="tenKH" key="tenKH" />
          <Column title="Địa chỉ" dataIndex="diaChi" key="diaChi" />
          <Column title="Số điện thoại" dataIndex="sdt" key="sdt" />
          <Column title="Sản phẩm mua" dataIndex="tongMua" key="tongMua" />
        </Table>
      </div>
    </>
  );
}
export default TopCus;
