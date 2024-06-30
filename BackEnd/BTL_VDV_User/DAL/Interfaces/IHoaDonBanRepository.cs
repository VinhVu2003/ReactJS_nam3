using DataModel;
using DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public partial interface IHoaDonBanRepository

    {
        bool Create(HoaDonModel model);

        //bool Update(HoaDonModel model);
        //bool Delete(int ID);
        //HoaDonModel GetDatabyID(int id);
        //public List<HoaDonSearch_Model> Search(int pageIndex, int pageSize, out long total, string TenKhach);

        List<HistoryCart> GetLisHistoryCart(int MaKH, string TrangThai);

        //CTHDB_GetID_Model CTHD_GetDatabyID(int id);
    }
}
