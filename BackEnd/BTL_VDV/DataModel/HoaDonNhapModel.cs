using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataModel
{
    public class HoaDonNhapModel
    {
        public int MaHoaDon {  get; set; }
        public int MaNhaPhanPhoi { get; set; }
        public DateTime NgayTao {  get; set; }
        public string KieuThanhToan { get; set; }
        public int MaTaiKhoan {  get; set; }

        public decimal TongTien {  get; set; }
        // Sử dụng nullable string cho thuộc tính TenNhaPhanPhoi
        //Điều này cho phép bạn không cần phải truyền giá trị cho thuộc tính TenNhaPhanPhoi nếu nó không bắt buộc
        public string? TenNhaPhanPhoi { get; set; }

        public List<ChitietHDNModel> list_js_ChitietHDN { get; set; }
    }

    
}
