import { useEffect, useState } from "react";
import "../assets/css/giohang.css";
import { cartState, thongtinTK } from "../constant/recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { Button, Form, Input, Space, Table, Tag } from "antd";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

interface CartItem {
  maSanPham: string;
  anhDaiDien: string;
  tenSanPham: string;
  tenSize: string;
  maSize: number;
  gia: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const infor = useRecoilValue(thongtinTK);
  const [form] = Form.useForm();
  const [cartRecoil, setCartRecoil] = useRecoilState(cartState);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalPrice, settotalPrice] = useState<Number>(0);
  const [dataKH, setDataKH] = useState<any>();
  const [diaChi, setDiaChi] = useState("");

  const chuyentrang = useNavigate()
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
      // console.log(data)
      setInputKH(firstItem);
    } catch {}
  }
  function setInputKH(item: any) {
    form.setFieldsValue(item);
  }
  async function CreateCart() {
    if (dataKH == null) {
      alert("Vui lòng đăng nhập");
      chuyentrang("/")
    } else {
      const diaChiInputValue = diaChi;
      let listCTHDB: any[] = [];
      cart.map(function (item: any, index) {
        var obj = {
          maSanPham: item.maSanPham,
          soLuong: item.quantity,
          tongGia: item.quantity * item.gia,
          giamGia: "không có",
          status: 0,
        };
        listCTHDB.push(obj);
      });
      const today = new Date();
      const formattedDate = today.toISOString();
      try {
        const response = await axios.post(
          "https://localhost:44395/api/HoaDonBan/Create_HoaDon",
          {
            trangThai: "0",
            ngayTao: formattedDate,
            diaChiGiaoHang: diaChiInputValue,
            tongGia: totalPrice,
            maKH: dataKH.maKH,
            list_json_ChiTietHD: listCTHDB
          }
        );
        if (response.status === 200) {
          alert("Đặt hàng thành công!");
          localStorage.setItem('cart',JSON.stringify([])); 
        } 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }
  useEffect(() => {
    if (infor.mataikhoan) {
      GetInforUser();
    }
  }, []);
  useEffect(() => {
    let list: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(list);

    const a: any = list;
    setCartRecoil(a);
  }, []);

  useEffect(() => {
    const totalPrice = cart.reduce(
      (total, item) => total + item.gia * item.quantity,
      0
    );
    settotalPrice(totalPrice);
  }, [cart]);

  const handleDecreaseQuantity = (index: number) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index && item.quantity > 1) {
        return {
          ...item, //tạo một bản sao của phần tử hiện tại
          quantity: item.quantity - 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleIncreaseQuantity = (index: number) => {
    const updatedCart = cart.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    let list: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const a: any = list;
    setCartRecoil(a);
  };
  function ChuyenCartHistory(){
    chuyentrang("/user/carthistory")
  }
  return (
    <>
      {/* Hello world */}
      <div className="botom-head">
        <ul>
          <li>
            <a href="">4MEN &nbsp; / &nbsp;</a>
          </li>
          <li>
            <a href="">Đơn đặt hàng&nbsp; / &nbsp;</a>
            <a onClick={ChuyenCartHistory}>Đơn hàng đã đặt</a>
          </li>
        </ul>
      </div>
      <div className="content">
        <div className="content-left">
          <Form form={form} style={{ maxWidth: 600 }}>
            <Form.Item name={"maKH"} label="Mã khách hàng">
              <Input disabled />
            </Form.Item>
            <Form.Item name={"tenKH"} label="Tên khách hàng">
              <Input disabled />
            </Form.Item>
            <Form.Item name={"diaChi"} label="Địa chỉ">
              <Input disabled />
            </Form.Item>
            <Form.Item name={"sdt"} label="Số điện thoại">
              <Input disabled />
            </Form.Item>
          </Form>
          <form>
            <legend>Địa chỉ giao hàng</legend>
            <div className="form-group">
              <label htmlFor="">Địa chỉ</label>
              <div className="form-group-input">
                {/* <textarea name="" id="" cols="49" rows="3" style="outline-color:rgb(150, 179, 225);"></textarea> */}
                <input
                  type="text"
                  value={diaChi}
                  onChange={(e) => setDiaChi(e.target.value)}
                />
              </div>
            </div>
          </form>
          <form style={{ marginTop: 30 }}>
            <legend>Hình thức thanh toán</legend>
            <div className="thanh_toan">
              <label htmlFor="" className="COD">
                <input type="radio" />
                <span>
                  <img
                    style={{ width: 56, height: 31, marginTop: 6 }}
                    src="../assets/anh/giohang-radio1.svg"
                  />
                </span>
                <div style={{ width: "70%", marginTop: 5, float: "right" }}>
                  COD
                  <br />
                  <em>Thanh toán khi nhận hàng</em>
                </div>
              </label>
              {/* <label htmlFor="" className="COD">
                <input type="radio" />
                <span>
                  <img
                    style={{ width: 56, height: 31, marginTop: 6 }}
                    src="../assets/anh/money.png"
                  />
                </span>
                <div style={{ width: "70%", marginTop: 5, float: "right" }}>
                  COD
                  <br />
                  <em>Thanh toán khi nhận hàng</em>
                </div>
              </label> */}
            </div>
          </form>
          <button className="thanh-toan" onClick={CreateCart}>
            THANH TOÁN
          </button>
        </div>
        <div className="content-right">
          <form>
            <legend>Giỏ hàng của bạn</legend>
            <table className="content-right-giohang">
              <thead>
                <tr>
                  <th>Hình</th>
                  <th>Thông tin sản phẩm</th>
                  <th style={{ width: 40 }}>SL</th>
                  <th>Size</th>
                  <th style={{ width: 70 }}>Đơn giá</th>
                  <th style={{ width: 50 }}>Xóa</th>
                </tr>
              </thead>
              <tbody className="parentListCart">
                {cart.map((x: any, index: any) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={"../assets" + x.anhDaiDien}
                        style={{ width: 50 }}
                      />
                    </td>
                    <td>
                      <p>
                        <span className="TTSP">{x.tenSanPham}</span>
                      </p>
                    </td>
                    <td style={{ display: "flex", marginTop: 25 }}>
                      <div>
                        <button
                          style={{ width: 18 }}
                          className="tang"
                          type="button"
                          onClick={() => handleIncreaseQuantity(index)}
                        >
                          +
                        </button>
                      </div>
                      <input
                        style={{ textAlign: "center" }}
                        className="sl"
                        type="text"
                        value={x.quantity}
                        min={1}
                      />
                      <div>
                        <button
                          style={{ width: 18 }}
                          className="giam"
                          type="button"
                          onClick={() => handleDecreaseQuantity(index)}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      {x.tenSize}
                      {/* {x.maSize} */}
                    </td>
                    <td>
                      <p>
                        <span className="gia">{x.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                        {/* {x.maSanPham} */}
                      </p>
                    </td>
                    <td>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="xoa"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
          <form action="">
            <legend>Mã giảm giá (nếu có)</legend>
            <div className="form-group">
              <div className="form-group-input" style={{ padding: 0 }}>
                <input type="text" className="content-left-input" />
              </div>
              <button className="apdung">Áp dụng</button>
            </div>
          </form>
          <form>
            {/* <div style="width: 100%;height: 30px;font-size: 14px; border-bottom: 1px solid gray;padding: 5px;">Số tiền mua sản phẩm:
                  <span class="totalProduct" style="float: right;"></span>
              </div> */}
            <div
              style={{
                width: "100%",
                height: 30,
                fontSize: 14,
                borderBottom: "1px solid gray",
                padding: 5,
                textAlign: "left",
              }}
            >
              Chi tiết giảm giá
            </div>
            <div
              className="tongcong"
              style={{
                width: "100%",
                height: 30,
                fontSize: 14,
                borderTop: "1px solid gray",
                padding: 5,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Tổng tiền thanh toán
              <span style={{ float: "right" }}>{totalPrice.toString()}</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Cart;
