using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.HotelManagement.API
{
    [RoutePrefix("api/hotel")]
    [BaseAuthenticationAttribute]
    public class APIHotelController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIHotelController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var hotels = db.W_Hotel.Where(x => !x.IsDeleted)
                                    .Select(x => new
                                    {
                                        x.HotelId,
                                        x.HotelName,
                                        x.Index,
                                        x.HotelCode
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    hotels.RemoveAll(x => !W_Helper.ConvertToUnSign(x.HotelCode).Contains(_keySearch) && !W_Helper.ConvertToUnSign(x.HotelName).Contains(_keySearch));
                    return Ok(new
                    {
                        hotels = hotels.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = hotels.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("post")]
        [HttpPost]
        [AcceptAction(ActionName = "Post", ControllerName = "APIHotelController")]
        public IHttpActionResult Post([FromBody]W_Hotel _hotel)
        {
            try
            {
                using (var db = new DB())
                {
                    if (db.W_Hotel.Any(x => x.HotelCode == _hotel.HotelCode))
                        return BadRequest("Mã khách sạn đã tồn tại");
                    if (db.W_Hotel.Any(x => x.HotelAlias == _hotel.HotelAlias))
                        return BadRequest("Alias khách sạn đã tồn tại");
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        _hotel.Excellent = 10;
                        _hotel.IsDeleted = false;
                        db.W_Hotel.Add(_hotel);
                        db.SaveChanges();
                        transaction.Commit();
                    }
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("detail")]
        [HttpGet]
        [AcceptAction(ActionName = "Detail", ControllerName = "APIHotelController")]
        public IHttpActionResult Detail(int _hotelId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Hotel.Any(x => x.HotelId == _hotelId))
                        return NotFound();
                    W_Hotel hotel = db.W_Hotel.FirstOrDefault(x => x.HotelId == _hotelId);
                    return Ok(new
                    {
                        hotel.HotelId,
                        hotel.Activities,
                        hotel.Description,
                        hotel.Facility,
                        hotel.Address,
                        hotel.FrameLocation,
                        hotel.HotelCode,
                        hotel.HotelName,
                        hotel.HotelAlias,
                        hotel.Image,
                        hotel.Index,
                        hotel.MainMenuId,
                        hotel.MetaDescription,
                        hotel.MetaTitle,
                        hotel.Note,
                        hotel.Services,
                        hotel.ShortDescription,
                        hotel.Star,
                        hotel.PriceFrom,
                        W_HotelGallery = hotel.W_HotelGallery.Select(x => new
                        {
                            x.Image
                        }),
                        W_HotelMenu = hotel.W_HotelMenu.Select(x => new
                        {
                            x.MenuId,
                            x.Index
                        })
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("put")]
        [HttpPost]
        [AcceptAction(ActionName = "Put", ControllerName = "APIHotelController")]
        public IHttpActionResult Put([FromBody]W_Hotel _hotel)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Hotel.Any(x => x.HotelId == _hotel.HotelId))
                        return NotFound();
                    if (db.W_Hotel.Any(x => x.HotelAlias == _hotel.HotelAlias && x.HotelId != _hotel.HotelId))
                        return BadRequest("Alias khách sạn đã tồn tại");
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        W_Hotel hotel = db.W_Hotel.FirstOrDefault(x => x.HotelId == _hotel.HotelId);
                        db.W_HotelGallery.RemoveRange(db.W_HotelGallery.Where(x => x.HotelId == hotel.HotelId));
                        db.W_HotelMenu.RemoveRange(db.W_HotelMenu.Where(x => x.HotelId == hotel.HotelId));
                        if (_hotel.W_HotelGallery is null) _hotel.W_HotelGallery = new List<W_HotelGallery>();
                        if (_hotel.W_HotelMenu is null) _hotel.W_HotelMenu = new List<W_HotelMenu>();

                        _hotel.W_HotelGallery.ToList().ForEach(x =>
                        {
                            db.W_HotelGallery.Add(new W_HotelGallery()
                            {
                                HotelId = hotel.HotelId,
                                Image = x.Image
                            });
                        });
                        _hotel.W_HotelMenu.ToList().ForEach(x =>
                        {
                            db.W_HotelMenu.Add(new W_HotelMenu()
                            {
                                HotelId = hotel.HotelId,
                                MenuId = x.MenuId,
                                Index = x.Index
                            });
                        });
                        hotel.Activities = _hotel.Activities;
                        hotel.Description = _hotel.Description;
                        hotel.Facility = _hotel.Facility;
                        hotel.Address = _hotel.Address;
                        hotel.FrameLocation = _hotel.FrameLocation;
                        hotel.HotelName = _hotel.HotelName;
                        hotel.HotelAlias = _hotel.HotelAlias;
                        hotel.Image = _hotel.Image;
                        hotel.Index = _hotel.Index;
                        hotel.MainMenuId = _hotel.MainMenuId;
                        hotel.MetaDescription = _hotel.MetaDescription;
                        hotel.MetaTitle = _hotel.MetaTitle;
                        hotel.Note = _hotel.Note;
                        hotel.Services = _hotel.Services;
                        hotel.ShortDescription = _hotel.ShortDescription;
                        hotel.Star = _hotel.Star;
                        hotel.PriceFrom = _hotel.PriceFrom;
                        db.SaveChanges();
                        transaction.Commit();
                    }
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("delete")]
        [HttpGet]
        [AcceptAction(ActionName = "Delete", ControllerName = "APIHotelController")]
        public IHttpActionResult Delete(int _hotelId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Hotel.Any(x => x.HotelId == _hotelId))
                        return NotFound();
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        W_Hotel hotel = db.W_Hotel.FirstOrDefault(x => x.HotelId == _hotelId);
                        hotel.IsDeleted = true;
                        db.SaveChanges();
                        transaction.Commit();
                        return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
