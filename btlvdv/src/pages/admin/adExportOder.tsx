import "../../assets/css/exportCart.css";
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
  Dropdown,
  MenuProps,
  message,
  Spin,
} from "antd";
import NumberFormat from "react-number-format";
import moment from "moment";
import axios from "axios";
import { values } from "../../assets/anh/fontawesome-free-6.4.0-web/js/v4-shims";
import {
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownOutlined,
  LoadingOutlined,
  ReloadOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { SearchProps } from "antd/es/input";

const { Column, ColumnGroup } = Table;

const AdminExportOder: React.FC = () => {
  const [oderAll, setOderAll] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [dataCTHD, setdataCTHD] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedProductPrice, setSelectedProductPrice] = useState<number>(0); // State để lưu giá sản phẩm được chọn
  const [products, setProduct] = useState<any[]>([]);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [formCTDH] = Form.useForm();
  const [isFormCTDHHidden, setIsFormCTDHHidden] = useState<boolean>(false);

  async function UpdateDetailOderAddCTHD() {
    const oder = form.getFieldsValue();
    const detail = formCTDH.getFieldsValue();

    const check: any[] = dataCTHD;
    const existingItem = check.find(
      (item) => item.maSanPham === detail.maSanPham
    );

    if (detail.maSanPham === undefined || detail.soLuong === undefined) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else if (existingItem) {
      alert("Sản phẩm đã có trong hóa đơn");
    } else {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: oder.maHoaDon,
            trangThai: oder.trangThai,
            ngayTao: oder.ngayTao,
            diaChiGiaoHang: oder.diaChiGiaoHang,
            tongGia: oder.tongGia,
            maKH: oder.maKH,
            list_json_ChiTietHD: [
              {
                maSanPham: detail.maSanPham,
                soLuong: detail.soLuong,
                tongGia: detail.tongGia,
                giamGia: "",
                status: 1,
              },
            ],
          }
        );
        response && alert("Cập nhật chi tiết hóa đơn thành công!");
        // console.log(oder.maHoaDon)
        GetAllCTHD(oder);
        // UpdateTotalOder();
      } catch {}
    }
  }
  async function UpdateOderWithDeleteCTHD(record: any) {
    const oder = form.getFieldsValue();
    const data = dataCTHD.length;
    if (data == 1) {
      alert("Không thể xóa!");
    } else {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: oder.maHoaDon,
            trangThai: oder.trangThai,
            ngayTao: oder.ngayTao,
            diaChiGiaoHang: oder.diaChiGiaoHang,
            tongGia: oder.tongGia,
            maKH: oder.maKH,
            list_json_ChiTietHD: [
              {
                maChiTietHoaDon: record.maChiTietHoaDon,
                giamGia: "",
                status: 3,
              },
            ],
          }
        );
        response && alert("Cập nhật chi tiết hóa đơn thành công!");
        GetAllCTHD(oder);

        // setdataCTHD(response.data)
      } catch {}
    }
  }
  async function UpdateDetailOderUpdateCTHD() {
    const oder = form.getFieldsValue();
    const detail = formCTDH.getFieldsValue();

    if (detail.maSanPham === undefined || detail.soLuong === undefined) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: oder.maHoaDon,
            trangThai: oder.trangThai,
            ngayTao: oder.ngayTao,
            diaChiGiaoHang: oder.diaChiGiaoHang,
            tongGia: oder.tongGia,
            maKH: oder.maKH,
            list_json_ChiTietHD: [
              {
                maSanPham: detail.maSanPham,
                soLuong: detail.soLuong,
                tongGia: detail.tongGia,
                giamGia: "",
                status: 1,
              },
            ],
          }
        );
        response && alert("Cập nhật chi tiết hóa đơn thành công!");
        // console.log(oder.maHoaDon)
        GetAllCTHD(oder);
        // UpdateTotalOder();
      } catch {}
    }
  }
  async function onEditOder(oder: any) {
    setOpenModal(true);
    setIsAdd(false);
    form.setFieldsValue(oder);
    GetAllCTHD(oder);
    setIsFormCTDHHidden(false); // Ẩn form formCTDH
  }
  async function onDetailOder(oder: any) {
    setOpenModal(true);
    setIsAdd(true);
    form.setFieldsValue(oder);
    GetAllCTHD(oder);
    setIsFormCTDHHidden(true); // Ẩn form formCTDH
  }
  const onFinish = async (values: any) => {
    const oder = form.getFieldsValue();
    const listCTHD = dataCTHD;
    // console.log(oder);
    // console.log(listCTHD);
    if (isAdd) {
      // console.log(values.tenChuyenMuc);
    } else {
      try {
        const res = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: oder.maHoaDon,
            trangThai: oder.trangThai,
            ngayTao: oder.ngayTao,
            diaChiGiaoHang: oder.diaChiGiaoHang,
            tongGia: oder.tongGia,
            maKH: oder.maKH,
            list_json_ChiTietHD: [],
          }
        );
        alert("Cập nhật thành công!");
        loadData();
        setOpenModal(false);
      } catch {}
      // setOpenModal(false)
    }
  };
  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/HoaDonBan/HoaDon_Search",
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
      setOderAll(modifiedData);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function GetAllCTHD(oder: any) {
    try {
      const response = await axios.get(
        "https://localhost:44381/api/HoaDonBan/List_CTHD_Getbyid?id=" +
          oder.maHoaDon
      );
      setdataCTHD(response.data);

      const listCTHD = response.data;
      let total = 0;
      listCTHD.map((item: any, index: any) => {
        total = total + item.tongGia;
      });
      console.log("tong:" + total);
      // setTotalOder(total);
      // console.log(totalOder)
      form.setFieldsValue({ tongGia: total });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const handleDelete = async (record: any) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      // Xử lý logic xóa ở đây
      alert(record.maHoaDon);
      const maHoaDon = record.maHoaDon;
      try {
        const response = await axios.delete(
          "https://localhost:44381/api/HoaDonBan/HoaDon_Delete?id=" + maHoaDon
        );
        response && alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    loadData();
  }, []); //Sử dụng useEffect để gọi hàm loadData() trong trường hợp này là cách
  // phổ biến để khởi tạo dữ liệu khi component được render lần đầu tiên
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
  useEffect(() => {
    formCTDH.setFieldsValue({ gia: selectedProductPrice });
  }, [selectedProductPrice]);

  function handleSoLuongChange(value: number) {
    const TongTien = value * selectedProductPrice;
    // console.log(TongTien);
    formCTDH.setFieldsValue({ tongGia: TongTien });
  }

  //dropdown
  const filterData = (key: string) => {
    if (key == "Tất cả") {
      setData(oderAll);
    }
    if (key == "0") {
      const datanew = oderAll.filter((values: any) => {
        return values.trangThai == "0";
      });
      setData(datanew);
    }
    if (key == "1") {
      const datanew = oderAll.filter((values: any) => {
        return values.trangThai == "1";
      });
      setData(datanew);
    }
    if (key == "2") {
      const datanew = oderAll.filter((values: any) => {
        return values.trangThai == "2";
      });
      setData(datanew);
    }
    if (key == "3") {
      const datanew = oderAll.filter((values: any) => {
        return values.trangThai == "3";
      });
      setData(datanew);
    }
  };
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // message.info(`Click on item ${key}`);
    filterData(key);
  };
  const items: MenuProps["items"] = [
    {
      label: "Tất cả",
      key: "Tất cả",
    },
    {
      label: "Đơn hàng xác nhận",
      key: "0",
    },
    {
      label: "Đơn hàng đang giao",
      key: "1",
    },
    {
      label: "Đơn hàng hoàn thành",
      key: "2",
    },
    {
      label: "Đơn hàng đã hủy",
      key: "3",
    },
  ];

  //Xác nhận đơn hàng
  async function received(value: any) {
    const a = window.confirm("Xác nhận đơn hàng?");
    if (a) {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: value.maHoaDon,
            trangThai: "1",
            ngayTao: value.ngayTao,
            diaChiGiaoHang: value.diaChiGiaoHang,
            tongGia: value.tongGia,
            maKH: value.maKH,
            list_json_ChiTietHD: [],
          }
        );
        if (response.status === 200) {
          alert("Xác nhận nhận hàng!");
        }
        loadData();
        // filterData("0");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  //Hủy đơn hàng
  async function Cancelorder(value: any) {
    const a = window.confirm("Xác nhận hủy đơn hàng");
    if (a) {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: value.maHoaDon,
            trangThai: "3",
            ngayTao: value.ngayTao,
            diaChiGiaoHang: value.diaChiGiaoHang,
            tongGia: value.tongGia,
            maKH: value.maKH,
            list_json_ChiTietHD: [],
          }
        );
        if (response.status === 200) {
          alert("Đã hủy đơn hàng!");
          loadData();
        }
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
        "https://localhost:44381/api/HoaDonBan/HoaDon_Search",
        {
          page: "1",
          pageSize: "100",
          TenKH: value,
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
      <Tag>
        <Dropdown menu={{ items, onClick }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Sắp xếp
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Tag>
      <Tag
        onClick={() => loadData()}
        icon={<SyncOutlined />}
        color="processing"
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
        onClick={() => {
          alert("Không thành công!");
        }}
      >
        Thêm mới
      </Button>
      <Search
        placeholder="Nhập khách hàng"
        onSearch={onSearch}
        enterButton
        style={{ width: "30%", float: "right", marginRight: "10px" }}
      />
      <Table dataSource={data} rowKey="maHoaDon">
        <Column title="STT" dataIndex="index" key="index" />
        <Column title="Tên khách hàng" dataIndex="tenKH" key="tenKH" />
        <Column
          title="Địa chỉ giao hàng"
          dataIndex="diaChiGiaoHang"
          key="diaChiGiaoHang"
        />
        <Column
          title="Ngày đặt hàng"
          dataIndex="ngayTao"
          key="ngayTao"
          render={(ngayTao: string) =>
            moment(ngayTao).format("DD/MM/YYYY HH:mm:ss")
          }
        />
        <Column
          title="Tổng tiền"
          dataIndex="tongGia"
          key="tongGia"
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
          title="Trạng thái"
          dataIndex="trangThai"
          key="trangThai"
          render={(trangThai: string, record: any) => {
            switch (trangThai) {
              case "0":
                return (
                  <>
                    <Tag icon={<SyncOutlined  />} color="processing">
                      Chờ Xác Nhận
                    </Tag>
                    <br />
                    <Tag
                      onClick={() => received(record)}
                      style={{ cursor: "pointer" }}
                      icon={<CheckCircleOutlined />}
                    >
                      Xác Nhận
                    </Tag>
                    <br />
                    <Tag
                      onClick={() => Cancelorder(record)}
                      style={{ cursor: "pointer" }}
                      icon={<CloseCircleOutlined />}
                    >
                      Hủy
                    </Tag>
                  </>
                );
              case "1":
                return (
                  <>
                    <Tag icon={<CarOutlined />} color="processing">
                      Đang giao
                    </Tag>
                  </>
                );
              case "2":
                return (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Xác Nhận
                  </Tag>
                );
              case "3":
                return (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Đã Hủy
                  </Tag>
                );
              default:
                return "Chưa xác định";
            }
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a onClick={() => onEditOder(record)}>Sửa </a>
              <a onClick={() => handleDelete(record)}>Xóa</a>
              <a onClick={() => onDetailOder(record)}>Chi tiết</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        centered
        title={isAdd ? "Chi tiết đơn hàng " : "Sửa đơn hàng"}
        open={openModal}
        onCancel={() => {
          form.resetFields();
          setOpenModal(false);
          formCTDH.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
        cancelText="Đóng"
        width={900}
        style={{ textAlign: "center" }}
      >
        <Form
          name="HoaDon"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "auto" }}
        >
          <Form.Item
            name={"maHoaDon"}
            initialValue={0}
            hidden={isAdd}
            label="Mã hóa đơn"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name={"maKH"}
            label="Mã khách hàng"
            // rules={[{ required: true }]}
            hidden={true}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"tenKH"}
            label="Tên khách hàng"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"diaChiGiaoHang"}
            label="Địa chỉ giao hàng"
            // rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"ngayTao"}
            label="Ngày đặt hàng"
            // rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item name={"tongGia"} label="Tổng tiền">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Trạng thái" name={"trangThai"}>
            <Radio.Group>
              <Radio value={"0"}> Xác nhận đơn hàng </Radio>
              <br />
              <Radio value={"1"}> Đang giao </Radio>
              <br />
              <Radio value={"2"}> Đã giao(Hoàn thành) </Radio>
              <br />
              <Radio value={"3"}> Người dùng đã hủy đơn </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>

        <h3 style={{ paddingBottom: "10px" }}>Chi tiết đơn hàng</h3>

        <Form
          name="ChiTietHoaDon"
          form={formCTDH}
          hidden={isFormCTDHHidden}
          // onFinish={onFinishCTHD}
          style={{ maxWidth: 600, margin: "auto" }}
        >
          <Form.Item label="Sản phẩm" name="maSanPham">
            <Select
              onChange={(value) => {
                const selectedProduct = products.find(
                  (product) => product.maSanPham === value
                );
                // Cập nhật giá sản phẩm được chọn
                setSelectedProductPrice(selectedProduct.gia);
                // handleSoLuongChange();
                // console.log(selectedProduct.gia)
              }}
            >
              {products.map((p) => (
                <Select.Option key={p.maSanPham} value={p.maSanPham}>
                  {p.tenSanPham}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"gia"} label="Giá">
            <Input value={selectedProductPrice} disabled />
          </Form.Item>
          <Form.Item name={"soLuong"} label="Số lượng">
            <Input
              type="number"
              onChange={(e) => {
                handleSoLuongChange(parseFloat(e.target.value));
              }}
            />
          </Form.Item>
          <Form.Item name={"tongGia"} label="Tổng tiền" initialValue={0}>
            <Input disabled />
          </Form.Item>
          <Button
            style={{
              marginBottom: "20px",
              backgroundColor: "blue",
              color: "white",
            }}
            onClick={() => {
              UpdateDetailOderAddCTHD();
            }}
          >
            Thêm sản phẩm
          </Button>
        </Form>

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
            dataIndex="tongGia"
            key="tongGia"
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
                <a>Sửa </a>
                <a onClick={() => UpdateOderWithDeleteCTHD(record)}>Xóa</a>
              </Space>
            )}
          />
        </Table>
      </Modal>
    </>
  );
};

export default AdminExportOder;
