import { useEffect, useState } from "react";
import "../assets/css/chitietsanpham.css";
import { useParams } from "react-router-dom";
import img from "../assets/anh/aonam4.jpg";
import { addtoCart } from "../utils/cart";
import axios from "axios";
import { useRecoilState } from "recoil";
import { cartState } from "../constant/recoil";
import ScrollToTopButton from "../constant/ScrollToTopButton";
const Detail = function () {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [DataSameCategory, setDataSameCategory] = useState([]);
  const [sizes, setSizes] = useState<[]>([]);
  const [size, setSize] = useState<string>("");
  const [cart, setCart] = useRecoilState(cartState);
  async function loaddata() {
    const res = await axios.get(
      "https://localhost:44395/api/SanPham/get_by_id?id=" + id
    );
    setData(res.data);
    console.log(res.data);
    GetallSize(res.data);
  }
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
    // alert(selectedSize)
  };
  async function GetallSize(data: any) {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/Search_SP_GetAllSize",
        {
          page: "1",
          pageSize: "10",
          TenSanPham: data.tenSanPham,
        }
      );
      const c = response.data.data;
      const uniqueSize = c.filter(
        (size: any, index: any, array: any) =>
          index ===
          array.findIndex(
            (
              x: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
            ) => x.tenSize === size.tenSize //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
          )
      );
      // console.log(response.data.data)
      setSizes(uniqueSize);
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  }
  async function DatHang() {
    try {
      // console.log("getSp")
      // console.log(data.tenSanPham)
      let tsp: string = data.tenSanPham;
      let ts: string = size;
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/search2",
        {
          page: "1",
          pageSize: "5",
          TenSanPham: tsp,
          TenSize: ts,
        }
      );

      // console.log(response.data.data)
      const kq = response.data.data;
      console.log(kq);
      addtoCart({
        maSanPham: kq[0].maSanPham,
        anhDaiDien: kq[0].anhDaiDien,
        tenSanPham: kq[0].tenSanPham,
        tenSize: kq[0].tenSize,
        maSize: kq[0].maSize,
        gia: kq[0].gia,
      });
      let list = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(list);
    } catch {}
  }
  async function loaddataSameCategory() {
    const res = await axios.post(
      "https://localhost:44395/api/SanPham/search_ChuyenMuc",
      {
        page: "1",
        pageSize: "100",
        MaChuyenMuc: data.maChuyenMuc,
      }
    );
    const data2 = res.data.data;
    const uniqueProducts = data2.filter(
      (product: any, index: any, array: any) =>
        index ===
        array.findIndex(
          (
            p: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
          ) => p.tenSanPham === product.tenSanPham //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
        )
    );
    const a = uniqueProducts.slice(0, 4);
    console.log(a);
    setDataSameCategory(a);
  }
  useEffect(() => {
    loaddataSameCategory();
  }, [data]);
  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      <ScrollToTopButton />
      {data && (
        <div id="chitietsanpham" style={{ height: "1000px" }}>
          <div className="botom-head">
            <ul>
              <li>
                <a href="">4MEN &nbsp; / &nbsp;</a>
              </li>
              <li>
                <a href="">Áo Nam &nbsp; / &nbsp;</a>
              </li>
              <li>
                <a href="">{data.tenSanPham}</a>
              </li>
            </ul>
          </div>
          <div className="content">
            <div
              className="content-left"
              style={{ paddingRight: "40px", height: "770px" }}
            >
              <div
                id="content-left-right"
                // style={{ backgroundColor: "#000000" }}
              >
                <img
                  style={{ width: "100%" }}
                  id="img-main"
                  src={`/assets/${data.anhDaiDien}`}
                />
              </div>
            </div>
            <div className="content-right" style={{ height: "750px" }}>
              <div className="content-right-header">
                <h1>
                  {data.tenSanPham}
                  {/* {data.maSanPham} */}
                </h1>
                <div className="feadback">
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow", fontSize: 12 }}
                  />
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow", fontSize: 12 }}
                  />
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow", fontSize: 12 }}
                  />
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow", fontSize: 12 }}
                  />
                  <i
                    className="fa-solid fa-star"
                    style={{ color: "yellow", fontSize: 12 }}
                  />
                  <span>(35 đánh giá / 78 lượt mua)</span>
                </div>
                <div className="money-left">
                  <span style={{ fontSize: 14, marginTop: 10 }}>
                    <u>Giá bán:</u>
                  </span>
                </div>
                <div className="money-right">
                  <span style={{ fontSize: 22, color: "#c80204" }}>
                    {data.gia
                      ? data.gia.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : "Giá không có sẵn"}
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#cccccc",
                    float: "left",
                    margin: "5px 0px",
                  }}
                />
                <div className="size" style={{ width: "50%" }}>
                  <div>
                    SIZE*
                    <a href="">
                      <em>Hướng dẫn chọn size</em>
                    </a>
                  </div>
                  <select
                    style={{ width: "100%" }}
                    className="chosen-select"
                    onChange={(event) => handleSelectChange(event)}
                  >
                    <option value="0" selected disabled>
                      Chọn size
                    </option>
                    {sizes.map(function (item: any, index) {
                      return (
                        <option key={index} value={item.tenSize}>
                          {item.tenSize}
                        </option>
                      );
                    })}
                  </select>
                  {/* <button> <i class="fa fa-shopping-cart" style="margin-right: 10px;"></i>ĐĂNG KÍ MUA</button>
                   */}
                  <button style={{ width: "100%" }} onClick={DatHang}>
                    <i
                      className="fa fa-shopping-cart"
                      style={{ marginRight: 10 }}
                    />
                    Thêm vào giỏ hàng
                  </button>
                  <span>
                    <i className="fa-sharp fa-solid fa-location-dot" />
                    <a href="" style={{ color: "#000000" }}>
                      <u>Xem địa chỉ còn sản phẩm này</u>
                    </a>
                  </span>
                  <div className="like-share">
                    <button style={{ marginRight: "5px" }}>
                      <i className="fa-solid fa-thumbs-up" />
                      Thích 711
                    </button>
                    <button id="share">Chia sẻ</button>
                  </div>
                </div>
                <div className="number">
                  <div>SỐ LƯỢNG*</div>
                  <select name="size" id="size">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                  <span style={{ marginLeft: 15 }}>
                    <a href="./giohang.html">Đăng kí mua</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-selling ">
            <h2>SẢN PHẨM CÙNG DANH MỤC</h2>

            <div className="product-selling-content">
              {DataSameCategory.map(function (value: any, index: any) {
                return (
                  <div className="contentsmall-selling" key={index}>
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
                            <img src={"/assets" + value.anhDaiDien} />
                          </a>

                          <div className="overlayitem-selling">
                            <span className="overlayitemicon-selling">
                              <i
                                className="fa-solid fa-cart-shopping"
                                style={{ color: "white", rotate: "0deg;" }}
                              ></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="productimgsmall-selling">
                        <a href="">
                          <img src={"/assets" + value.anhDaiDien} />
                        </a>
                      </div>
                      <div
                        className="producttext-selling"
                        style={{ width: "100%", textAlign: "center" }}
                      >
                        <a
                          href=""
                          className="spannote"
                          title="Áo Khoác Dạ Regular Phối sọc AK405 Màu Be"
                        >
                          {value.tenSanPham}
                        </a>
                      </div>
                      <div className="protect-money-selling">
                        <p style={{ color: "brown", textAlign: "center" }}>
                          {value.gia.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Detail;
