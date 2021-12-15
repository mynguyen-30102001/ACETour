using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Models;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.CruiseManagement.API
{
    [RoutePrefix("api/cabinprice")]
    [BaseAuthenticationAttribute]
    public class APICabinPriceController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APICabinPriceController")]
        public IHttpActionResult Get(string _keySearch = "", int _cruiseId = -1, int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var cabins = db.CR_Cabin
                                    .Where(x => !x.IsDeleted && (_cruiseId < 0 ? true : x.CruiseId == _cruiseId))
                                    .Select(x => new
                                    {
                                        x.CabinId,
                                        x.CabinName,
                                        x.CR_Cruise.CruiseName,
                                        x.MaxPeople,
                                        x.Index,
                                        Status = x.CR_CabinPrice.Any(y => y.CabinId == x.CabinId) ? "Đã cập nhật" : ""
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    cabins.RemoveAll(x => !W_Helper.ConvertToUnSign(x.CabinName).Contains(_keySearch) && !W_Helper.ConvertToUnSign(x.CruiseName).Contains(_keySearch));
                    return Ok(new
                    {
                        cabins = cabins.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = cabins.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
