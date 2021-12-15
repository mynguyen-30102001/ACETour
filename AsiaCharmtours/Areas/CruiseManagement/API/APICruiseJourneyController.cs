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
    [RoutePrefix("api/cruisejourney")]
    [BaseAuthenticationAttribute]
    public class APICruiseJourneyController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APICruiseJourneyController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var cruises = db.CR_Cruise
                                    .Where(x => !x.IsDeleted)
                                    .Select(x => new
                                    {
                                        x.CruiseId,
                                        x.CruiseName,
                                        x.Destination,
                                        x.DateCreate,
                                        x.Index,
                                        StatusJourney = db.CR_CruiseItineraries.Where(y => y.CruiseId == x.CruiseId).ToList().Count == 0 ? "" : "Đã cập nhật"
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    cruises.RemoveAll(x => !W_Helper.ConvertToUnSign(x.CruiseName).Contains(_keySearch));
                    return Ok(new
                    {
                        cruises = cruises.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = cruises.Count
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
