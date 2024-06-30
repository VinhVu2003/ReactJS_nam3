import React from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import axios from 'axios';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const AddCategory: React.FC = () => {
  const onFinish = async (values: any) => {
    console.log(values.category.tenChuyenMuc);
    try {
      const response = await axios.post(
        "https://localhost:44381/api/ChuyenMuc/ChuyenMuc_Create",
        {
          tenChuyenMuc: values.category.tenChuyenMuc,
          noidung: "",
        }
      );
      response&&alert("Thêm thành công")
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      validateMessages={validateMessages}
    >
      {/* <Form.Item name={['category', 'maChuyenMuc']} label="Mã chuyên mục" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
      <Form.Item name={['category', 'tenChuyenMuc']} label="Tên chuyên mục" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      {/* <Form.Item name={['category', 'dacBiet']} label="Đặc biệt" rules={[{ required: true }]}>
        <Input />
      </Form.Item> */}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Thêm mới
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddCategory;
