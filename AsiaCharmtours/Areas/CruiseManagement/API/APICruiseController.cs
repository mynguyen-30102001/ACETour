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
    [RoutePrefix("api/cruise")]
    [BaseAuthenticationAttribute]
    public class APICruiseController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APICruiseController")]
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
                                        x.Index,
                                        x.Destination,
                                        x.DateCreate,
                                        x.NumberCabin,
                                        Highlight = (x.Highlight == null || !x.Highlight.Value ? "" : "x")
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

        [Route("post")]
        [HttpPost]
        [AcceptAction(ActionName = "Post", ControllerName = "APICruiseController")]
        public IHttpActionResult Post([FromBody]CR_Cruise _cruise)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (db.CR_Cruise.Any(x => x.CruiseAlias == _cruise.CruiseAlias))
                        {
                            return BadRequest("Alias cruise đã tồn tại");
                        }
                        _cruise.DateCreate = DatetimeHelper.DateTimeUTCNow();
                        _cruise.IsDeleted = false;
                        db.CR_Cruise.Add(_cruise);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APICruiseController")]
        public IHttpActionResult Detail(int _cruiseId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.CR_Cruise.Any(x => x.CruiseId == _cruiseId && !x.IsDeleted))
                    {
                        return NotFound();
                    }
                    CR_Cruise cruise = db.CR_Cruise.FirstOrDefault(x => x.CruiseId == _cruiseId);
                    return Ok(new
                    {
                        cruise.CruiseId,
                        cruise.CruiseName,
                        cruise.CruiseAlias,
                        cruise.NumberCabin,
                        cruise.Star,
                        cruise.Destination,
                        cruise.PromotionTitle,
                        cruise.MainMenuId,
                        cruise.Index,
                        cruise.Image,
                        cruise.MetaTitle,
                        cruise.MetaDescription,
                        CR_CruiseGallery = cruise.CR_CruiseGallery.Select(x => new
                        {
                            x.Image
                        }).ToList(),
                        cruise.Overview,
                        cruise.ShortDescription,
                        cruise.Description,
                        cruise.Note,
                        cruise.PromotionContent,
                        cruise.Meals,
                        cruise.Transportation,
                        cruise.Accommodation,
                        cruise.PriceIncludes,
                        cruise.PriceExcludes,
                        cruise.Cancellation,
                        cruise.CancellationBadWeather,
                        cruise.Policy,
                        cruise.Facilities,
                        cruise.Highlight,
                        cruise.BestCruise,
                        cruise.BestSeller,
                        cruise.TopCruise,
                        CR_CruiseMenu = cruise.CR_CruiseMenu.Select(x => new
                        {
                            x.MenuId,
                            x.Index
                        }).ToList()
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
        [AcceptAction(ActionName = "Put", ControllerName = "APICruiseController")]
        public IHttpActionResult Put([FromBody]CR_Cruise _cruise)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_Cruise.Any(x => x.CruiseId == _cruise.CruiseId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        if (db.CR_Cruise.Any(x => x.CruiseAlias == _cruise.CruiseAlias && x.CruiseId != _cruise.CruiseId))
                        {
                            return BadRequest("Alias cruise đã tồn tại");
                        }
                        CR_Cruise cruise = db.CR_Cruise.FirstOrDefault(x => x.CruiseId == _cruise.CruiseId);
                        db.CR_CruiseMenu.RemoveRange(db.CR_CruiseMenu.Where(x => x.CruiseId == cruise.CruiseId));
                        db.CR_CruiseGallery.RemoveRange(db.CR_CruiseGallery.Where(x => x.CruiseId == cruise.CruiseId));
                        if (_cruise.CR_CruiseMenu is null) _cruise.CR_CruiseMenu = new List<CR_CruiseMenu>();
                        _cruise.CR_CruiseMenu.ToList().ForEach(x =>
                        {
                            db.CR_CruiseMenu.Add(new CR_CruiseMenu()
                            {
                                CruiseId = cruise.CruiseId,
                                Index = x.Index,
                                MenuId = x.MenuId
                            });
                        });
                        if (_cruise.CR_CruiseGallery is null) _cruise.CR_CruiseGallery = new List<CR_CruiseGallery>();
                        _cruise.CR_CruiseGallery.ToList().ForEach(x =>
                        {
                            db.CR_CruiseGallery.Add(new CR_CruiseGallery()
                            {
                                CruiseId = cruise.CruiseId,
                                Image = x.Image
                            });
                        });
                        cruise.Accommodation = _cruise.Accommodation;
                        cruise.Activate = _cruise.Activate;
                        cruise.Cancellation = _cruise.Cancellation;
                        cruise.CancellationBadWeather = _cruise.CancellationBadWeather;
                        cruise.CruiseAlias = _cruise.CruiseAlias;
                        cruise.CruiseName = _cruise.CruiseName;
                        cruise.Description = _cruise.Description;
                        cruise.Destination = _cruise.Destination;
                        cruise.Facilities = _cruise.Facilities;
                        cruise.Highlight = _cruise.Highlight;
                        cruise.Image = _cruise.Image;
                        cruise.Index = _cruise.Index;
                        cruise.MainMenuId = _cruise.MainMenuId;
                        cruise.Meals = _cruise.Meals;
                        cruise.MetaDescription = _cruise.MetaDescription;
                        cruise.MetaTitle = _cruise.MetaTitle;
                        cruise.Note = _cruise.Note;
                        cruise.NumberCabin = _cruise.NumberCabin;
                        cruise.Overview = _cruise.Overview;
                        cruise.Policy = _cruise.Policy;
                        cruise.PriceExcludes = _cruise.PriceExcludes;
                        cruise.PriceIncludes = _cruise.PriceIncludes;
                        cruise.PromotionContent = _cruise.PromotionContent;
                        cruise.PromotionTitle = _cruise.PromotionTitle;
                        cruise.ShortDescription = _cruise.ShortDescription;
                        cruise.Star = _cruise.Star;
                        cruise.BestCruise = _cruise.BestCruise;
                        cruise.BestSeller = _cruise.BestSeller;
                        cruise.TopCruise = _cruise.TopCruise;
                        cruise.Transportation = _cruise.Transportation;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APICruiseController")]
        public IHttpActionResult Delete(int _cruiseId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_Cruise.Any(x => x.CruiseId == _cruiseId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        CR_Cruise cruise = db.CR_Cruise.FirstOrDefault(x => x.CruiseId == _cruiseId);
                        cruise.CruiseAlias = " ";
                        cruise.IsDeleted = true;
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

        [Route("get-all")]
        [HttpGet]
        public IHttpActionResult GetAll(string _lang = "vi")
        {
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
                            x.Index
                        })
                    .OrderBy(x => x.Index)
                    .ToList();
                    return Ok(cruises);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
