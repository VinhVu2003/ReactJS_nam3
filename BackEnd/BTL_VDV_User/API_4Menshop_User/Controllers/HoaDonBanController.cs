using BusinessLogicLayer;
//using BusinessLogicLayer;
using DataModel;
using DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace API_BTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonBanController : ControllerBase
    {
        private IHoaDonBanBUS bus;
        public HoaDonBanController(IHoaDonBanBUS bus)
        {
            this.bus = bus;
        }
        [Route ("Create_HoaDon")]
        [HttpPost]
        public HoaDonModel Create(HoaDonModel model)
        {
            bus.Create (model);
            return model;
        }


        //[Route("Update_Hoadon")]
        //[HttpPost]
        //public HoaDonModel Update(HoaDonModel model)
        //{
        //    bus.Update (model);
        //    return model;
        //}

        //[Route("HoaDon_Delete")]
        //[HttpDelete]
        //public IActionResult Delete(int id)
        //{
        //    bus.Delete(id);
        //    return Ok();
        //}

        //[Route("HoaDon_Search")]
        //[HttpPost]
        //public IActionResult Search([FromBody] Dictionary<string, object> formData)
        //{
        //    try
        //    {
        //        var page = int.Parse(formData["page"].ToString());
        //        var pageSize = int.Parse(formData["pageSize"].ToString());
        //        string TenKhach = "";
        //        if (formData.Keys.Contains("TenKH") && !string.IsNullOrEmpty(Convert.ToString(formData["TenKH"]))) { TenKhach = Convert.ToString(formData["TenKH"]); }

        //        string TenSanPham = "";

        //        if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) { TenSanPham = Convert.ToString(formData["TenSanPham"]); }

        //        long total = 0;
        //        var data = bus.Search(page, pageSize, out total, TenKhach);
        //        return Ok(
        //            new
        //            {
        //                TotalItems = total,
        //                Data = data,
        //                Page = page,
        //                PageSize = pageSize
        //            }
        //            );
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //}


        //[Route("get_by_id")]
        //[HttpGet]
        //public HoaDonModel GetDatabyID(int id)
        //{
        //    return bus.GetDatabyID(id);
        //}

        [Route("GetListHistoryCart")]
        [HttpPost]
        public IActionResult GetLisHistoryCart([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                int MaKH = 0;
                if (formData.ContainsKey("MaKH") && !string.IsNullOrEmpty(formData["MaKH"].ToString()))
                {
                    if (int.TryParse(formData["MaKH"].ToString(), out int mcm))
                    {
                        MaKH = mcm;
                    }
                }

                string TrangThai = null;
                if (formData.Keys.Contains("TrangThai") && !string.IsNullOrEmpty(Convert.ToString(formData["TrangThai"])))
                {
                    TrangThai = Convert.ToString(formData["TrangThai"]);
                }

                var data = bus.GetLisHistoryCart(MaKH, TrangThai);
                return Ok(new { Data = data });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        //[Route("CTHD_get_by_id")]
        //[HttpGet]
        //public CTHDB_GetID_Model CTHD_GetDatabyID(int id)
        //{
        //    return bus.CTHD_GetDatabyID(id);
        //}
    }
}
