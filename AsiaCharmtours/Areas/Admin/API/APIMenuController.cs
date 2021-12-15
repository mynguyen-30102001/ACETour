using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace LibraryServices.Areas.Admin.API
{
    [RoutePrefix("api/menu")]
    [BaseAuthenticationAttribute]
    public class APIMenuController : ApiController
    {
        [Route("get-main")]
        [HttpGet]
        [AcceptAction(ActionName = "GetMenuMain", ControllerName = "APIMenuController")]
        public IHttpActionResult GetMenuMain(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100)
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
                    List<W_Menu> listMenus = new List<W_Menu>();
                    // lấy toàn bộ menu theo điều kiện cần lấy. 
                    // Các thao tác tiếp theo sẽ thực hiện trên danh sách menu này (Tránh thao tác với db)
                    if (_keySearch is null) _keySearch = "";
                    _keySearch = W_Helper.ConvertToUnSign(_keySearch);
                    List<W_Menu> menus = db.W_Menu
                            .Where(x => x.LanguageCode == _lang && x.Location == 1).ToList();
                    if (menus is null) menus = new List<W_Menu>();
                    // Xóa bỏ phần tử khác khóa tìm kiếm
                    menus.RemoveAll(x => !W_Helper.ConvertToUnSign(x.MenuName).Contains(_keySearch));
                    if (menus.Count > 0)
                    {
                        int maxLevel = menus.Max(x => x.Level) + 1;
                        List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                        listMenus.AddRange(masterMenus);
                        for (int i = 1; i < maxLevel; i++)
                        {
                            List<W_Menu> menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                            if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                            {
                                menuCurrentLevel.ForEach(x =>
                                {
                                    int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                    if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                        listMenus.Add(x);
                                    else
                                        listMenus.Insert(indexParentMenu + 1, x);
                                });
                            }
                        }
                    }
                    var menuResults = listMenus
                                        .Join(db.W_MenuType, a => a.MenuTypeId, b => b.MenuTypeId, (a, b) => new { a, b.MenuTypeName })
                                        .Select(x => new
                                        {
                                            x.a.MenuId,
                                            MenuName = W_Helper.HeadSpecialString(x.a.Level) + x.a.MenuName,
                                            x.a.Index,
                                            Status = x.a.Status ? "Có" : "Không",
                                            x.MenuTypeName
                                        }).ToList();
                    return Ok(new
                    {
                        menus = menuResults.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = menuResults.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-sub")]
        [HttpGet]
        [AcceptAction(ActionName = "GetMenuSub", ControllerName = "APIMenuController")]
        public IHttpActionResult GetMenuSub(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100)
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
                    List<W_Menu> listMenus = new List<W_Menu>();
                    // lấy toàn bộ menu theo điều kiện cần lấy. 
                    // Các thao tác tiếp theo sẽ thực hiện trên danh sách menu này (Tránh thao tác với db)
                    if (_keySearch is null) _keySearch = "";
                    _keySearch = W_Helper.ConvertToUnSign(_keySearch);
                    List<W_Menu> menus = db.W_Menu
                             .Where(x => x.LanguageCode == _lang && x.Location == 0).ToList();
                    if (menus is null) menus = new List<W_Menu>();
                    // Xóa bỏ phần tử khác khóa tìm kiếm
                    menus.RemoveAll(x => !W_Helper.ConvertToUnSign(x.MenuName).Contains(_keySearch));
                    if (menus.Count > 0)
                    {
                        int maxLevel = menus.Max(x => x.Level) + 1;
                        List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                        listMenus.AddRange(masterMenus);
                        for (int i = 1; i < maxLevel; i++)
                        {
                            List<W_Menu> menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                            if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                            {
                                menuCurrentLevel.ForEach(x =>
                                {
                                    int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                    if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                        listMenus.Add(x);
                                    else
                                        listMenus.Insert(indexParentMenu + 1, x);
                                });
                            }
                        }
                    }
                    var menuResults = listMenus
                                        .Join(db.W_MenuType, a => a.MenuTypeId, b => b.MenuTypeId, (a, b) => new { a, b.MenuTypeName })
                                        .Select(x => new
                                        {
                                            x.a.MenuId,
                                            MenuName = W_Helper.HeadSpecialString(x.a.Level) + x.a.MenuName,
                                            x.a.Index,
                                            Status = x.a.Status ? "Có" : "Không",
                                            x.MenuTypeName
                                        }).ToList();
                    return Ok(new
                    {
                        menus = menuResults.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = menuResults.Count
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIMenuController")]
        public IHttpActionResult Detail(int _menuId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_Menu.Any(x => x.MenuId == _menuId))
                        return NotFound();
                    W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menuId);
                    return Ok(new
                    {
                        menu.Background,
                        menu.Photo,
                        menu.Image2,
                        menu.Description,
                        menu.Overview,
                        menu.Note,
                        menu.Introduct,
                        menu.Content,
                        menu.Index,
                        menu.Link,
                        menu.Location,
                        menu.MenuAlias,
                        menu.MenuId,
                        menu.MenuName,
                        menu.MenuParentId,
                        menu.MenuTypeId,
                        menu.MetaDescription,
                        menu.MetaTitle,
                        menu.Status,
                        menu.ShowMenuTop,
                        menu.ShowMenuBottom,
                        menu.Highlight,
                        menu.MayLike,
                        menu.Title
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("post-main")]
        [HttpPost]
        [AcceptAction(ActionName = "PostMain", ControllerName = "APIMenuController")]
        public IHttpActionResult PostMain(W_Menu _menu)
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
                        if (db.W_Menu.Any(x => x.MenuAlias == _menu.MenuAlias))
                        {
                            return BadRequest("Alias đã tồn tại");
                        }
                        W_Menu parentMenu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menu.MenuParentId);
                        if (parentMenu is null)
                            _menu.Level = 0;
                        else
                            _menu.Level = parentMenu.Level + 1;
                        _menu.Location = 1;
                        _menu.LanguageCode = _lang;
                        db.W_Menu.Add(_menu);
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

        [Route("post-sub")]
        [HttpPost]
        [AcceptAction(ActionName = "PostSub", ControllerName = "APIMenuController")]
        public IHttpActionResult PostSub(W_Menu _menu)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        string _lang = "";
                        CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                        if (cookie != null)
                        {
                            _lang = cookie["lang_client"].Value;
                        }
                        W_Menu parentMenu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menu.MenuParentId);
                        if (parentMenu is null)
                            _menu.Level = 0;
                        else
                            _menu.Level = parentMenu.Level + 1;
                        _menu.Location = 0;
                        _menu.LanguageCode = _lang;
                        db.W_Menu.Add(_menu);
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIMenuController")]
        public IHttpActionResult Put(W_Menu _menu)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Menu.Any(x => x.MenuId == _menu.MenuId))
                            return NotFound();
                        if (db.W_Menu.Any(x => x.MenuAlias == _menu.MenuAlias && x.MenuId != _menu.MenuId))
                        {
                            return BadRequest("Alias đã tồn tại");
                        }
                        W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menu.MenuId);

                        W_Menu parentMenu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menu.MenuParentId);
                        if (parentMenu is null)
                            menu.Level = 0;
                        else
                            menu.Level = parentMenu.Level + 1;

                        menu.Background = _menu.Background;
                        menu.Photo = _menu.Photo;
                        menu.Image2 = _menu.Image2;
                        menu.Description = _menu.Description;
                        menu.Overview = _menu.Overview;
                        menu.Note = _menu.Note;
                        menu.Introduct = _menu.Introduct;
                        menu.Content = _menu.Content;
                        menu.Index = _menu.Index;
                        menu.Link = _menu.Link;
                        menu.Location = _menu.Location;
                        menu.MenuAlias = _menu.MenuAlias;
                        menu.MenuId = _menu.MenuId;
                        menu.MenuName = _menu.MenuName;
                        menu.MenuParentId = _menu.MenuParentId;
                        menu.MenuTypeId = _menu.MenuTypeId;
                        menu.MetaDescription = _menu.MetaDescription;
                        menu.MetaTitle = _menu.MetaTitle;
                        menu.Status = _menu.Status;
                        menu.Highlight = _menu.Highlight;
                        menu.ShowMenuTop = _menu.ShowMenuTop;
                        menu.ShowMenuBottom = _menu.ShowMenuBottom;
                        menu.MayLike = _menu.MayLike;
                        menu.Title = _menu.Title;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIMenuController")]
        public IHttpActionResult Delete(int _menuId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Menu.Any(x => x.MenuId == _menuId))
                            return NotFound();
                        W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuId == _menuId);
                        db.W_Menu.Remove(menu);
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

        [Route("get-menutype")]
        [HttpGet]
        public IHttpActionResult GetMenuType()
        {
            try
            {
                using (var db = new DB())
                {
                    var menuTypes = db.W_MenuType
                            .OrderBy(x => x.Index)
                            .Select(x => new
                            {
                                x.MenuTypeId,
                                x.MenuTypeName
                            }).ToList();
                    return Ok(menuTypes);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-all")]
        [HttpGet]
        public IHttpActionResult GetAllMenu()
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                List<W_Menu> listMenus = QuickData.GetAllMenu(_lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    return Ok(menuResults);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-all-menu-tour")]
        [HttpGet]
        public IHttpActionResult GetAllMenuTour()
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                List<W_Menu> listMenus = QuickData.GetAllMenuTour(_lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    return Ok(menuResults);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
 
        [Route("get-all-menu-article")]
        [HttpGet]
        public IHttpActionResult GetAllMenuArticles()
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                List<W_Menu> listMenus = QuickData.GetAllMenuArticle(_lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    return Ok(menuResults);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-all-menu-question")]
        [HttpGet]
        public IHttpActionResult GetMenuFooter()
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                List<W_Menu> listMenus = QuickData.GetAllMenuQuestion(_lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    return Ok(menuResults);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-menu-tour-by-level")]
        [HttpGet]
        public IHttpActionResult GetMenuTourByLevel(int _parentMenuId, int _level)
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }

                List<W_Menu> listMenus = QuickData.GetMenuTourByLevel(_parentMenuId, _level , _lang);
                //List<W_Menu> list = QuickData.ListMenuThemes(_parentMenuId, _level, _lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = x.MenuName //W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    //var menuThemes = list
                    //    .Select(x => new
                    //    {
                    //        x.MenuId,
                    //        MenuName = x.MenuName 
                    //    }).ToList();
                    return Ok(new
                    {
                        menuResult = menuResults,
                        //menuTheme = menuThemes
                    });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-menu-article-by-level")]
        [HttpGet]
        public IHttpActionResult GetMenuArticleByLevel(int _parentMenuId, int _level)
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }

                List<W_Menu> listMenus = QuickData.GetMenuArticleLeve(_parentMenuId, _level, _lang);
                List<W_Menu> ListMenuDestination = QuickData.GetMenuArticleDestination(_parentMenuId, _level, _lang);
                using (var db = new DB())
                {
                    var menuResults = listMenus
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = x.MenuName //W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    var menuDestinations = ListMenuDestination
                                    .Select(x => new
                                    {
                                        x.MenuId,
                                        MenuName = x.MenuName //W_Helper.HeadSpecialString(x.Level) + x.MenuName
                                    }).ToList();
                    return Ok(new
                    {
                        menuResult = menuResults,
                        menuDestination = menuDestinations
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
