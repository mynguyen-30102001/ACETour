using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.CruiseManagement.API
{
    [RoutePrefix("api/cabin")]
    [BaseAuthenticationAttribute]
    public class APICabinController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APICabinController")]
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
                                        x.Acreage,
                                        x.Bed,
                                        x.Index,
                                        Highlight = (!x.Highlight ? "" : "x")
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

        [Route("post")]
        [HttpPost]
        [AcceptAction(ActionName = "Post", ControllerName = "APICabinController")]
        public IHttpActionResult Post([FromBody]CR_Cabin _cabin)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        _cabin.IsDeleted = false;
                        db.CR_Cabin.Add(_cabin);
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

        [Route("detail")]
        [HttpGet]
        [AcceptAction(ActionName = "Detail", ControllerName = "APICabinController")]
        public IHttpActionResult Detail(int _cabinId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.CR_Cabin.Any(x => x.CabinId == _cabinId && !x.IsDeleted))
                    {
                        return NotFound();
                    }
                    CR_Cabin cabin = db.CR_Cabin.FirstOrDefault(x => x.CabinId == _cabinId);
                    return Ok(new
                    {
                        cabin.CabinId,
                        cabin.CabinName,
                        cabin.Acreage,
                        cabin.Amenities,
                        cabin.Balcony,
                        cabin.Bed,
                        cabin.Conditions,
                        cabin.CruiseId,
                        cabin.Description,
                        cabin.Extrabed,
                        cabin.Highlight,
                        cabin.Image,
                        cabin.Index,
                        cabin.MaxPeople,
                        CR_CabinGallery = cabin.CR_CabinGallery.Select(x => new
                        {
                            x.Image
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
        [AcceptAction(ActionName = "Put", ControllerName = "APICabinController")]
        public IHttpActionResult Put([FromBody]CR_Cabin _cabin)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_Cabin.Any(x => x.CabinId == _cabin.CabinId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        CR_Cabin cabin = db.CR_Cabin.FirstOrDefault(x => x.CabinId == _cabin.CabinId);
                        db.CR_CabinGallery.RemoveRange(db.CR_CabinGallery.Where(x => x.CabinId == cabin.CabinId));
                        if (_cabin.CR_CabinGallery is null) _cabin.CR_CabinGallery = new List<CR_CabinGallery>();
                        _cabin.CR_CabinGallery.ToList().ForEach(x =>
                        {
                            db.CR_CabinGallery.Add(new CR_CabinGallery()
                            {
                                CabinId = cabin.CabinId,
                                Image = x.Image
                            });
                        });
                        cabin.Acreage = _cabin.Acreage;
                        cabin.Amenities = _cabin.Amenities;
                        cabin.Balcony = _cabin.Balcony;
                        cabin.Bed = _cabin.Bed;
                        cabin.CruiseId = _cabin.CruiseId;
                        cabin.CabinName = _cabin.CabinName;
                        cabin.Conditions = _cabin.Conditions;
                        cabin.Description = _cabin.Description;
                        cabin.Extrabed = _cabin.Extrabed;
                        cabin.Highlight = _cabin.Highlight;
                        cabin.Image = _cabin.Image;
                        cabin.Index = _cabin.Index;
                        cabin.MaxPeople = _cabin.MaxPeople;
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

        [Route("delete")]
        [HttpGet]
        [AcceptAction(ActionName = "Delete", ControllerName = "APICabinController")]
        public IHttpActionResult Delete(int _cabinId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_Cabin.Any(x => x.CabinId == _cabinId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        CR_Cabin cabin = db.CR_Cabin.FirstOrDefault(x => x.CabinId == _cabinId);
                        cabin.IsDeleted = true;
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
