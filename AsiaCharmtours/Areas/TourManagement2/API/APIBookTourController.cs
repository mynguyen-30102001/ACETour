using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AsiaCharmtours.Areas.TourManagement.API
{
    [RoutePrefix("api/booktour")]
    [BaseAuthenticationAttribute]
    public class APIBookTourController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIBookTourController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100)
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                using (var db = new DB())
                {
                    var bookTours = db.T2_TourBook
                                    .Where(x => x.BookTourID == x.BookTourID && x.LanguageCode == _lang)
                               
                                    .Select(x => new
                                    {
                                        x.BookTourID,
                                        x.People,
                                        x.TourType,
                                        x.DateArrival,
                                        x.Message,
                                        x.Gender,
                                        x.FullName,
                                        x.Email,
                                        x.Country,
                                        x.Address,
                                        x.Phone,
                                    })
                                    .OrderByDescending(x => x.BookTourID)
                                    .ToList();
                    bookTours.RemoveAll(x => !W_Helper.ConvertToUnSign(x.TourType).Contains(_keySearch) &&
                                                !W_Helper.ConvertToUnSign(x.FullName).Contains(_keySearch) &&
                                                !W_Helper.ConvertToUnSign(x.Country).Contains(_keySearch));
                    return Ok(new
                    {
                        bookTours = bookTours.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = bookTours.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("detail")]
        [HttpGet]
        [AcceptAction(ActionName = "Detail", ControllerName = "APIBookTourController")]
        public IHttpActionResult Detail(int _tourBookId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.T2_TourBook.Any(x => x.BookTourID == _tourBookId))
                        return NotFound();
                    T2_TourBook tourBook = db.T2_TourBook.FirstOrDefault(x => x.BookTourID == _tourBookId);
                    return Ok(new T2_TourBook()
                    {
                        BookTourID = tourBook.BookTourID,
                        People = tourBook.People,
                        Email = tourBook.Email,
                        DateArrival = tourBook.DateArrival,
                        Message = tourBook.Message,
                        Gender = tourBook.Gender,
                        FullName = tourBook.FullName,
                        Country = tourBook.Country,
                        Address = tourBook.Address,
                        Phone = tourBook.Phone,
                        TourType = tourBook.TourType,
                        Budget = tourBook.Gender,
                        Year = tourBook.Year,
                        Nationality = tourBook.Nationality,
                        
                        
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("delete")]
        [HttpGet]
        [AcceptAction(ActionName = "Delete", ControllerName = "APIBookTourController")]
        public IHttpActionResult Delete(int _tourSellId)
        {
            try
            {
                using (var db = new DB())
                {
                    var res = db.T2_TourBook.FirstOrDefault(x => x.BookTourID == _tourSellId);
                    if (res != null)
                    {
                        db.T2_TourBook.Remove(res);
                        db.SaveChanges();

                        return Ok();
                    }
                    else
                        return NotFound();

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
