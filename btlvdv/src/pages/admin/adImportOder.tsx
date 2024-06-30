import React, { useEffect, useState } from "react";
import {
  Input,
  Modal,
  Space,
  Table,
  Tag,
  Form,
  Button,
  Radio,
  Select,
} from "antd";
import moment from "moment";
import axios from "axios";

const { Column, ColumnGroup } = Table;

const AdminImportOder: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [dataCTHD, setdataCTHD] = useState<any[]>([]);
  const [providers, setProvider] = useState<any[]>([]);
  const [products, setProduct] = useState<any[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [form] = Form.useForm();
  // const [isFormCTDHHidden, setIsFormCTDHHidden] = useState<boolean>(false);

  function onEditOder(oder: any) {
    setOpenModal(true);
    // console.log(oder);
    setIsEdit(true);
    setIsAdd(false);
    form.setFieldsValue(oder);
    GetAllCTHD(oder);
  }

  const onFinish = async (values: any) => {
    if (isAdd) {
      const currentDate = new Date().toISOString(); // Lấy ngày hiện tại theo định dạng ISO 8601
      // console.log(values)
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonNhap/HoaDonNhap_Create",
          {
            maNhaPhanPhoi: values.maNhaPhanPhoi,
            ngayTao: currentDate,
            kieuThanhToan: values.kieuThanhToan,
            maTaiKhoan: 1,
            tongTien: values.soLuong * values.giaNhap,
            list_js_ChitietHDN: [
              {
                maSanPham: values.maSanPham,
                soLuong: values.soLuong,
                donViTinh: values.donViTinh,
                giaNhap: values.giaNhap,
                tongTien: values.soLuong * values.giaNhap,
              },
            ],
          }
        );
        if (response.status === 200) {
          alert("Thêm thành công");
          loadData();
          setOpenModal(false);
          form.resetFields();
        } else {
          alert("Có lỗi xảy ra khi thêm dữ liệu");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Có lỗi xảy ra khi kết nối tới máy chủ");
      }
    } else {
      // alert(values.maChuyenMuc+values.tenChuyenMuc+values.noidung)
    }
  };
  const handleDelete = async (record: any) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      // Xử lý logic xóa ở đây
      const maHoaDon = record.maHoaDon;
      // console.log(maHoaDon);
      try {
        const response = await axios.delete(
          "https://localhost:44381/api/HoaDonNhap/HoaDon_Delete?id=" + maHoaDon
        );
        response && alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  async function GetAllCTHD(oder: any) {
    try {
      const response = await axios.get(
        "https://localhost:44381/api/HoaDonNhap/List_CTHDN_Getbyid?id=" +
          oder.maHoaDon
      );
      setdataCTHD(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/HoaDonNhap/HoaDonNhap_Search",
        {
          page: "1",
          pageSize: "100",
        }
      );
      const modifiedData = response.data.data.map((item: any, index: any) => ({
        ...item,
        key: index + 1, // Tính số thứ tự và cộng 1
        ngayTao: formatDate(item.ngayTao),
      }));
      setData(modifiedData);
      // console.log(modifiedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    async function loadDataProvider() {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/NhaPhanPhoi/NhaPhanPhoi_Search",
          {
            page: "1",
            pageSize: "100",
          }
        );
        const modifiedData = response.data.data.map(
          (item: any, index: any) => ({
            ...item,
            index: index + 1, // Tính số thứ tự và cộng 1
          })
        );
        setProvider(modifiedData);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadDataProvider();
  }, []);
  useEffect(() => {
    async function loadDataProduct() {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/SanPham/search",
          {
            page: "1",
            pageSize: "100",
          }
        );
        const modifiedData = response.data.data.map(
          (item: any, index: any) => ({
            ...item,
            index: index + 1, // Tính số thứ tự và cộng 1
          })
        );
        setProduct(modifiedData);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadDataProduct();
  }, []);
  function formatDate(dateString: string) {
    return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
  }
  return (
    <>
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
          setIsEdit(false);
          // setIsFormCTDHHidden(true)
        }}
      >
        Thêm mới
      </Button>
      <Table dataSource={data}>
        <Column title="STT" dataIndex="key" key="key" />
        <Column
          title="Nhà phân phối"
          dataIndex="tenNhaPhanPhoi"
          key="tenNhaPhanPhoi"
        />
        <Column
          title="Kiểu thanh toán"
          dataIndex="kieuThanhToan"
          key="kieuThanhToan"
        />
        <Column title="Ngày đặt hàng" dataIndex="ngayTao" key="ngayTao" />
        <Column
          title="Tổng tiền"
          dataIndex="tongTien"
          key="tongTien"
          render={(tongGia: number) => (
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(tongGia)}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a onClick={() => onEditOder(record)}>Sửa </a>
              <a onClick={() => handleDelete(record)}>Xóa</a>
              <a>Chi tiết</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isAdd ? "Thêm đơn hàng " : "Sửa đơn hàng"}
        open={openModal}
        width={700}
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
          // {...layout}
          name="nest-messages"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name={"maHoaDon"}
            initialValue={0}
            hidden={isAdd}
            label="Mã hóa đơn"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label="Nhà phân phối" name="maNhaPhanPhoi">
            <Select
              onChange={(value) => {
                const selectedProduct = providers.find(
                  (providers) => providers.maSanPham === value
                );
              }}
            >
              {providers.map((p) => (
                <Select.Option key={p.maNhaPhanPhoi} value={p.maNhaPhanPhoi}>
                  {p.tenNhaPhanPhoi}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={"kieuThanhToan"}
            label="Kiểu thanh toán"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"ngayTao"}
            label="Ngày đặt hàng"
            hidden={isAdd}
            // rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Sản phẩm" name="maSanPham" hidden={isEdit}>
            <Select
            // onChange={(value) => {
            //   const selectedProduct = products.find(
            //     (product) => product.maSanPham === value
            //   );
            //   setSelectedProductPrice(selectedProduct.gia);
            // }}
            >
              {products.map((p) => (
                <Select.Option key={p.maSanPham} value={p.maSanPham}>
                  {p.tenSanPham}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item hidden={isEdit}
            name={"soLuong"}
            label="Số lượng"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item hidden={isEdit}
            name={"donViTinh"}
            label="Đơn vị tính"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item hidden={isEdit}
            name={"giaNhap"}
            label="Giá nhập"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item name={"tongTien"} label="Tổng tiền">
            <Input />
          </Form.Item> */}
        </Form>

        <div hidden={isAdd}>
          <h3 style={{ paddingBottom: "10px" }}>Chi tiết đơn hàng</h3>
          <Table dataSource={dataCTHD}>
            <Column
              title="Tên sản phẩm"
              dataIndex="tenSanPham"
              key="tenSanPham"
            />
            <Column
              title="Ảnh"
              dataIndex="anhDaiDien"
              key="anhDaiDien"
              render={(anhDaiDien: string) => (
                <img
                  src={"../assets" + anhDaiDien}
                  alt="Ảnh"
                  style={{ width: 100, height: "auto" }}
                />
              )}
            />
            <Column title="Số lượng" dataIndex="soLuong" key="soLuong" />
            <Column title="Size" dataIndex="tenSize" key="tenSize" />
            <Column
              title="Tổng tiền"
              dataIndex="tongTien"
              key="tongTien"
              render={(tongTien: number) => (
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(tongTien)}
                </span>
              )}
            />
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
        </div>
      </Modal>
    </>
  );
};

export default AdminImportOder;
