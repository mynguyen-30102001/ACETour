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
    [RoutePrefix("api/gallery")]
    [BaseAuthenticationAttribute]
    public class APIGalleryController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIGalleryController")]
        public IHttpActionResult Get(int _menuId, int _pageNumber = 1, int _pageSize = 100)
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
                    var galleries = db.W_Gallery
                                    .Where(x => x.LanguageCode == _lang && (_menuId < 0 ? true : x.MenuId == _menuId))
                                    .Join(db.W_Menu, a => a.MenuId, b => b.MenuId, (a, b) => new { a, b.MenuName })
                                    .OrderBy(x => x.a.Index)
                                    .Select(x => new
                                    {
                                        x.a.GalleryId,
                                        x.a.Image,
                                        x.a.Title,
                                        x.MenuName,
                                        x.a.Index
                                    }).ToList();
                    return Ok(new
                    {
                        galleries = galleries.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = galleries.Count
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIGalleryController")]
        public IHttpActionResult Detail(int _galleryId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Gallery.Any(x => x.GalleryId == _galleryId))
                        return NotFound();
                    W_Gallery gallery = db.W_Gallery.FirstOrDefault(x => x.GalleryId == _galleryId);
                    return Ok(new W_Gallery()
                    {
                        Description = gallery.Description,
                        GalleryId = gallery.GalleryId,
                        Image = gallery.Image,
                        Index = gallery.Index,
                        MenuId = gallery.MenuId,
                        Title = gallery.Title,
                        W_GalleryTab = gallery.W_GalleryTab == null ? new List<W_GalleryTab>() : gallery.W_GalleryTab.Select(x => new W_GalleryTab
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIGalleryController")]
        public IHttpActionResult Post(W_Gallery _gallery)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        W_Menu parentMenu = db.W_Menu.FirstOrDefault(x => x.MenuId == _gallery.MenuId);
                        if (parentMenu is null)
                            return NotFound();
                        _gallery.LanguageCode = "vi";
                        db.W_Gallery.Add(_gallery);
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIGalleryController")]
        public IHttpActionResult Put(W_Gallery _gallery)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Gallery.Any(x => x.GalleryId == _gallery.GalleryId))
                            return NotFound();

                        W_Gallery gallery = db.W_Gallery.FirstOrDefault(x => x.GalleryId == _gallery.GalleryId);
                        db.W_GalleryTab.RemoveRange(db.W_GalleryTab.Where(x => x.GalleryId == _gallery.GalleryId));
                        if (_gallery.W_GalleryTab is null) _gallery.W_GalleryTab = new List<W_GalleryTab>();
                        _gallery.W_GalleryTab.ToList().ForEach(x =>
                        {
                            db.W_GalleryTab.Add(new W_GalleryTab()
                            {
                                GalleryId = _gallery.GalleryId,
                                Image = x.Image
                            });
                        });
                        gallery.Description = _gallery.Description;
                        gallery.Image = _gallery.Image;
                        gallery.Index = _gallery.Index;
                        gallery.MenuId = _gallery.MenuId;
                        gallery.Title = _gallery.Title;
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
        public IHttpActionResult Delete(int _galleryId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Gallery.Any(x => x.GalleryId == _galleryId))
                            return NotFound();
                        db.W_GalleryTab.RemoveRange(db.W_GalleryTab.Where(x => x.GalleryId == _galleryId));
                        db.W_Gallery.Remove(db.W_Gallery.FirstOrDefault(x => x.GalleryId == _galleryId));
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
