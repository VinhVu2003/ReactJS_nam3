import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { useRecoilValue } from "recoil";
import { thongtinTK } from "../../constant/recoil";
import { getChiTietTaiKhoan } from "../../services/User.services";
import { useNavigate } from "react-router-dom";

const AdminInfor: React.FC = () => {
  const nav = useNavigate();
  const dataTK = useRecoilValue(thongtinTK);
  const [dataUser, setDataUser] = useState<any>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const [form] = Form.useForm();
  const [formInfor] = Form.useForm();

  async function loadData() {
    // console.log(dataTK);
    // const a = dataTK.mataikhoan;
    const a= JSON.parse(localStorage.getItem('MaTaiKhoan')!)
    console.log(a)
    try {
      let res = await getChiTietTaiKhoan(a);
      setDataUser(res);
    } catch (error) {
      const confirmLogout = window.confirm("Lỗi, vui lòng đăng nhập lại!");
      if (confirmLogout) {
        nav("/");
      }
    }
  }
   function OpenModal(){
    setOpenModal(true)
   }
  useEffect(() => {
    loadData();
  }, []);
  
  useEffect(() => {
    if (dataUser.length > 0) {
      formInfor.setFieldsValue({
        tenTaiKhoan: dataUser[0].tenTaiKhoan,
        hoTen: dataUser[0].hoTen,
        diaChi: dataUser[0].diaChi,
        soDienThoai: dataUser[0].soDienThoai,
        email: dataUser[0].email,
      });
    }
  }, [dataUser]);

  async function onFinish(values: any) {
    alert("Chức năng này đang bảo trì!")
  }

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Thông tin tài khoản
      </h1>
      <Form
        form={formInfor}
        name="nest-messages"
        style={{ maxWidth: 600, margin: "auto" }}
      >
        <Form.Item name={"tenTaiKhoan"} label="Tài khoản">
          <Input readOnly />
        </Form.Item>
        <Form.Item name={"hoTen"} label="Họ tên">
          <Input readOnly />
        </Form.Item>
        <Form.Item name={"diaChi"} label="Địa chỉ">
          <Input readOnly />
        </Form.Item>
        <Form.Item name={"soDienThoai"} label="Điện thoại">
          <Input readOnly />
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input readOnly />
        </Form.Item>
      </Form>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button style={{marginRight:"10px"}} onClick={() => {
          const a = window.confirm("Bạn có muốn đăng xuất không?");
          if (a) {
            nav("/");
          }
        }}>Đăng xuất</Button>

        <Button onClick={OpenModal}>Đổi mật khẩu</Button>
      </div>

      <Modal
        title={ "Đổi mật khẩu" }
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
          <Form.Item name={"tenKH"} label="Tên khách hàng">
            <Input />
          </Form.Item>
          <Form.Item name={"diaChi"} label="Địa chỉ">
            <Input />
          </Form.Item>
          <Form.Item name={"sdt"} label="Số điện thoại">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminInfor;
