using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class ChiTietTaiKhoanModel
    {
        public int MaTaiKhoan { get; set; }
        public int LoaiTaiKhoan { get; set; }
        public string TenTaiKhoan { get; set; }
        public string MatKhau { get; set; } 
        public string Email {  get; set; }
        public string DiaChi { get; set; }
        public string HoTen { get; set; }
        public string SoDienThoai { get; set; }
        public string AnhDaiDien { get; set; }
    }
}
