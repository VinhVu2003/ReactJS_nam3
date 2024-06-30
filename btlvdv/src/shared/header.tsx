import "../assets/css/trangchu.css";
import banner from "../assets/anh/banner2.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from 'react';//sử dụng useRefhook để thao tác trực tiếp kiểu của phần tử đầu vào
                                          //cho phép bạn sửa đổi các thuộc tính CSS của đầu vào
import { useRecoilCallback, useRecoilState } from "recoil";
import axios from "axios";
import {
  ThongTinKhachHang,
  cartState,
  categoryState,
  dataSearch,
} from "../constant/recoil";
import { json } from "stream/consumers";

const Header = function () {
  const navigate = useNavigate()

  const [cate, setCate] = useRecoilState(categoryState);
  const [dtSearch, setDataSearch] = useRecoilState<any>(dataSearch);
  const [kh,setKhachang] = useRecoilState<any>(ThongTinKhachHang)
  const [dataAo, setDataAo] = useState([]);
  const [dataQuan, setDataQuan] = useState([]);
  const [dataPhukien, setDataPhukien] = useState([]);
  const [tenKH, setTenKH] = useState<string>("lỗi");
  const [cart, setCart] = useRecoilState(cartState);

  const inputRef = useRef<HTMLInputElement>(null);
  const [input,setInput] = useState(false)
  function onSearch(){
    if (inputRef.current) {
      if(input){
        inputRef.current.style.height = '45px'; 
        inputRef.current.style.border = '1px solid #131313'; 
      }
      else{
        inputRef.current.style.height = '0px'; 
        inputRef.current.style.border = 'none'; 
      }
      setInput(!input)
    }
    
  }
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Perform desired action when Enter is pressed
      // console.log('Enter key pressed:', inputRef.current?.value);
      navigate("/user/search") 
    }
  };

  function handleInputChange(){
    if (inputRef.current) {
      // console.log(inputRef.current.value);
      setDataSearch(inputRef.current.value)
    }
  }

  function onCategory(category: any) {
   
    const newCategory: any = {
      maChuyenMuc: category.maChuyenMuc,
      tenChuyenMuc: category.tenChuyenMuc,
    };
    setCate(newCategory);
    // Thực hiện chuyển hướng đến '/user/category' mà không cần reload toàn bộ trang
  }
  function logout(){
    const confirm = window.confirm("Bạn có muốn đăng xuất không?")
    if(confirm){
      navigate("/")
    }
  }
  
  async function loadDataPhukien() {
    try {
      const res = await axios.post(
        "https://localhost:44395/api/ChuyenMuc/ChuyenMuc_Search",
        {
          page: "1",
          pageSize: "100",
          TenChuyenMuc: "",
        }
      );
      // console.log(res.data.data);
      const phukiens = res.data.data.filter((item: any) => {
        return (
          item.tenChuyenMuc &&
          !item.tenChuyenMuc.startsWith("Áo") &&
          !item.tenChuyenMuc.startsWith("Quần")
        );
      });
      // console.log(phukiens)
      setDataPhukien(phukiens);
    } catch {}
  }
  async function loadDataAo() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/ChuyenMuc/ChuyenMuc_Search",
        {
          page: "1",
          pageSize: "8",
          TenChuyenMuc: "Áo",
        }
      );

      setDataAo(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  async function loadDataQuan() {
    try {
      const response = await axios.post(
        "https://localhost:44395/api/ChuyenMuc/ChuyenMuc_Search",
        {
          page: "1",
          pageSize: "8",
          TenChuyenMuc: "Quần",
        }
      );
      setDataQuan(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    loadDataPhukien();
  }, []);
  useEffect(() => {
    loadDataAo();
  }, []);
  useEffect(() => {
    loadDataQuan();
  }, []);
  useEffect(() => {
    // let ten = JSON.parse(localStorage.getItem('ThongTinKhachHang')||'[]')
    // setTenKH(ten.tenKH);
    if(kh && kh.tenKH){
      setTenKH(kh.tenKH)
    }
    else{
      setTenKH("Lỗi")
    }
  },[kh]);
  return (
    <div className="header">
      <>
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
                <div className="inforCustomerlogo">
                  <Link to={`/user/infor`}>
                    <i className="fa-solid fa-user" />
                  </Link>
                  {tenKH||"Lỗi"}
                </div>
                <div className="inforCustomer">
                  <div className="inforCustomer2" onClick={()=>{navigate("/user/infor")}}>Thông tin của tôi</div>
                  <div className="inforCustomer2" onClick={()=>{navigate("/user/carthistory")}}>Đơn mua</div>
                  <div className="inforCustomer2" onClick={logout}>Đăng xuất</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="header2">
          <a>
            <Link to={`/user/home`}>
              <img className="logo" src={banner} alt="" />
            </Link>
          </a>
          <div className="header2div">
            <ul className="banner2ul">
              <li>
                <div>
                  <a href="">
                    KHUYẾN MÃI
                    <div className="banneritem1">
                      <span className="hot" style={{ color: "white" }}>
                        Hot
                      </span>
                    </div>
                  </a>
                </div>
                <a href=""></a>
              </li>
              <li>
                <a href="">
                  HÀNG MỚI VỀ
                  <div className="banneritem2">
                    <span className="hot" style={{ color: "white" }}>
                      Hot
                    </span>
                  </div>
                </a>
              </li>
              <li>
                <a href="">ÁO NAM</a>
                <ul className="sub-banner2ul">
                  {dataAo.map(function (value: any, index: any) {
                    return (
                      <li key={index} onClick={() => onCategory(value)}>
                        <Link to={`/user/category`}>{value.tenChuyenMuc}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <a href="">QUẦN NAM</a>
                <ul className="sub-banner2ul">
                  {dataQuan.map(function (value: any, index: any) {
                    return (
                      <li key={index} onClick={() => onCategory(value)}>
                        <Link to={`/user/category`}>{value.tenChuyenMuc}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <a href="">PHỤ KIỆN</a>
                <ul className="sub-banner2ul">
                  {dataPhukien.map(function (value: any, index: any) {
                    return (
                      <li key={index} onClick={() => onCategory(value)}>
                        <Link to={`/user/category`}>{value.tenChuyenMuc}</Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <li>
                <a href="">GIÀY DÉP</a>
                <ul className="sub-banner2ul">
                  <li>
                    <a>Giày</a>
                  </li>
                  <li>
                    <a>Sandal</a>
                  </li>
                  <li>
                    <a>Dép nam</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="banner2right">
            <div className="b1">
              <span className="banner2span">
                <Link to={`/user/cart`}>
                  <i
                    className="fa-solid fa-cart-shopping"
                    style={{ color: "brown" }}
                  />
                  <span
                    style={{
                      color: "brown",
                      position: "absolute",
                      top: "13px",
                    }}
                  >
                    {cart.length}
                  </span>
                </Link>
{/* 
                <div className="giohang">
                  <h4 style={{ margin: 10 }}>Sản phẩm trong giỏ hàng</h4>
                  <hr />
                  <div className="giohang-chung"></div>
                  <div className="price-total">
                    Tổng: <span>0</span>
                    <sup>đ</sup>
                  </div>
                  <a href="">
                    <button className="guidonhang">Gửi đơn hàng</button>
                  </a>
                </div> */}
              </span>
            </div>
            <div className="b1">
              <span className="banner3span" onClick={onSearch}>
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ color: "brown" }}
                />
              </span>
              <input className="input_Search" type="text" ref={inputRef} onChange={handleInputChange} onKeyDown={handleKeyDown}></input>
              {/* <div className="inputContainer">
                <input
                  ng-model="inputData"
                  ng-keypress="checkEnterKey($event)"
                  id="Search"
                  type="text"
                  placeholder="Tìm kiếm"
                />
              </div> */}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};
export default Header;
