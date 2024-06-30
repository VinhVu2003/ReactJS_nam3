using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModels
{
    public  class HistoryCart
    {
        public int MaHoaDon { get; set; }
        public string TrangThai { get; set; }
        public DateTime NgayTao { get; set; }
        public string DiaChiGiaoHang { get; set; }
        public float TongGia { get; set; }
        public int MaKH { get; set; }
        public int MaChiTietHoaDon { get; set; }
        
        //public int MaSanPham { get; set; }
        public int SoLuong { get; set; }
        public string GiamGia { get; set; }
        //public int status { get; set; }
        //public int MaChuyenMuc { get; set; }
        //public string tenchuyenmuc { get; set; }
        public string TenSanPham { set; get; }
        public string AnhDaiDien { set; get; }
        public decimal Gia { set; get; }
        //public decimal GiaGiam { set; get; }
        //public int LuotXem { set; get; }
        //public int MaSize { get; set; }
        public string TenSize { get; set; }
    }
}
