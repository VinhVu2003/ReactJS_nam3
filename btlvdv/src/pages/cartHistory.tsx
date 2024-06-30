import axios from "axios";
import "../assets/css/hiscart.css";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartState, thongtinTK } from "../constant/recoil";
import { Table } from "antd";
import Column from "antd/es/table/Column";
import moment from "moment";
import { GetAllCartHistory } from "../services/ExportOder.services";

const CartHistory = function () {
  const infor = useRecoilValue(thongtinTK);
  const [data, setData] = useState<any[]>([]);
  const [dataKH, setDataKH] = useState<any>([]);
  const [tenKH, setTenKH] = useState<string>();
  const [selected, setSelected] = useState(0);

  async function GetInforUser() {
    try {
      const response = await axios.post(
        "https://localhost:44381/api/Khach/search",
        {
          page: "1",
          pageSize: "1",
          MaTaiKhoan: infor?.mataikhoan,
        }
      );
      const firstItem = response.data.data[0];

      setDataKH(firstItem);
      setTenKH(dataKH.tenKH);

      console.log(dataKH.maKH);
    } catch {}
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
            maKH: dataKH.maKH,
            list_json_ChiTietHD: [],
          }
        );
        if (response.status === 200) {
          alert("Đã hủy đơn hàng!");
          setSelected(5);
          GetHistoryCart(3);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  //Xác nhận nhận hàng
  async function received(value: any) {
    const a = window.confirm("Bạn đã nhận hàng?");
    if (a) {
      try {
        const response = await axios.post(
          "https://localhost:44381/api/HoaDonBan/Update_Hoadon",
          {
            maHoaDon: value.maHoaDon,
            trangThai: "2",
            ngayTao: value.ngayTao,
            diaChiGiaoHang: value.diaChiGiaoHang,
            tongGia: value.tongGia,
            maKH: dataKH.maKH,
            list_json_ChiTietHD: [],
          }
        );
        if (response.status === 200) {
          alert("Xác nhận nhận hàng!");
          setSelected(4);
          GetHistoryCart(2);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  async function GetHistoryCart(item: any) {
    switch (item) {
      case 0:
        loadData();
        break;
      case 1:
        const response1 = await axios.post(
          "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
          {
            MaKH: dataKH.maKH,
            TrangThai: "0",
          }
        );
        setData(response1.data.data);
        break;
      case 2:
        const response = await axios.post(
          "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
          {
            MaKH: dataKH.maKH,
            TrangThai: "1",
          }
        );
        setData(response.data.data);
        break;
      case 3:
        const response3 = await axios.post(
          "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
          {
            MaKH: dataKH.maKH,
            TrangThai: "10",
          }
        );
        setData(response3.data.data);
        break;
      case 4:
        const response4 = await axios.post(
          "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
          {
            MaKH: dataKH.maKH,
            TrangThai: "2",
          }
        );
        setData(response4.data.data);
        break;
      case 5:
        const response5 = await axios.post(
          "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
          {
            MaKH: dataKH.maKH,
            TrangThai: "3",
          }
        );
        setData(response5.data.data);
        break;
    }
  }
  const handleClick = (index: any) => {
    setSelected(index);
    GetHistoryCart(index);
  };
  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/HoaDonBan/GetListHistoryCart",
        {
          MaKH: dataKH.maKH,
        }
      );
      // const response = await GetAllCartHistory(dataKH.maKH);
      setData(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    if (infor.mataikhoan) {
      GetInforUser();
    }
  }, []);
  useEffect(() => {
    if (dataKH && dataKH.tenKH) {
      loadData();
    }
  }, [dataKH]);

  return (
    <>
      <h3 style={{ margin: "50px" }}>Đơn hàng của bạn</h3>
      <div className="Hiscart">
        <ul className="hiscart-list">
          {[
            "Tất cả",
            "Chờ xác nhận",
            "Vận chuyển",
            "Chờ giao hàng",
            "Hoàn thành",
            "Đã hủy",
            "Trả hàng, hoàn tiền",
          ].map((item, index) => (
            <li
              key={index}
              className={selected === index ? "selected" : ""}
              onClick={() => handleClick(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      {data.map(function (value: any, index: any) {
        return (
          <div
            key={index}
            style={{
              width: "100%",
              backgroundColor: "#E8E8E8",
              height: "350px",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "white",
                height: "50px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <i className="fa-solid fa-shop"></i>
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  4menshop.com.vn
                </div>
                <button
                  style={{
                    marginRight: "10px",
                    backgroundColor: "red",
                    border: "none",
                    padding: "3px",
                    color: "white",
                  }}
                >
                  <i className="fa-solid fa-comment"></i> Chat
                </button>
                <button>
                  <i className="fa-solid fa-shop"></i> Xem shop
                </button>
              </div>
              <div style={{ display: "flex", color: "#33CCCC" }}>
                
                {value.trangThai == 2 ? (
                  <>
                  <i className="fa-solid fa-truck"></i>
                    <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                      Đơn hàng đã giao thành công
                    </p>
                    <div style={{ color: "red" }}>Hoàn thành</div>
                  </>
                ) : value.trangThai == 1 ? (
                  <>
                    <i className="fa-solid fa-truck"></i>
                    <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                      Đơn hàng đang giao
                    </p>
                    <div style={{ color: "red" }}>Đang giao</div>
                  </>
                ) : value.trangThai == 0 ? (
                  <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                    Chờ xác nhận
                  </p>
                ) : value.trangThai == 3 ? (
                  <p style={{ marginLeft: "10px", marginRight: "10px" }}>
                    Đã hủy
                  </p>
                ) : null}
              </div>
            </div>
            <hr />
            <div
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "white",
                height: "150px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex" }}>
                <img
                  src={"../assets" + value.anhDaiDien}
                  alt=""
                  style={{ width: "90px" }}
                />
                <div style={{ marginLeft: "10px" }}>
                  <p>{value.tenSanPham}</p>
                  <p>Size: {value.tenSize}</p>
                  <p>x{value.soLuong}</p>
                </div>
              </div>
              <div>
                <p style={{ alignItems: "center" }}>Giá: {value.gia}đ</p>
              </div>
            </div>
            <hr />
            <div
              style={{
                width: "100%",
                padding: "15px",
                backgroundColor: "white",
                height: "150px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  height: "60px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <i className="fa-brands fa-bitcoin"></i>
                  <p>Thành tiền:</p>
                  <p style={{ color: "red" }}>{value.tongGia}đ</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "end" }}>
                {value.trangThai == 3 || value.trangThai == 2 ? (
                  <button
                    style={{
                      height: "40px",
                      width: "100px",
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                    }}
                  >
                    Mua lại
                  </button>
                ) : value.trangThai == 0 ? (
                  <button
                    style={{
                      height: "40px",
                      width: "100px",
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => Cancelorder(value)}
                  >
                    Hủy đơn
                  </button>
                ) : value.trangThai == 1 ? (
                  <button
                    style={{
                      height: "40px",
                      width: "100px",
                      backgroundColor: "red",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => received(value)}
                  >
                    Đã nhận hàng
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default CartHistory;
