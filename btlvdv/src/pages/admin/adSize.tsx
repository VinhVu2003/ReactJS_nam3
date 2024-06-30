import React, { useEffect, useState } from 'react';
import { Space, Table, Tag } from 'antd';
import axios from 'axios';

const { Column, ColumnGroup } = Table;

const AdminSize: React.FC = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/SizeCotroller/Size_Search",
          {
            page: "1",
            pageSize: "10",
          }
        );
        const modifiedData = response.data.data.map((item:any, index:any) => ({
            ...item,
            index: index + 1 // Tính số thứ tự và cộng 1
          }));
        setData(modifiedData);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  return (
    <Table dataSource={data}>
      <Column title="STT" dataIndex="index" key="index" />
      <Column title="Tên Size" dataIndex="tenSize" key="tenSize" />
      <Column
        title="Action"
        key="action"
        render={(_: any, record: any) => (
          <Space size="middle">
            <a>Sửa </a>
            <a>Xóa</a>
          </Space>
        )}
      />
    </Table>
  );
};

export default AdminSize;
