using DataAccessLayer;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class UserRepository : IUserRepository
    {
        private IDatabaseHelper _dbhp;
        public UserRepository(IDatabaseHelper dbhp)
        {
            _dbhp = dbhp;
        }
        public UserModel Login(string taikhoan, string matkhau)
        {
            string msgError = "";
            try
            {
                var dt = _dbhp.ExecuteSProcedureReturnDataTable(out msgError, "sp_login",
                     "@taikhoan", taikhoan,
                     "@matkhau", matkhau
                     );
                if (!string.IsNullOrEmpty(msgError))
                    throw new Exception(msgError);
                return dt.ConvertTo<UserModel>().FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Create(UserModel model)
        {
            string msgError = "";
            try
            {
                var result = _dbhp.ExecuteScalarSProcedureWithTransaction(out msgError, "create_TaiKhoanVaChiTietTaiKhoan",
                    "@LoaiTaiKhoan", model.LoaiTaiKhoan,
                    "@TenTaiKhoan", model.TenTaiKhoan,
                    "@MatKhau", model.MatKhau,
                    "@Email", model.Email,
                    "@Hoten", model.TenKH,
                    "@DiaChi", model.DiaChi,
                    "@SDT", model.SDT
                   );
                if ((result != null && !string.IsNullOrEmpty(result.ToString()) || !string.IsNullOrEmpty(msgError)))
                {
                    throw new Exception(Convert.ToString(result) + msgError);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ChiTietTaiKhoanModel> GetChiTietTaiKhoan(int MaTaiKhoan)
        {
            try
            {
                string msgError = "";
                var result = _dbhp.ExecuteSProcedureReturnDataTable(out msgError, "getInforTaiKhoan",
                    "@MaTaiKhoan",MaTaiKhoan);
                return result.ConvertTo<ChiTietTaiKhoanModel>().ToList();
            }
            catch (Exception ex) { throw ex; }
        }
    }
}
