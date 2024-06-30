import "../assets/css/trangchu.css";
import a from '../assets/anh/footer-bottom.png'
import b from '../assets/anh/slideshow1.jpg'
const Footer = function () {
  return (
    <>
      <div className="footer">
        <div className="footer-one" style={{ marginLeft: 40 }}>
          <img src="https://4menshop.com/logo-footer.png?v=1" />
          <ul className="footer-list" style={{ textDecoration: "none",textAlign:"left" }}>
            <li>
              <a href="" title="gioi thieu">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="" title="lien he">
                Liên hệ
              </a>
            </li>
            <li>
              <a href="" title="tuyen dung">
                Tuyển dụng
              </a>
            </li>
            <li>
              <a href="" title="tin tuc 4MEN">
                Tin tức
              </a>
            </li>
            <ul
              style={{
                textDecoration: "none",
                listStyle: "none",
                fontSize: 14,
              }}
            >
              <li>
                <i className="fa-regular fa-envelope" />
                Email:
                <a href="" rel="" title="4MEN EMAIL">
                  info@4menshop.com
                </a>
              </li>
              <li>
                <i className="fa fa-phone" />
                Hotline:
                <a href="tel:0868444644" title="4MEN HOTLINE">
                  0868.444.644
                </a>
              </li>
              <div>
                <form className="newsletter" action="" method="">
                  <label>
                    Đăng ký nhận email khuyến mãi <br />
                    <input
                      type="text"
                      placeholder="Email của bạn"
                      name="email"
                    />
                  </label>
                  <button type="submit">Đăng ký</button>
                </form>
              </div>
            </ul>
          </ul>
        </div>
        <div className="footer-one">
          <h5 className="footer-h5" style={{ color: "#eee" }}>
            <a href="">Hỗ trợ khách hàng</a>
          </h5>
          <ul className="footer-list" style={{ textDecoration: "none" }}>
            <li>
              <a href="" title="gioi thieu">
                Hướng dẫn đặt hàng
              </a>
            </li>
            <li>
              <a href="" title="lien he">
                Hướng dẫn chọn size
              </a>
            </li>
            <li>
              <a href="" title="tuyen dung">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="" title="tin tuc 4MEN">
                Chính sách khách VIP
              </a>
            </li>
            <li>
              <a href="">Thanh toán - Giao hàng</a>
            </li>
            <li>
              <a href="">Chính sách đổi hàng</a>
            </li>
            <li>
              <a href="">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="">Chính sách cookie</a>
            </li>
          </ul>
        </div>
        <div className="footer-one-ggmap">
          <h5 className="footer-h5" style={{ color: "#eee" }}>
            <a href="">hệ thống cửa hàng</a>
          </h5>
          <a href="/cua-hang.html" title="cua hang">
            <img
              src="https://4menshop.com/images/footer-map.jpg"
              alt="dang ky bo cong thuong"
              style={{ marginBottom: 10 }}
              have-change={1}
            />
          </a>
          <ul className="footer-list">
            <li>
              <a
                href=""
                title="gioi thieu"
                style={{ textDecoration: "none", color: "#666", fontSize: 14 }}
              >
                Tìm địa chỉ gần CỬA HÀNG gần bạn
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-one-ggmap">
          <h5 className="footer-h5" style={{ color: "#eee" }}>
            <a href="">Kết nối với 4MEN</a>
          </h5>
          <a href="/cua-hang.html" title="cua hang">
            <img
              src={b}
              alt="dang ky bo cong thuong"
              style={{ marginBottom: 10 }}
              have-change={1}
            />
          </a>
          <ul className="footer-list">
            <li></li>
            <li>
              <a
                href="https://www.facebook.com/4men.com.vn"
                className="facebook"
                title="facebook page"
                rel="noreferrer"
                target="_blank"
              />
            </li>
            <li
              style={{ float: "left", fontSize: 23, color: "cornflowerblue" }}
            >
              <i className="fa-brands fa-facebook" />
            </li>
            <li style={{ float: "left", fontSize: 23 }}>
              <img
                style={{ borderRadius: 5, width: 20, height: 20 }}
                src="./anh/íntragram.jpg"
              />
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              Copyright 2023 · Thiết kế và phát triển bởi{" "}
              <a href="https://4menshop.com/" title="4MEN SHOP">
                4MEN SHOP
              </a>{" "}
              All rights reserved
            </p>
            <p className="line-top">
              Chủ quản: ông Nguyễn Ngọc Năm. <br />
              MST cá nhân: 0312028096 <br />
              Số ĐKKD: 41G8031109 do UBND Quận 7 - Tp.HCM cấp ngày 05/06/2017
            </p>
            <p className="line-top f-brand" style={{ color: "#ff0000" }}>
              Nhãn hiệu "4MEN" đã được đăng kí độc quyền tại Cục sở hữu trí tuệ
              Việt Nam
            </p>
          </div>
          <div className="footer-bottom-img">
            <a href="">
              <img src={a} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
