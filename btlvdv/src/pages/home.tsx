import "../assets/css/trangchu.css";

import a from "../assets/anh/slideshow1.jpg";
import imgmid1 from "../assets/anh/productbannerleft.jpg";
import imgmid2 from "../assets/anh/productbannermid.jpg";
import imgmid3 from "../assets/anh/productbannerright.jpg";

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilCallback, useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
import { addtoCart } from "../utils/cart";
import ScrollToTopButton from "../constant/ScrollToTopButton";
// import '../assets/js/trangchu.js'
const Home = function () {
  const [data, setData] = useState([]);
  const [DataProductsNew, setDataProductsNew] = useState([]);
  const [DataProductsSelling, setDataProductsSelling] = useState([]);
  const [cart, setCart] = useRecoilState(cartState);

  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/searchWithNamePro",
        {
          page: "1",
          pageSize: "100",
        }
      );
      // console.log(response.data.data);
      const data = response.data.data;
      const uniqueProducts = data.filter(
        (product: any, index: any, array: any) =>
          index ===
          array.findIndex(
            (
              p: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
            ) => p.tenSanPham === product.tenSanPham //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
          )
      );
      const firstEightProducts = uniqueProducts.slice(0, 8);
      setData(firstEightProducts);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function loadDataProductsNew() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/Search_SP_New",
        {
          page: "1",
          pageSize: "100",
        }
      );
      // console.log(response.data.data);
      const data = response.data.data;
      const uniqueProducts = data.filter(
        (product: any, index: any, array: any) =>
          index ===
          array.findIndex(
            (
              p: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
            ) => p.tenSanPham === product.tenSanPham //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
          )
      );
      const firstEightProducts = uniqueProducts.slice(0, 4);
      setDataProductsNew(firstEightProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function loadDataProductsSelling() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/Search_SP_BanChay",
        {
          page: "1",
          pageSize: "100",
        }
      );
      // console.log(response.data.data);
      const data = response.data.data;
      const uniqueProducts = data.filter(
        (product: any, index: any, array: any) =>
          index ===
          array.findIndex(
            (
              p: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
            ) => p.tenSanPham === product.tenSanPham //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
          )
      );
      const firstEightProducts = uniqueProducts.slice(0, 8);
      setDataProductsSelling(firstEightProducts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    loadDataProductsSelling();
  }, []);
  useEffect(() => {
    loadDataProductsNew();
  }, []);
  return (
    <>
      <ScrollToTopButton />
      <div className="slideshow">
        <a href="">
          <img id="img" src={a} alt="" />
        </a>
        <button className="dieuhuong-left">
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button className="dieuhuong-right">
          <i className="fa-solid fa-chevron-right" />
        </button>
      </div>

      <div className="content">
        <div className="product-hot">
          <h5 className="fashion-most-hot">thời trang 4menshop</h5>

          {data.map(function (value: any, index) {
            return (
              <div key={index} className="contentsmall">
                <div className="productimg">
                  <div className="productimgpig">
                    <Link to={`/user/detail/${value.maSanPham}`}>
                      <img src={"/assets" + value.anhDaiDien} alt="" />
                    </Link>
                    <div className="overlayitem">
                      <span className="overlayitemicon">
                        <i
                          onClick={() => {
                            addtoCart({
                              maSanPham: value.maSanPham,
                              anhDaiDien: value.anhDaiDien,
                              tenSanPham: value.tenSanPham,
                              maSize: value.maSize,
                              tenSize: value.tenSize,
                              gia: value.gia,
                            });
                            let list = JSON.parse(
                              localStorage.getItem("cart") || "[]"
                            );
                            setCart(list);
                          }}
                          className="fa-solid fa-cart-shopping"
                          style={{ color: "white", rotate: "-20deg" }}
                        />
                      </span>
                    </div>
                  </div>
                  <div className="productimgsmall">
                    <a href="">
                      <img src={"../assets" + value.anhDaiDien} alt="" />
                    </a>
                  </div>
                  <div className="producttext">
                    <a
                      href="/Detail"
                      className="spannote"
                      title="{value.tenSanPham}"
                    >
                      {value.tenSanPham}
                    </a>
                  </div>
                  <div className="protect-money">
                    <p>{value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  {/* <div id="masp">{{x.maSanPham}}</div> */}
                </div>
              </div>
            );
          })}
          {/* </div> */}
          <div id="CuaSo_SP">
            <div id="CuaSo_SP_DIV_IMG"></div>
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------------------------------------- */}
        <div className="productbannermid">
          <div className="imgleft">
            <a href="" className="img1">
              <img src={imgmid1} alt="" />
            </a>
          </div>
          <div className="imgmid">
            <a href="" className="img2">
              <img src={imgmid2} alt="" />
            </a>
          </div>
          <div className="imgright">
            <a href="" className="img3">
              <img src={imgmid3} alt="" />
            </a>
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------------------------------------------- */}
        <div className="product-new">
          <h5 className="fashion-most-new">thời trang bán chạy</h5>
          <div className="new">
            {DataProductsSelling.map(function (value: any, index) {
              return (
                <Link to={`/user/detail/${value.maSanPham}`}>
                  <div key={index} className="contentsmall-new">
                    <div className="productimg-new">
                      <div className="productimgpig-new">
                        <img src={"../assets" + value.anhDaiDien} alt="" />

                        <div className="overlayitem-new">
                          <span className="overlayitemicon-new">
                            <i
                              className="fa-solid fa-cart-shopping"
                              style={{
                                color: "white",
                                rotate: "-20deg",
                                fontSize: 20,
                              }}
                            />
                          </span>
                        </div>
                      </div>
                      <div className="productimgsmall-new">
                        <a className="img1" href="">
                          <img src={"../assets" + value.anhDaiDien} alt="" />
                        </a>
                        {/* <a href=""><img src="./anh/thoitranghotnhat1.4.jpg" alt=""></a>
                              <a href=""><img src="./anh/thoitranghotnhat1.2.jpg" alt=""></a>
                              <a href=""><img src="./anh/thoitranghotnhat1.6.jpg" alt=""></a> */}
                      </div>
                      <div className="producttext-new">
                        <a
                          className="spannote-new"
                          title="Áo Khoác Dạ Regular Phối sọc AK405 Màu Be"
                          style={{ width: "100%", textAlign: "center" }}
                        >
                          <p className="p-product-new-1">{value.tenSanPham}</p>
                        </a>
                      </div>
                      <div className="protect-money-new">
                        <p style={{ color: "brown", textAlign: "center" }}>
                          {value.gia}đ
                          <em
                            style={{
                              textDecoration: "line-through",
                              fontSize: 13,
                              color: "black",
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* ------------------------------------------------------------------------------------------------------------------------------- */}
        <div className="product-selling ">
          <h5 className="fashion-most-selling" style={{ textAlign: "center" }}>
            thời trang mới nhất
          </h5>
          <div className="product-selling-content">
            {DataProductsNew.map(function (value: any, index: any) {
              return (
                <Link to={`/user/detail/${value.maSanPham}`}>
                  <div className="contentsmall-selling " key={index}>
                    <div className="productimg-selling">
                      <div className="productimgpig-selling">
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                          }}
                        >
                          <a href="">
                            <img src={"../assets" + value.anhDaiDien} alt="" />
                          </a>
                          <div className="overlayitem-selling">
                            <span className="overlayitemicon-selling">
                              <i
                                className="fa-solid fa-cart-shopping"
                                style={{
                                  color: "white",
                                  rotate: "-20deg",
                                  fontSize: 20,
                                }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="productimgsmall-selling">
                        <a href="">
                          <img src={"../assets" + value.anhDaiDien} alt="" />
                        </a>
                      </div>
                      <div
                        className="producttext-selling"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <a
                          className="spannote"
                          title="Áo Khoác Dạ Regular Phối sọc AK405 Màu Be"
                        >
                          {value.tenSanPham}
                        </a>
                      </div>
                      <div className="protect-money-selling">
                        <p style={{ color: "brown", textAlign: "center" }}>
                          {value.gia}đ
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* - -------------------------------------------------------------------------------------------------------------------*/}
        <div className="footer1">
          <div className="footer1-a">
            <div className="footer1-content">
              <a href="">
                <i
                  style={{ transform: "rotate(-25deg)", fontSize: 35 }}
                  className="fa fa-plane"
                  aria-hidden="true"
                />
              </a>
              <h4>Thanh toán &amp; giao hàng</h4>
              <p>
                Miễn phí vận chuyển cho đơn hàng trên 499.000 VNĐ
                <br />
                - Giao hàng và thu tiền tận nơi
                <br />
                - Chuyển khoản và giao hàng
                <br />- Mua hàng tại shop
              </p>
            </div>
          </div>
          <div className="footer1-a">
            <div className="footer1-content">
              <a href="">
                <i
                  style={{ fontSize: 35 }}
                  className="fa fa-credit-card"
                  aria-hidden="true"
                />
              </a>
              <h4>Thẻ thành viên</h4>
              <p>
                Ché độ ưu đãi thành viên VIP:
                <br />
                - 5% cho thành viên Bạc
                <br />
                - 10% cho thành viên Vàng
                <br />- 15% cho thành viên Kim cương
              </p>
            </div>
          </div>
          <div className="footer1-a">
            <div className="footer1-content">
              <a href="">
                <i
                  style={{ fontSize: 35 }}
                  className="fa-regular fa-clock"
                  aria-hidden="true"
                />
              </a>
              <h4>Giờ mở cửa</h4>
              <p>
                8h30 đến 22:00
                <br />
                - Tất cả các ngày trong tuần
                <br />
                Áp dụng cho tất cả các chi nhánh hệ thông cửa hàng 4MEN
              </p>
            </div>
          </div>
          <div className="footer1-a">
            <div className="footer1-content">
              <a href="">
                <i
                  style={{ fontSize: 35 }}
                  className="fa fa-headphones"
                  aria-hidden="true"
                />
              </a>
              <h4>Hỗ trợ 24/7</h4>
              <p>
                Gọi ngay cho chúng tôi khi bạn có thắc mắc
                <br />- 0868.444.644
              </p>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------------------------------------- */}
      </div>
    </>
  );
};
export default Home;
