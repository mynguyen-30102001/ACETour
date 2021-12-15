using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AsiaCharmtours.Areas.TourManagement.API
{
    [RoutePrefix("api/tour")]
    [BaseAuthenticationAttribute]
    public class APITourController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APITourController")]
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
                    var tours = db.T2_Tour
                                    .Where(x => !x.IsDeleted && x.LanguageCode == _lang)
                                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new { a, b.MenuName })
                                    .Select(x => new
                                    {
                                        x.a.TourName,
                                        x.a.TourId,
                                        x.MenuName,
                                        x.a.Destination,
                                        x.a.DateCreate,
                                        x.a.Index,
                                        x.a.NumberDay,
                                        Status = (bool)x.a.Status ? "Mở" : "Khóa",
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    tours.RemoveAll(x => !W_Helper.ConvertToUnSign(x.TourName).Contains(_keySearch));
                    return Ok(new
                    {
                        tours = tours.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = tours.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APITourController")]
        public IHttpActionResult Post([FromBody]T2_Tour _tour)
        {
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
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (db.T2_Tour.Any(x => x.TourAlias == _tour.TourAlias))
                        {
                            return BadRequest("Alias tour đã tồn tại");
                        }
                        _tour.DateCreate = DatetimeHelper.DateTimeUTCNow();
                        _tour.IsDeleted = false;
                        _tour.LanguageCode = _lang;
                        db.T2_Tour.Add(_tour);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APITourController")]
        public IHttpActionResult Detail(int _tourId)
        {
            try
            {
                using (var db = new DB())
                {
                    string _lang = "";
                    CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                    if (cookie != null)
                    {
                        _lang = cookie["lang_client"].Value;
                    }
                    if (!db.T2_Tour.Any(x => x.TourId == _tourId))
                    {
                        return NotFound();
                    }
                    T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourId == _tourId);
                    W_Menu _parentMenuId = null;
                    W_Menu _menuParent1 = null;
                    //List<W_Menu> menuForDestination = new List<W_Menu>();
                    //List<W_Menu> menuForArea = new List<W_Menu>();
                    List<W_Menu> menuThemes = new List<W_Menu>();

                    if (tour.T2_TourMenu.Count > 0)
                    {
                        W_Menu menu = tour.T2_TourMenu.FirstOrDefault().W_Menu;
                        _parentMenuId = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                        _menuParent1 = db.W_Menu.FirstOrDefault(x => x.MenuId == _parentMenuId.MenuParentId);
                        //menuForDestination = QuickData.GetMenuTourByLevel(_parentMenuId.MenuId, 3 , _lang);
                        //menuForArea = QuickData.GetMenuTourByLevel(_menuParent1.MenuId, 2 , _lang);
                        //menuThemes = QuickData.ListMenuThemes(0, _lang);
                        foreach (var item in tour.SR_ThemeMenu)
                        {
                            W_Menu menuTheme = db.W_Menu.FirstOrDefault(x => x.MenuId == item.MenuId);
                            menuThemes.Add(menuTheme);
                        }
                    }
                    return Ok(new
                    {
                        tourDetail = new {
                            tour.TourId,
                            //tour.ThemeId,
                            tour.TourName,
                            tour.TourAlias,
                            tour.NumberDay,
                            tour.Destination,
                            tour.DescriptionMin,
                            tour.PromotionTitle,
                            tour.MainMenuId,
                            tour.Index,
                            tour.Image,
                            tour.MetaTitle,
                            tour.MetaDescription,
                            T2_TourGallery = tour.T2_TourGallery.Select(x => new
                            {
                                x.Image
                            }).ToList(),
                            tour.Overview,
                            tour.Highlights,
                            tour.Description,
                            tour.Note,
                            tour.PromotionContent,
                            tour.Meals,
                            tour.Transportation,
                            tour.Accommodation,
                            tour.PriceIncludes,
                            tour.PriceExcludes,
                            tour.Cancellation,
                            tour.Policy,
                            tour.Hot,
                            tour.Status,
                            tour.Like,
                            T2_TourMenu = tour.T2_TourMenu.Select(x => new
                            {
                                x.MenuId,
                                x.Index
                            }).ToList(),
                            SR_ThemeMenu = tour.SR_ThemeMenu.Select(x => new
                            {
                                x.MenuId
                            }).ToList(),
                        },
                        //menuForDestination = menuForDestination.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),
                        //menuForArea = menuForArea.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),
                        //menuThemes = menuThemes.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),
                        _parentMenuId = _parentMenuId == null ? "" : _parentMenuId.MenuId.ToString(),
                        _menuParent1 = _menuParent1 == null ? "" : _menuParent1.MenuId.ToString()
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
        [AcceptAction(ActionName = "Put", ControllerName = "APITourController")]
        public IHttpActionResult Put([FromBody]T2_Tour _tour)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.T2_Tour.Any(x => x.TourId == _tour.TourId))
                        {
                            return NotFound();
                        }
                        if (db.T2_Tour.Any(x => x.TourAlias == _tour.TourAlias && x.TourId != _tour.TourId))
                        {
                            return BadRequest("Alias tour đã tồn tại");
                        }
                        db.T2_TourGallery.RemoveRange(db.T2_TourGallery.Where(x => x.TourId == _tour.TourId));
                        db.T2_TourMenu.RemoveRange(db.T2_TourMenu.Where(x => x.TourId == _tour.TourId));
                        db.SR_ThemeMenu.RemoveRange(db.SR_ThemeMenu.Where(x => x.TourId == _tour.TourId));
                        if (_tour.T2_TourMenu is null) _tour.T2_TourMenu = new List<T2_TourMenu>();
                        if (_tour.SR_ThemeMenu is null) _tour.SR_ThemeMenu = new List<SR_ThemeMenu>();
                        if (_tour.T2_TourGallery is null) _tour.T2_TourGallery = new List<T2_TourGallery>();
                        _tour.T2_TourMenu.ToList().ForEach(x =>
                        {
                            db.T2_TourMenu.Add(new T2_TourMenu()
                            {
                                Index = x.Index,
                                MenuId = x.MenuId,
                                TourId = _tour.TourId
                            });
                        });
                        _tour.SR_ThemeMenu.ToList().ForEach(x =>
                        {
                            db.SR_ThemeMenu.Add(new SR_ThemeMenu()
                            {
                                MenuId = x.MenuId,
                                TourId = _tour.TourId
                            });
                        });
                        _tour.T2_TourGallery.ToList().ForEach(x =>
                        {
                            db.T2_TourGallery.Add(new T2_TourGallery()
                            {
                                TourId = _tour.TourId,
                                Image = x.Image
                            });
                        });
                        T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourId == _tour.TourId);
                        //tour.ThemeId = _tour.ThemeId;
                        tour.Image = _tour.Image;
                        tour.TourName = _tour.TourName;
                        tour.TourAlias = _tour.TourAlias;
                        tour.NumberDay = _tour.NumberDay;
                        tour.DescriptionMin = _tour.DescriptionMin;
                        tour.Destination = _tour.Destination;
                        tour.PromotionTitle = _tour.PromotionTitle;
                        tour.MainMenuId = _tour.MainMenuId;
                        tour.Index = _tour.Index;
                        tour.MetaTitle = _tour.MetaTitle;
                        tour.MetaDescription = _tour.MetaDescription;
                        tour.Overview = _tour.Overview;
                        tour.Highlights = _tour.Highlights;
                        tour.Description = _tour.Description;
                        tour.Note = _tour.Note;
                        tour.PromotionContent = _tour.PromotionContent;
                        tour.Meals = _tour.Meals;
                        tour.Transportation = _tour.Transportation;
                        tour.Accommodation = _tour.Accommodation;
                        tour.PriceIncludes = _tour.PriceIncludes;
                        tour.PriceExcludes = _tour.PriceExcludes;
                        tour.Policy = _tour.Policy;
                        tour.Hot = _tour.Hot;
                        tour.Status = _tour.Status;
                        tour.Like = _tour.Like;
                        tour.Cancellation = _tour.Cancellation;
                        db.SaveChanges();
                        transaction.Commit();
                        return Ok();
                    }
                }
            }
            catch (Exception ex)
            {
                Log.Error("ERROR - Update tour ", ex);
                return BadRequest(ex.Message);
            }
        }

        [Route("delete")]
        [HttpPost]
        [AcceptAction(ActionName = "Delete", ControllerName = "APITourController")]
        public IHttpActionResult Delete(int _tourId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.T2_Tour.Any(x => x.TourId == _tourId))
                        {
                            return NotFound();
                        }
                        T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourId == _tourId);
                        tour.TourAlias = " ";
                        tour.IsDeleted = true;
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
                    var tours = db.T2_Tour.ToList();
                    return Ok(tours);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-menu-theme")]
        [HttpGet]
        public IHttpActionResult GetMenuTheme()
        {
            try
            {
                using (var db = new DB())
                {
                    string _lang = "";
                    CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                    if (cookie != null)
                    {
                        _lang = cookie["lang_client"].Value;
                    }

                    var menuThemes = db.W_Menu.Where(x=>x.Status && x.Location == 1 && x.Level == 0 
                    && x.MenuTypeId == (int)MenuType.TourHighlight && x.LanguageCode == _lang)
                        .Select(x => new
                        {
                            x.MenuId,
                            x.MenuName
                        })
                        .ToList();
                    return Ok(menuThemes);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-theme")]
        [HttpGet]
        public IHttpActionResult GetTheme()
        {
            try
            {
                using (var db = new DB())
                {

                    var themes = db.SR_Theme
                        .Select(x => new
                        {
                            x.ThemeId,
                        })
                        .ToList();
                    return Ok(themes);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
