import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = function () {
  const nav = useNavigate();
  const [form] = Form.useForm(); // Sử dụng hook useForm để lấy form instance
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
    email?: string;
    hoten?: string;
    diachi?: string;
    sdt?: string;
  };
  async function checkLogin(values: any) {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/UserControllers/login",
        {
          username: values.username,
          password: values.password,
        }
      );
      if (response.status === 200) {
        alert("Tài khoản đã tồn tại!");
      }
    } catch (error) {
      // console.log(values)
      checkRegister(values);
    }
  }
  async function checkRegister(values: any) {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/UserControllers/Create",
        {
          loaiTaiKhoan: 2,
          tenTaiKhoan: values.username,
          matKhau: values.password,
          email: values.email,
          token: "",
          tenKH: values.hoten,
          diaChi: values.diachi,
          sdt: values.sdt,
        }
      );
      if (response.status === 200) {
        alert("Đăng ký thành công!");
        window.location.href = "/";
      }
    } catch {}
  }
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    // console.log("Success:", values);
    checkLogin(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="dangnhap">
        <div className="header1">
          <div className="left">
            <i className="fa-solid fa-phone" style={{ color: "white" }} />
            &nbsp; Hotline:
            <a href="tel:0868444644" title="4MEN Hot Line" rel="nofollow">
              0868.444.644
            </a>
          </div>
          <div className="right">
            <ul>
              <li>
                <a href="">Cách chọn size</a>
              </li>
              <li>
                <a href="">Chính sách khách vip</a>
              </li>
              <li>
                <a href="">Giới thiệu</a>
              </li>
              <li>
                <a href="Login.html">
                  <i className="fa-solid fa-user" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="botom-head">
          <ul>
            <li>
              <a href="">4MEN &nbsp; / &nbsp;</a>
            </li>
            <li>
              <a href="">Đăng ký</a>
            </li>
          </ul>
        </div>

        <div
          className="content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "50px",
            paddingBottom: "100px",
          }}
        >
          <Form
            form={form} // Truyền form instance vào Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Tài khoản"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Email là bắt buộc' },
                { 
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
                  message: 'Email không hợp lệ' 
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Họ tên"
              name="hoten"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Số điện thoại"
              name="sdt"
              rules={[
                { 
                  validator: async (_, value) => {
                    if (!value || value.length !== 10 || !/^[0-9]+$/.test(value)) {
                      return Promise.reject('Số điện thoại cần phải có đúng 10 số');
                    }
                  }
                }
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Địa chỉ"
              name="diachi"
              rules={[{ required: true, message: "Địa chỉ là bắt buộc!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Đăng ký
              </Button>
              <div
                style={{
                  top: "5px",
                  position: "absolute",
                  right: "32px",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={() => {
                  nav("/");
                }}
              >
                Quay lại
              </div>
              <p
                style={{ cursor: "pointer", marginTop: "10px" }}
                onClick={() => {
                  alert("Không thành công!");
                }}
              >
                Quên nhập khẩu
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Register;
