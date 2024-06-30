import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Table, Tag } from "antd";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import { Checkbox } from "antd";
import type { CheckboxProps, TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Key } from "antd/lib/table/interface";

const { Column, ColumnGroup } = Table;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AdminCategory: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [form] = Form.useForm();

  const handleDelete = async (record: any) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      // Xử lý logic xóa ở đây
      const maChuyenMuc = record.maChuyenMuc;
      // console.log(maChuyenMuc);
      try {
        const response = await axios.delete(
          "https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Delete?id=" +
            maChuyenMuc
        );
        response && alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const onFinish = async (values: any) => {
    if (isAdd) {
      // console.log(values.tenChuyenMuc);
      try {
        const response = await axios.post(
          "https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Create",
          {
            tenChuyenMuc: values.tenChuyenMuc,
            noidung: "",
          }
        );
        response && alert("Thêm thành công");
        loadData();
        setOpenModal(false);
        form.resetFields();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      try {
        const a = await axios.post(
          "https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Update",
          {
            maChuyenMuc: values.maChuyenMuc,
            tenChuyenMuc: values.tenChuyenMuc,
            noiDung: "trống",
          }
        );
        a && alert("Sửa thành công!");
        loadData();
        setOpenModal(false);
        form.resetFields();
      } catch {}
    }
  };

  async function onEditCategory(category: any) {
    // console.log(category);
    setIsAdd(false);
    setOpenModal(true);
    form.setFieldsValue(category);
  }
  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Search",
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

  //Xóa check box
  // Khởi tạo state để lưu trữ các khóa của hàng được chọn trong bảng
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  // Hàm xử lý sự thay đổi khi chọn các hàng trong bảng
  const handleSelectionChange = (selectedRowKeys: Key[]) => {
    // Cập nhật state với các khóa của hàng mới được chọn
    setSelectedRowKeys(selectedRowKeys);
  };
  // Đối tượng cấu hình cho việc chọn hàng trong bảng
  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys, // Liên kết các khóa hàng được chọn với thuộc tính này
    onChange: handleSelectionChange, // Gán hàm xử lý khi có sự thay đổi chọn hàng
  };
  async function handleDeleteCheckbox() {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      // Lưu ý: sử dụng Promise.all để chờ tất cả yêu cầu xóa hoàn thành
      try {
        await Promise.all(
          selectedRowKeys.map(async (item) => {
            const response = await axios.delete(
              `https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Delete?id=${item}`
            );
            return response;
          })
        );
        alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  return (
    <>
      <Button
        style={{
          float: "right",
          marginBottom: "20px",
          backgroundColor: "red",
          color: "white",
        }}
        onClick={() => {
          handleDeleteCheckbox();
        }}
      >
        Xóa
      </Button>
      <Button
        style={{
          float: "right",
          marginBottom: "20px",
          backgroundColor: "blue",
          color: "white",
        }}
        onClick={() => {
          setIsAdd(true);
          setOpenModal(true);
        }}
      >
        Thêm mới
      </Button>

      <Table dataSource={data} rowKey="maChuyenMuc" rowSelection={rowSelection}>
        <Column title="STT" dataIndex="index" key="index" />
        <Column title="Tên chuyên mục" dataIndex="tenChuyenMuc" key="age" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a onClick={() => onEditCategory(record)}>Sửa </a>
              <a onClick={() => handleDelete(record)}>Xóa</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isAdd ? "Thêm chuyên mục " : "Sửa chuyên mục"}
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
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name={"maChuyenMuc"}
            initialValue={0}
            hidden={isAdd}
            label="Mã chuyên mục"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"tenChuyenMuc"}
            label="Tên chuyên mục"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminCategory;
