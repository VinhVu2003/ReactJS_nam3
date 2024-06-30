import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import axios from "axios";
import form from "antd/es/form";
import { SearchProps } from "antd/es/input";
import { SyncOutlined } from "@ant-design/icons";

const { Column, ColumnGroup } = Table;

const AdminCustomer: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [form] = Form.useForm();

  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/Khach/search",
        {
          page: "1",
          pageSize: "100",
        }
      );
      const modifiedData = response.data.data.map((item: any, index: any) => ({
        ...item,
        index: index + 1, // Tính số thứ tự và cộng 1
      }));
      setData(modifiedData);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  async function onFinish(values: any) {
    // console.log(values.maKH,values.tenKH,values.diaChi,values.sdt)
    if (isAdd) {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/Khach/Create",
          {
            tenKH: values.tenKH,
            diaChi: values.diaChi,
            sdt: values.sdt,
          }
        );
        response && alert("Thêm thành công");
        loadData();
        form.resetFields();
        setOpenModal(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
    }
  }

  async function DeleteCus(record: any) {
    // alert(record.maKH)
    const Delete = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (Delete) {
      const maKH = record.maKH;
      try {
        const response = await axios.delete(
          "https://localhost:44381/api/Khach/Delete_KH?id=" + maKH
        );
        response && alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  //search
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/Khach/search",
        {
          page: "1",
          pageSize: "100",
          TenKhach: value
        }
      );
      const modifiedData = response.data.data.map((item: any, index: any) => ({
        ...item,
        index: index + 1, 
      }));
      setData(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Tag
        icon={<SyncOutlined />}
        color="processing"
        onClick={() => loadData()}
        style={{ cursor: "pointer" }}
      >
        Làm mới
      </Tag>

      <Button
        style={{
          float: "right",
          marginBottom: "20px",
          backgroundColor: "blue",
          color: "white",
        }}
        onClick={function () {
          setOpenModal(true);
        }}
      >
        Thêm mới
      </Button>
      <Search
        placeholder="Nhập tên khách hàng!"
        onSearch={onSearch}
        enterButton
        style={{ width: "30%", float: "right", marginRight: "10px" }}
      />
      <Table dataSource={data} rowKey={"maKH"}>
        <Column title="STT" dataIndex="index" key="index" />
        <Column title="Tên khách hàng" dataIndex="tenKH" key="tenKH" />
        <Column title="Địa chỉ" dataIndex="diaChi" key="diaChi" />
        <Column title="Số điện thoại" dataIndex="sdt" key="sdt" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a>Sửa </a>
              <a onClick={() => DeleteCus(record)}>Xóa</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isAdd ? "Thêm khách hàng " : "Sửa khách hàng"}
        open={openModal}
        okText="Lưu"
        onCancel={() => {
          form.resetFields();
          setOpenModal(false);
        }}
        onOk={() => {
          form.submit();
        }}
        cancelText="Hủy"
      >
        <Form
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name={"maKH"}
            initialValue={1}
            // rules={[{required:true}]}
            hidden={isAdd}
            label="Mã khách hàng"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"tenKH"}
            label="Tên khách hàng"
            // rules={[{required: true, pattern: /^[a-zA-Z]+$/, message: 'Chỉ được nhập chữ cái' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"diaChi"}
            label="Địa chỉ"
            // rules={[{ required: true, message: 'Không để trống' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"sdt"}
            label="Số điện thoại"
            // rules={[{required: true, pattern: /^[0-9]+$/, message: 'Chỉ được nhập số' },
            //         {max:10, message:'Số nhập vào không được vượt quá 10 chữ số'}
            // ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminCustomer;
