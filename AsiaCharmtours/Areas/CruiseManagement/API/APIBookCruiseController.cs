using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;

namespace AsiaCharmtours.Areas.CruiseManagement.API
{
    [RoutePrefix("api/getcruisebook")]
    public class APIBookCruiseController : ApiController
    {

        
        [Route("get")]
        [HttpGet]
        public IHttpActionResult Get(string _keySearch = "", int _cruiseId = -1, int _pageNumber = 1, int _pageSize = 100, string _lang = "vi") {
            var db = new DB();

            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            var getBookCruise = db.CR_CruiseBookTour.Where(x => (_cruiseId < 0 ? true : x.Id == _cruiseId))
            .Select(x => new {

                x.Id,
                x.FullName,
                x.Gender,
                x.Email,
                x.People,
                x.PhoneNumber,
                x.Cruise,
                x.TotalPrice
            }).OrderByDescending(m => m.Id).ToList();



            return Ok(new {
                listCruise = getBookCruise.Where(m => W_Helper.ConvertToUnSign(m.FullName).Contains(_keySearch)),
                totalRecord = getBookCruise.Count()
            });
        }

        [Route("detail")]
        [HttpGet]
        public IHttpActionResult Detail(int id) {
            var db = new DB();
            var getDetailBookCruise = db.CR_CruiseBookTour.Select(x => new {
                x.Id,
                x.Gender,
                x.FullName,
                x.Email,
                x.PhoneNumber,
                x.Country,
                x.Address,
                x.SocialMedia,
                x.SpecialRequests,
                x.Departure,
                x.Cruise,
                x.Cabin,
                x.People,
                x.TourType,
                x.ServiceHotel,
                x.TotalPrice
            }).FirstOrDefault(m => m.Id == id);


            return Ok(new {
                cruise = getDetailBookCruise
            });
        }

    }
}
