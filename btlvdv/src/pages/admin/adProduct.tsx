import React, { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Form,
  Input,
  MenuProps,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { DownOutlined, PlusOutlined, SyncOutlined } from "@ant-design/icons";
import { SearchProps } from "antd/es/input";
const { Column, ColumnGroup } = Table;

const AdminProduct: React.FC = () => {
  const [ProductAll, setProductAll] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<any[]>([]);
  const [sizes, setSizes] = useState<any[]>([]);

  async function loadDataCategory() {
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
      setCategories(modifiedData);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/SanPham/search",
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

      setProductAll(modifiedData);
      console.log(ProductAll);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const onFinish = async (values: any) => {
    const fileList = values.nameIMG;
    const imageFile = fileList[0].originFileObj; // Lấy đối tượng tệp từ fileList
    const formData = new FormData();
    formData.append("file", imageFile);
    if (isAdd) {
      // alert(values.maChuyenMuc+values.tenSanPham+values.gia+values.soLuong+values.maSize+imageFile.name)
      if (imageFile && fileList.length === 1) {
        try {
          const a = await axios.post(
            "https://localhost:44381/api/SanPham/San_Pham_Create",
            {
              maChuyenMuc: values.maChuyenMuc,
              tenSanPham: values.tenSanPham,
              anhDaiDien: "/anh/" + imageFile.name,
              gia: values.gia,
              soLuong: values.soLuong,
              maSize: values.maSize,
            }
          );
          a && alert("Thêm thành công");
          loadData();
          setOpenModal(false);
          form.resetFields();
          const response = await axios.post(
            "https://localhost:44381/api/UpLoad_/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch {
          alert("Đã xảy ra lỗi khi thêm sản phẩm");
        }
      } else {
        alert("Vui lòng chỉ chọn một ảnh sản phẩm");
      }
      // }
    } else {
      if (imageFile && fileList.length === 1) {
        // alert(imageFile.name)
        try {
          const response = await axios.post(
            "https://localhost:44381/api/SanPham/SanPham_Update",
            {
              maSanPham: values.maSanPham,
              maChuyenMuc: values.maChuyenMuc,
              anhDaiDien: "/anh/" + imageFile.name,
              tenSanPham: values.tenSanPham,
              gia: values.gia,
              soLuong: values.soLuong,
              maSize: values.maSize,
            }
          );
          response && alert("Sửa thành công!");
          loadData();
          setOpenModal(false);
          form.resetFields();

          const a = await axios.post(
            "https://localhost:44381/api/UpLoad_/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } catch (error) {
          // Xử lý lỗi ở đây
          console.error("Đã xảy ra lỗi khi cập nhật sản phẩm:", error);
          // Hiển thị thông báo lỗi cho người dùng
          alert("Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau.");
        }
      } else {
        const nameIMGValue = form.getFieldValue("anhDaiDien");
        // console.log(nameIMGValue)
        const response = await axios.post(
          "https://localhost:44381/api/SanPham/SanPham_Update",
          {
            maSanPham: values.maSanPham,
            maChuyenMuc: values.maChuyenMuc,
            anhDaiDien: nameIMGValue,
            tenSanPham: values.tenSanPham,
            gia: values.gia,
            soLuong: values.soLuong,
            maSize: values.maSize,
          }
        );
        response && alert("Sửa thành công!");
        loadData();
        setOpenModal(false);
        form.resetFields();
      }
    }
  };

  const DeleteProduct = async function (record: any) {
    const hoixoa = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (hoixoa) {
      const maSanPham = record.maSanPham;
      //  alert(maSanPham)
      try {
        const response = await axios.delete(
          "https://localhost:44381/api/SanPham/San_Pham_Delete?ID=" + maSanPham
        );
        response && alert("Xóa thành công");
        loadData();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const onEdit = function (product: any) {
    // console.log(product);
    setOpenModal(true);
    setIsAdd(false);
    form.setFieldsValue(product);
    // Lưu lại đường dẫn ảnh của sản phẩm
    const imageUrl = product.anhDaiDien;
    // console.log(imageUrl);
    // Đặt giá trị của trường "Upload" bằng đường dẫn ảnh đã lưu
    form.setFieldsValue({ nameIMG: [{ url: "../assets" + imageUrl }] });
    // alert(product.anhDaiDien)
  };

  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadDataCategory();
  }, []);
  useEffect(() => {
    async function loadDataSize() {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/SizeCotroller/Size_Search",
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
        setSizes(modifiedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    loadDataSize();
  }, []);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  //dropdown
  const onClick: MenuProps["onClick"] = ({ key }) => {
    // message.info(`Click on item ${key}`);
    if (key == "Tất cả") {
      setData(ProductAll);
    }
    if (key == "Áo sơ mi") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenChuyenMuc == "Áo sơ mi";
      });
      setData(datanew);
    }
    if (key == "Áo khoác") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenChuyenMuc == "Áo khoác";
      });
      setData(datanew);
    }
    if (key == "S") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenSize == "S";
      });
      setData(datanew);
    }
    if (key == "M") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenSize == "M";
      });
      setData(datanew);
    }
    if (key == "L") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenSize == "L";
      });
      setData(datanew);
    }
    if (key == "XL") {
      const datanew = ProductAll.filter((values: any) => {
        return values.tenSize == "XL";
      });
      setData(datanew);
    }
  };
  const items: MenuProps["items"] = [
    {
      label: "Tất cả",
      key: "Tất cả",
    },
    {
      label: "Áo sơ mi",
      key: "Áo sơ mi",
    },
    {
      label: "Áo khoác",
      key: "Áo khoác",
    },
    {
      label: "Quần",
      key: "Quần",
    },
    {
      label: "Size S",
      key: "S",
    },
    {
      label: "Size M",
      key: "M",
    },
    {
      label: "Size L",
      key: "L",
    },
    {
      label: "Size XL",
      key: "XL",
    },
  ];

  //search
  const { Search } = Input;
  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/SanPham/search",
        {
          page: "1",
          pageSize: "100",
          TenSanPham: value,
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
        onClick={() => {
          setIsAdd(true);
          setOpenModal(true);
        }}
      >
        Thêm mới
      </Button>
      <Search
        placeholder="Nhập tên sản phẩm"
        onSearch={onSearch}
        enterButton
        style={{ width: "30%", float: "right", marginRight: "10px" }}
      />
      <Table dataSource={data}>
        <Column title="STT" dataIndex="index" key="index" />
        <Column title="Chuyên mục" dataIndex="tenChuyenMuc" key="" />
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
        <Column title="Tên sản phẩm" dataIndex="tenSanPham" key="" />
        <Column title="Size" dataIndex="tenSize" key="" />
        <Column
          title="Giá"
          dataIndex="gia"
          key=""
          render={(gia: number) => (
            <span>
              {gia.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        />
        <Column title="Số lượng" dataIndex="soLuong" key="" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: any) => (
            <Space size="middle">
              <a onClick={() => onEdit(record)}>Sửa </a>
              <a onClick={() => DeleteProduct(record)}>Xóa</a>
            </Space>
          )}
        />
      </Table>

      <Modal
        title={isAdd ? "Thêm sản phẩm" : "Sửa sản phẩm"}
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
            name={"maSanPham"}
            initialValue={0}
            hidden={isAdd}
            label="Mã sản phẩm"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="Chuyên mục" name="maChuyenMuc">
            <Select>
              {categories.map((category) => (
                <Select.Option
                  key={category.maChuyenMuc}
                  value={category.maChuyenMuc}
                >
                  {category.tenChuyenMuc}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name={"tenSanPham"} label="Tên sản phẩm">
            <Input />
          </Form.Item>
          <Form.Item name={"gia"} label="Giá">
            <Input />
          </Form.Item>
          <Form.Item name={"soLuong"} label="Số lượng">
            <Input />
          </Form.Item>
          <Form.Item label="Size" name="maSize">
            <Select>
              {sizes.map((size) => (
                <Select.Option key={size.maSize} value={size.maSize}>
                  {size.tenSize}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Upload"
            name="nameIMG"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              listType="picture-card"
              beforeUpload={() => false} // Ngăn chặn việc tự động gọi POST
            >
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminProduct;
