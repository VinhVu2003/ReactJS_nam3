using BusinessLogicLayer;

using DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_BTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserControllers : ControllerBase
    {
        private IUserBUS _user;
        public UserControllers(IUserBUS user)
        {
            _user=user;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthenticateModel model)
        {
            var user = _user.Login(model.Username, model.Password);
            if (user == null)
                return BadRequest(new { message = "Tài khoản hoặc mật khẩu không đúng!" });
            return Ok(new { taikhoan = user.TenTaiKhoan, email = user.Email, token = user.token,mataikhoan=user.MaTaiKhoan,loaitaikhoan=user.LoaiTaiKhoan,matkhau=user.MatKhau });
        }

        [Route("Create")]
        [HttpPost]
        public UserModel Create(UserModel model)
        {
            _user.Create(model);
            return model;
        }

        [Route("GetChiTietTaiKhoan")]
        [HttpPost]
        public List<ChiTietTaiKhoanModel> GetChiTietTaiKhoans( int MaTK)
        {
            
            return _user.GetChiTietTaiKhoan(MaTK);
        }
    }
}
