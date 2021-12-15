using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace LibraryServices.Areas.Admin.API
{
    [RoutePrefix("api/slider")]
    [BaseAuthenticationAttribute]
    public class APISliderController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APISliderController")]
        public IHttpActionResult Get(int _pageNumber = 1, int _pageSize = 100)
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
                    var sliders = db.W_Slider.Where(x => x.LanguageCode == _lang)
                            .OrderBy(x => x.Index)
                            .Select(x => new
                            {
                                x.SliderId,
                                x.Title,
                                x.Image,
                                x.Link,
                                ViewAll = x.ViewAll ? "Tất cả" : "Tùy chọn",
                                x.Index
                            }).ToList();
                    return Ok(new
                    {
                        sliders = sliders.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = sliders.Count
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APISliderController")]
        public IHttpActionResult Detail(int _sliderId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Slider.Any(x => x.SliderId == _sliderId))
                        return NotFound();
                    W_Slider slider = db.W_Slider.FirstOrDefault(x => x.SliderId == _sliderId);
                    return Ok(new W_Slider()
                    {
                        SliderId = slider.SliderId,
                        Description = slider.Description,
                        Image = slider.Image,
                        Index = slider.Index,
                        Link = slider.Link,
                        Title = slider.Title,
                        ViewAll = slider.ViewAll,
                        W_SliderMenu = slider.W_SliderMenu == null ? new List<W_SliderMenu>() : slider.W_SliderMenu.Select(x => new W_SliderMenu
                        {
                            Index = x.Index,
                            MenuId = x.MenuId
                        }).ToList(),
                        W_SliderTab = slider.W_SliderTab == null ? new List<W_SliderTab>() : slider.W_SliderTab.Select(x => new W_SliderTab()
                        {
                            Image = x.Image
                        }).ToList()
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
        [AcceptAction(ActionName = "Post", ControllerName = "APISliderController")]
        public IHttpActionResult Post(W_Slider _slider)
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
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        _slider.LanguageCode = _lang;
                        if (_slider.ViewAll)
                            _slider.W_SliderMenu.Clear();
                        db.W_Slider.Add(_slider);
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

        [Route("put")]
        [HttpPost]
        [AcceptAction(ActionName = "Put", ControllerName = "APISliderController")]
        public IHttpActionResult Put(W_Slider _slider)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Slider.Any(x => x.SliderId == _slider.SliderId))
                            return NotFound();
                        W_Slider slider = db.W_Slider.FirstOrDefault(x => x.SliderId == _slider.SliderId);
                        db.W_SliderMenu.RemoveRange(db.W_SliderMenu.Where(x => x.SliderId == _slider.SliderId));
                        db.W_SliderTab.RemoveRange(db.W_SliderTab.Where(x => x.SliderId == _slider.SliderId));
                        if (_slider.W_SliderMenu is null || _slider.ViewAll) _slider.W_SliderMenu = new List<W_SliderMenu>();
                        if (_slider.W_SliderTab is null) _slider.W_SliderTab = new List<W_SliderTab>();
                        _slider.W_SliderMenu.ToList().ForEach(x =>
                        {
                            db.W_SliderMenu.Add(new W_SliderMenu()
                            {
                                SliderId = _slider.SliderId,
                                Index = x.Index,
                                MenuId = x.MenuId
                            });
                        });
                        _slider.W_SliderTab.ToList().ForEach(x =>
                        {
                            db.W_SliderTab.Add(new W_SliderTab()
                            {
                                SliderId = _slider.SliderId,
                                Image = x.Image
                            });
                        });

                        slider.Description = _slider.Description;
                        slider.Image = _slider.Image;
                        slider.Index = _slider.Index;
                        slider.Link = _slider.Link;
                        slider.Title = _slider.Title;
                        slider.ViewAll = _slider.ViewAll;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIGalleryController")]
        public IHttpActionResult Delete(int _sliderId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Slider.Any(x => x.SliderId == _sliderId))
                            return NotFound();
                        db.W_SliderMenu.RemoveRange(db.W_SliderMenu.Where(x => x.SliderId == _sliderId));
                        db.W_SliderTab.RemoveRange(db.W_SliderTab.Where(x => x.SliderId == _sliderId));
                        db.W_Slider.Remove(db.W_Slider.FirstOrDefault(x => x.SliderId == _sliderId));
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
