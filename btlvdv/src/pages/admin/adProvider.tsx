import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const AdminProvider: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(true);
  const [form] = Form.useForm();

  function onEditProvider(record: any) {
    setOpenModal(true);
    setIsAdd(false);
    form.setFieldsValue(record);
  }
  async function DeleteProvider(record: any) {
    // alert(record.maNhaPhanPhoi);
    try {
      const res = await axios.delete(
        "https://localhost:44381/api/NhaPhanPhoi/PhaPhanPhoi_Delete?id=" +
          record.maNhaPhanPhoi
      );
      console.log(res);
      if (res.status === 200) {
        alert("Xóa thành công");
        // Thực hiện các thao tác cần thiết sau khi xóa thành công, ví dụ: tải lại dữ liệu
        loadData();
        setOpenModal(false)
      } else {
        alert("Xóa không thành công");
      }
    } catch {}
  }
  async function onFinish(values: any) {
    if (isAdd) {
      // console.log(values)
      try {
        const response = await axios.post(
          "https://localhost:44381/api/NhaPhanPhoi/NhaPhanPhoi_Create",
          {
            tenNhaPhanPhoi: values.tenNhaPhanPhoi,
            diaChi: values.diaChi,
            soDienThoai: values.soDienThoai,
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
      try {
        const response = await axios.post(
          "https://localhost:44381/api/NhaPhanPhoi/PhaPhanPhoi_Update",
          {
            maNhaPhanPhoi: values.maNhaPhanPhoi,
            tenNhaPhanPhoi: values.tenNhaPhanPhoi,
            diaChi: values.diaChi,
            soDienThoai: values.soDienThoai,
          }
        );
        response && alert("Sửa thành công");
        loadData();
        form.resetFields();
        setOpenModal(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/NhaPhanPhoi/NhaPhanPhoi_Search",
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
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Button
        style={{
          float: "right",
          marginBottom: "20px",
          backgroundColor: "blue",
          color: "white",
        }}
        onClick={function () {
          setOpenModal(true);
          setIsAdd(true);
        }}
      >
        Thêm mới
      </Button>
      <Table dataSource={data}>
        <Column title="STT" dataIndex="index" key="index" />
        <Column
          title="Tên nhà phân phối"
          dataIndex="tenNhaPhanPhoi"
          key="tenNhaPhanPhoi"
        />
        <Column title="Địa chỉ" dataIndex="diaChi" key="diaChi" />
        <Column
          title="Số điện thoại"
          dataIndex="soDienThoai"
          key="soDienThoai"
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a onClick={() => onEditProvider(record)}>Sửa </a>
              <a onClick={() => DeleteProvider(record)}>Xóa</a>
            </Space>
          )}
        />
      </Table>
      <Modal
        title={isAdd ? "Thêm nhà phân phối " : "Sửa nhà phân phối"}
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
            name={"maNhaPhanPhoi"}
            initialValue={0}
            // rules={[{required:true}]}
            hidden={isAdd}
            label="Mã nhà phân phối"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"tenNhaPhanPhoi"}
            label="Tên nhà phân phối"
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
            name={"soDienThoai"}
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

export default AdminProvider;
