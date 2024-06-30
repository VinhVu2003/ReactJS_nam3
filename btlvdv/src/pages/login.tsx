import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useRecoilState ,useRecoilValue } from "recoil";
import {ThongTinKhachHang, thongtinTK, useSetThongTinTK} from "../constant/recoil";
import { useNavigate } from "react-router-dom";
const Login = function () {
  const navigate = useNavigate()
  const setThongTinTK = useSetThongTinTK();
  const [dataKH, setDataKH] = useState<any>([]);
  const [thongtinkhachhang, setThongTinKhachHang] = useRecoilState<any>(ThongTinKhachHang);

  async function GetInforUser(a:any) {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/Khach/search",
        {
          page: "1",
          pageSize: "1",
          MaTaiKhoan: a?.mataikhoan,
        }
      );
      const firstItem = response.data.data[0];
      
      setDataKH(firstItem);
      // console.log(firstItem)
      let list:any[] = firstItem
      // localStorage.setItem('ThongTinKhachHang',JSON.stringify(list)); 
      setThongTinKhachHang(list)
      localStorage.setItem('ThongTinKhachHang',JSON.stringify(list));
    } catch {}
  }
  function setRecoil(user:any){
    const newuser :any={
      mataikhoan:user.mataikhoan,
      taikhoan:user.taikhoan,
      matkhau:user.matkhau,
    };
    setThongTinTK(newuser);
  }
  type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  function openWeb(values: any) {
    
    if (values.loaitaikhoan == 1) {
     
      navigate('/admin')
    } else {
      navigate('/user/home')
    }
  }
  function openDangKy() {
    navigate('/register')
  }
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
        alert("Đăng nhập thành công!");
        // console.log(response.data)
        const a :any= response.data
        setRecoil(a)
        GetInforUser(response.data)

        // console.log(response.data.mataikhoan)
        localStorage.setItem('MaTaiKhoan',JSON.stringify(response.data.mataikhoan)); 
        openWeb(response.data);
      } 
    } catch(error:any) {
      // console.log(error)
      if (error.response) {
        if (error.response.status === 400) {
          alert("Tài khoản mật khẩu không chính xác!");
        } 
      }
      else{
        navigate("/ServerErrorPage")
      }
    }
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
              <a href="">Đăng nhập</a>
            </li>
          </ul>
        </div>

        <div
          className="content"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          <Form
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
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <span
                className="red-on-hover"
                style={{ marginLeft: "20px", cursor: "pointer" }}
                onClick={() => openDangKy()}
              >
                Đăng ký
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default Login;
