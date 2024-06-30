import { useRecoilState } from "recoil";
import "../assets/css/aonam.css";
import { dataSearch } from "../constant/recoil";
import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { Link } from "react-router-dom";
import ScrollToTopButton from "../constant/ScrollToTopButton";
const Search = function () {
  const [dtaSearch, setDataSearch] = useRecoilState<any>(dataSearch);
  const [data, setData] = useState<any[]>([]);
  const [DataProductsNew, setDataProductsNew] = useState([]);

  const [pagedb, setPagedb] = useState<number>(1);
  const [pageSizedb, setPageSizedb] = useState<number>(9);
  const [totalProductsdb, setTotalProductsdb] = useState<number>(0);

  async function loadData() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/SanPham/searchWithNamePro",
        {
          page: pagedb.toString(),
          pageSize: pageSizedb,
          TenSanPham: dtaSearch,
        }
      );
      // console.log(response.data.data);
      const data = response.data.data;
      // const uniqueProducts = data.filter(
      //   (product: any, index: any, array: any) =>
      //     index ===
      //     array.findIndex(
      //       (
      //         p: any //sẽ tìm chỉ mục của sản phẩm đầu tiên trong mảng
      //       ) => p.tenSanPham === product.tenSanPham //(array), có cùng tenSanPham với sản phẩm hiện tại (product).
      //     )
      // );

      // const firstEightProducts = uniqueProducts.slice(0, 12);
      setData(data);
      // console.log(data);
      setTotalProductsdb(response.data.totalItems);
      // console.log("phan trang")
      // console.log(uniqueProducts.totalItems)
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
  useEffect(() => {
    loadData();
  }, [dtaSearch, pagedb, pageSizedb]);
  useEffect(() => {
    loadDataProductsNew();
  }, []);
  const handlePageChange = (currentPage: number) => {
    setPagedb(currentPage);
    setPageSizedb(9);
  };
  return (
    <>
      <ScrollToTopButton />
      <div className="cat_botom-head">
        <ul>
          <li>
            <a href="">4MEN &nbsp; / &nbsp;</a>
          </li>
          <li>
            <a href="">Tìm kiếm sản phẩm</a>
          </li>
        </ul>
      </div>
      <div className="cat_bottom">
        <div className="cat_botom-left">
          <h1>Tìm kiếm sản phẩm</h1>
        </div>
        <div className="cat_bottom-right">
          <ul>
            <li>
              <a href="">Lọc Danh Mục</a>
              <ul className="cat_sub-banner2ul">
                <li>
                  <a href="">Áo sơ mi</a>
                </li>
                <li>
                  <a href="">Áo thun</a>
                </li>
                <li>
                  <a href="">Áo polo</a>
                </li>
                <li>
                  <a href="">Áo khoác</a>
                </li>
                <li>
                  <a href="">Áo len</a>
                </li>
              </ul>
              <i className="cat_fa-solid fa-chevron-down" />
            </li>
            <li>
              <a href="">
                <span>
                  <img
                    src="./assets/anh/aonamicon.svg"
                    style={{ marginLeft: 17, width: 18, height: 18 }}
                  />{" "}
                </span>
              </a>
            </li>
            <li>
              <a href="">
                <span>
                  {" "}
                  <img
                    className="cat_aonamiconlogo"
                    src="./assets/anh/aonamicon2.svg"
                    style={{ marginLeft: 17, width: 18, height: 18 }}
                  />
                </span>
                <span>
                  {" "}
                  <img
                    className="cat_aonamicon2"
                    src="./assets/anh/aonamicon2.1.svg"
                  />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="cat_content-left">
          <div style={{ paddingBottom: "10px" }}>
            <input
              value={dtaSearch}
              type="text"
              placeholder="Tìm kiếm"
              style={{ padding: 5, width: 400 }}
              className="ng-pristine ng-valid ng-empty ng-touched"
            />
            <button
              style={{
                padding: 5,
                position: "absolute",
                left: 420,
                backgroundColor: "#ffffff",
                border: 0,
                marginTop: 2,
              }}
            >
              <i className="fa-solid fa-magnifying-glass" />
            </button>
          </div>
          {data.length === 0 ? (
            <div className="no-products-message" style={{ paddingTop: "20px" }}>
              Không có sản phẩm nào để hiển thị
            </div>
          ) : (
            data.map(function (value: any, index: any) {
              return (
                <Link to={`/user/detail/${value.maSanPham}`}>
                  <div className="cat_contentsmall" key={index}>
                    <div className="cat_productimg">
                      <div className="cat_productimgpig">
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

                          <div className="cat_overlayitem">
                            <span className="cat_overlayitemicon">
                              <i
                                className="fa-solid fa-cart-shopping"
                                style={{ color: "white" }}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cat_productimgsmall">
                        <a href="">
                          <img src={"../assets" + value.anhDaiDien} alt="" />
                        </a>
                      </div>
                      <div
                        className="cat_producttext"
                        style={{ textAlign: "center" }}
                      >
                        <a
                          ng-click="product(x)"
                          href=""
                          className="cat_spannote"
                          title="Áo Khoác Dạ Regular Phối sọc AK405 Màu Be"
                          style={{ width: "100%" }}
                        >
                          {value.tenSanPham}
                        </a>
                      </div>
                      <div className="cat_protect-money">
                        <p style={{ color: "brown", textAlign: "center" }}>
                          {value.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })} 
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}

          <div className="cat_like-share">
            <button>
              <i className="cat_fa-solid fa-thumbs-up" />
              Thích 711
            </button>
            <button id="share">Chia sẻ</button>
            <Pagination
              current={pagedb} // Sử dụng pagedb thay vì page
              total={totalProductsdb} // Sử dụng totalProductsdb thay vì totalProducts
              pageSize={pageSizedb} // Sử dụng pageSizedb thay vì pageSize
              onChange={handlePageChange}
              style={{ textAlign: "center" }}
            />
          </div>
        </div>

        <div className="cat_content-right">
          <div className="cat_div-search">
            <div>
              <span>
                <h5 style={{ fontSize: 14, color: "#666666" }}>
                  TÌM KIẾM{" "}
                  <hr
                    style={{
                      width: "75%",
                      float: "right",
                      padding: 0,
                      height: 1,
                      backgroundColor: "#cccccc",
                      border: 0,
                      marginTop: 8,
                    }}
                  />{" "}
                </h5>
                <br />
                <form action="" style={{ textAlign: "left" }}>
                  <label htmlFor="">Sản phẩm tại 4MEN</label>
                  <br />
                  <input type="text" placeholder="Từ khóa tìm kiếm" />
                  <button>
                    {" "}
                    <i
                      className="cat_fa-solid fa-magnifying-glass"
                      style={{ color: "gray" }}
                    />
                  </button>
                  {/* <i class="fa-solid fa-magnifying-glass"></i> */}
                </form>
              </span>
            </div>
          </div>
          <div className="cat_product-hot">
            <h5 style={{ fontSize: 14, color: "#666666" }}>
              SẢN PHẨM MỚI
              <hr
                style={{
                  width: "56%",
                  float: "right",
                  padding: 0,
                  height: 1,
                  backgroundColor: "#cccccc",
                  border: 0,
                  marginTop: 8,
                }}
              />{" "}
            </h5>
            {DataProductsNew.map(function (item: any, index: any) {
              return (
                <div className="cat_product-hot-content" key={index}>
                  <div className="cat_div-img">
                    <Link to={`/user/detail/${item.maSanPham}`}>
                      <img src={"/assets" + item.anhDaiDien} alt="" />
                    </Link>
                  </div>
                  <div className="cat_div-information">
                    <a href="">{item.tenSanPham}</a>
                    <p style={{ color: "brown", fontSize: 16 }}>{item.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
