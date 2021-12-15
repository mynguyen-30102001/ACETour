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
    [RoutePrefix("api/article")]
    [BaseAuthenticationAttribute]
    public class APIArticleController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIArticleController")]
        public IHttpActionResult Get(string _keySearch = "", int _menuId = -1, int _pageNumber = 1, int _pageSize = 100)
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
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
                    var articles = db.W_Article.Where(x => x.LanguageCode == _lang && (_menuId < 0 ? true : x.MainMenuId == _menuId))
                                                .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new { a, b.MenuName })
                                                .OrderBy(x => x.a.Index)
                                                .Select(x => new
                                                {
                                                    x.a.ArticleId,
                                                    x.a.UserCreate,
                                                    x.a.DateCreate,
                                                    x.a.DateUpdate,
                                                    Status = x.a.Status ? "Mở" : "Khóa",
                                                    x.MenuName,
                                                    x.a.Title,
                                                    x.a.Index
                                                })
                                                .ToList();
                    articles.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Title).Contains(_keySearch));
                    return Ok(new
                    {
                        articles = articles.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = articles.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [Route("get-tour")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIArticleController")]
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
                                    .Select(x => new
                                    {
                                        x.TourName,
                                        x.TourId,
                                        x.Destination,
                                        x.DateCreate,
                                        x.Index,
                                        x.NumberDay,
                                        Status = (bool)x.Status ? "Mở" : "Khóa",
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIArticleController")]
        public IHttpActionResult Post([FromBody]W_Article _article)
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
                        _article.DateCreate = DatetimeHelper.DateTimeUTCNow();
                        _article.DateUpdate = DatetimeHelper.DateTimeUTCNow();
                        _article.UserCreate = "admin";
                        _article.LanguageCode = _lang;
                        if (!_article.SelectRelatedPost) _article.W_ArticleRelatedPost = new List<W_ArticleRelatedPost>();
                        db.W_Article.Add(_article);
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

        [Route("put")]
        [HttpPost]
        [AcceptAction(ActionName = "Put", ControllerName = "APIArticleController")]
        public IHttpActionResult Put([FromBody]W_Article _article)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Article.Any(x => x.ArticleId == _article.ArticleId))
                            return NotFound();
                        W_Article article = db.W_Article.SingleOrDefault(x => x.ArticleId == _article.ArticleId);
                        db.W_ArticalMenu.RemoveRange(db.W_ArticalMenu.Where(x => x.ArticalId == _article.ArticleId));
                        db.W_ArticleRelatedPost.RemoveRange(db.W_ArticleRelatedPost.Where(x => x.ArticleId == _article.ArticleId));
                        db.W_ThemesMenu.RemoveRange(db.W_ThemesMenu.Where(x => x.ArticleId == article.ArticleId));
                        if (!_article.SelectRelatedPost) _article.W_ArticleRelatedPost = new List<W_ArticleRelatedPost>();
                        _article.W_ArticleRelatedPost.ToList().ForEach(x =>
                        {
                            db.W_ArticleRelatedPost.Add(new W_ArticleRelatedPost()
                            {
                                ArticleId = _article.ArticleId,
                                ArticleRelatedId = x.ArticleRelatedId
                            });
                        });
                        _article.W_ArticalMenu.ToList().ForEach(x =>
                        {
                            db.W_ArticalMenu.Add(new W_ArticalMenu()
                            {
                                ArticalId = _article.ArticleId,
                                IndexSubMenu1 = x.IndexSubMenu1,
                                IndexSubMenu2 = x.IndexSubMenu2,
                                IndexSubMenu3 = x.IndexSubMenu3,
                                SubMenu1 = x.SubMenu1,
                                SubMenu2 = x.SubMenu2,
                                SubMenu3 = x.SubMenu3
                            });
                        });
                        _article.W_ThemesMenu.ToList().ForEach(x =>
                        {
                            db.W_ThemesMenu.Add(new W_ThemesMenu()
                            {
                            
                                MenuId = x.MenuId,
                                ArticleId = _article.ArticleId
                            });
                        });
                        article.Alias = _article.Alias;
                        article.Avatar = _article.Avatar;
                        article.Icon = _article.Icon;
                        article.Comment = _article.Comment;
                        article.Content = _article.Content;
                        article.DateUpdate = DatetimeHelper.DateTimeUTCNow();
                        article.Description = _article.Description;
                        article.Index = _article.Index;
                        article.MainMenuId = _article.MainMenuId;
                        article.MetaDescription = _article.MetaDescription;
                        article.MetaTitle = _article.MetaTitle;
                        article.SelectRelatedPost = _article.SelectRelatedPost;
                        article.Status = _article.Status;
                        article.Destination = _article.Destination;
                        article.Travel = _article.Travel;
                        article.Title = _article.Title;
                        
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIArticleController")]
        public IHttpActionResult Detail(int _articleId)
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
                    W_Article article = db.W_Article.FirstOrDefault(x => x.ArticleId == _articleId);
                    W_Menu _parentMenuId = null;
                    W_Menu _parentMenuId2 = null;
                    W_Menu _menuParent1 = null;
                    //List<W_Menu> menuForArea = new List<W_Menu>();
                    //List<W_Menu> menuDestination = new List<W_Menu>();
                    //List<W_Menu> menuForDestination = new List<W_Menu>();
                    if (article.W_ArticalMenu.Count > 0)
                    {
                        _parentMenuId = db.W_Menu.FirstOrDefault(x => x.MenuId == article.MainMenuId);
                        _menuParent1 = db.W_Menu.FirstOrDefault(x => x.MenuId == _parentMenuId.MenuParentId);
                        //menuForArea = QuickData.GetMenuArticleLeve(_menuParent1.MenuId, 2, _lang);
                        //menuDestination = QuickData.GetMenuArticleDestination(_menuParent1.MenuId, 2, _lang);
                       
                        if (article.W_ThemesMenu.Count > 0)
                        {
                            W_Menu menu = article.W_ThemesMenu.FirstOrDefault().W_Menu;
                            _parentMenuId2 = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                            //menuForDestination = QuickData.GetMenuArticleDestination(_parentMenuId2.MenuId, 3, _lang);
                        }
                    }

                    return Ok(new
                    {
                        article = new
                        {
                            article.ArticleId,
                            article.Alias,
                            article.Avatar,
                            article.Icon,
                            article.Comment,
                            article.Content,
                            article.Description,
                            article.Index,
                            article.MainMenuId,
                            article.MetaDescription,
                            article.MetaTitle,
                            article.SelectRelatedPost,
                            article.Status,
                            article.Title,
                            article.Destination,
                            article.Travel,
                            W_ThemesMenu = article.W_ThemesMenu.Select(x => new
                            {
                                x.MenuId,
                                //x.Index
                            }).ToList(),
                            W_ArticalMenu = article.W_ArticalMenu.Select(x => new
                            {
                                x.IndexSubMenu1,
                                x.IndexSubMenu2,
                                x.IndexSubMenu3,
                                x.SubMenu1,
                                x.SubMenu2,
                                x.SubMenu3
                            }).ToList()
                        },
                        //menuForArea = menuForArea.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),
                        //menuDestination = menuDestination.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),
                        //menuForDestination = menuForDestination.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),

                        relatedPosts = article.W_ArticleRelatedPost
                                    .Join(db.T2_Tour, a => a.ArticleRelatedId, b => b.TourId, (a, b) => new { b.TourName, b.TourId })
                                    .ToList(),
                        _parentMenuId = _parentMenuId2 == null ? "" : _parentMenuId2.MenuId.ToString(),
                        _menuParent1 = _menuParent1 == null ? "" : _menuParent1.MenuId.ToString()

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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIArticleController")]
        public IHttpActionResult Delete(int _articleId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Article.Any(x => x.ArticleId == _articleId))
                            return NotFound();
                        W_Article article = db.W_Article.FirstOrDefault(x => x.ArticleId == _articleId);
                        db.W_ArticalMenu.RemoveRange(db.W_ArticalMenu.Where(x => x.ArticalId == _articleId));
                        db.W_ThemesMenu.RemoveRange(db.W_ThemesMenu.Where(x => x.ArticleId == _articleId));
                        db.W_ArticleRelatedPost.RemoveRange(db.W_ArticleRelatedPost.Where(x => x.ArticleId == _articleId || x.ArticleRelatedId == _articleId));
                        db.W_Article.Remove(article);
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
