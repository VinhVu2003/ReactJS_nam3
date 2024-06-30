using BusinessLogicLayer;
using DataModel;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API_BTL.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamController : ControllerBase
    {
        private ISanPhamBUS _bus;
        public SanPhamController(ISanPhamBUS bus)
        {
            _bus = bus;
        }
        [Route("San_Pham_Create")]
        [HttpPost]
        public SanPhamModel Create(SanPhamModel model)
        {
            _bus.Create(model);
            return model;
        }

        [Route("San_Pham_Delete")]
        [HttpDelete]
        public IActionResult Delete(int ID)
        {
            _bus.Delete(ID);
            return Ok();

        }

        //[Authorize]
        [Route("search")]
        [HttpPost]
        public IActionResult Search([FromBody] Dictionary<string, object> formData)
        {
            try
            {
                var page = int.Parse(formData["page"].ToString());
                var pageSize = int.Parse(formData["pageSize"].ToString());
                string TenSanPham = "";
                
                if (formData.Keys.Contains("TenSanPham") && !string.IsNullOrEmpty(Convert.ToString(formData["TenSanPham"]))) 
                {
                    TenSanPham = Convert.ToString(formData["TenSanPham"]);   
                }


                long total = 0;
                var data = _bus.Search(page, pageSize, out total, TenSanPham);
                return Ok(
                    new
                    {
                        TotalItems = total,
                        Data = data,
                        Page = page,
                        PageSize = pageSize
                    }
                    );
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [Route("SanPham_Update")]
        [HttpPost]
        public SanPhamModel Update(SanPhamModel model)
        {
            _bus.Update(model); return model;
        }

        [Route("get_by_id")]
        [HttpGet]
        public SanPhamModel GetAtabeyID(int id)
        {
            return _bus.GetDatabyID(id);
        }

    }
}
