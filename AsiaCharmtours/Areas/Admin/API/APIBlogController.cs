using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AsiaCharmtours.Areas.Admin.API
{
    [RoutePrefix("api/blog")]
    [BaseAuthenticationAttribute]
    public class APIBlogController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIBlogController")]
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
                    var blogs = db.Blogs.Where(x => x.LanguageCode == _lang && (_menuId < 0 ? true : x.MainMenuId == _menuId))
                                                .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new { a, b.MenuName })
                                                .OrderBy(x => x.a.Index)
                                                .Select(x => new
                                                {
                                                    x.a.BlogId,
                                                    x.a.UserCreate,
                                                    x.a.DateCreate,
                                                    x.a.DateUpdate,
                                                    Status = x.a.Status ? "Mở" : "Khóa",
                                                    x.MenuName,
                                                    x.a.Title,
                                                    x.a.Index
                                                })
                                                .ToList();
                    blogs.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Title).Contains(_keySearch));
                    return Ok(new
                    {
                        blogs = blogs.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = blogs.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-author")]
        [HttpGet]
        public IHttpActionResult GetAuthor()
        {
            try
            {
                string _lang = "";
                CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                if (cookie != null)
                {
                    _lang = cookie["lang_client"].Value;
                }
                List<Author> listAuthor = QuickData.ListAuthor(_lang);
                using (var db = new DB())
                {
                    var authorResults = listAuthor
                                    .Select(x => new
                                    {
                                        x.ID,
                                        x.Title,
                                    }).ToList();
                    return Ok(authorResults);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Route("post")]
        [HttpPost]
        [AcceptAction(ActionName = "Post", ControllerName = "APIBlogController")]
        public IHttpActionResult Post([FromBody] Blog _blog)
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
                        _blog.DateCreate = DatetimeHelper.DateTimeUTCNow();
                        _blog.DateUpdate = DatetimeHelper.DateTimeUTCNow();
                        _blog.UserCreate = "admin";
                        _blog.LanguageCode = _lang;
                       
                        if (!_blog.SelectRelatedPost) _blog.BlogRelatedPosts = new List<BlogRelatedPost>();
                        db.Blogs.Add(_blog);
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIBlogController")]
        public IHttpActionResult Put([FromBody] Blog _blog)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.Blogs.Any(x => x.BlogId == _blog.BlogId))
                            return NotFound();
                        Blog blog = db.Blogs.SingleOrDefault(x => x.BlogId == _blog.BlogId);
                        db.BlogRelatedPosts.RemoveRange(db.BlogRelatedPosts.Where(x => x.BlogId == _blog.BlogId));
                        db.BlogRelatedPosts.RemoveRange(db.BlogRelatedPosts.Where(x => x.BlogId == blog.BlogId));
                        if (!_blog.SelectRelatedPost) _blog.BlogRelatedPosts = new List<BlogRelatedPost>();
                        _blog.BlogRelatedPosts.ToList().ForEach(x =>
                        {
                            db.BlogRelatedPosts.Add(new BlogRelatedPost()
                            {
                                BlogId = _blog.BlogId,
                                BlogRelateId = x.BlogRelateId
                            });
                        });
                        //_article.W_ArticalMenu.ToList().ForEach(x =>
                        //{
                        //    db.W_ArticalMenu.Add(new W_ArticalMenu()
                        //    {
                        //        ArticalId = _article.ArticleId,
                        //        IndexSubMenu1 = x.IndexSubMenu1,
                        //        IndexSubMenu2 = x.IndexSubMenu2,
                        //        IndexSubMenu3 = x.IndexSubMenu3,
                        //        SubMenu1 = x.SubMenu1,
                        //        SubMenu2 = x.SubMenu2,
                        //        SubMenu3 = x.SubMenu3
                        //    });
                        //});
                        blog.Alias = _blog.Alias;
                        blog.Avatar = _blog.Avatar;
                        blog.Content = _blog.Content;
                        blog.Index = _blog.Index;
                        blog.Like = _blog.Like;
                        blog.Status = _blog.Status;
                        blog.Title = _blog.Title;
                        blog.DateUpdate = _blog.DateUpdate;
                        blog.DateCreate = _blog.DateCreate;
                        blog.Description = _blog.Description;
                        blog.Comment = _blog.Comment;
                        blog.Hot = _blog.Hot;
                        blog.UserCreate = _blog.UserCreate;
                        blog.BlogId = _blog.BlogId;
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIBlogController")]
        public IHttpActionResult Detail(int _blogId)
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
                    Blog blog = db.Blogs.FirstOrDefault(x => x.BlogId == _blogId);

                    return Ok(new
                    {
                        blog = new
                        {
                            blog.BlogId,
                            blog.Alias,
                            blog.Avatar,
                            blog.Comment,
                            blog.Content,
                            blog.Description,
                            blog.Index,
                            blog.MainMenuId,
                            blog.AuthoId,
                            blog.MetaDescription,
                            blog.MetaTitle,
                            blog.SelectRelatedPost,
                            blog.Status,
                            blog.Title,
                            blog.DateCreate,
                            blog.UserCreate,
                            blog.DateUpdate,
                            //W_ArticalMenu = article.W_ArticalMenu.Select(x => new
                            //{
                            //    x.IndexSubMenu1,
                            //    x.IndexSubMenu2,
                            //    x.IndexSubMenu3,
                            //    x.SubMenu1,
                            //    x.SubMenu2,
                            //    x.SubMenu3
                            //}).ToList()
                        },
                        //menuForArea = menuForArea.Select(x => new
                        //{
                        //    x.MenuId,
                        //    x.MenuName
                        //}),

                        relatedPosts = blog.BlogRelatedPosts
                                    .Join(db.Blogs, a => a.BlogRelateId, b => b.BlogId, (a, b) => new { b.Title, b.BlogId })
                                    .ToList(),

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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIBlogController")]
        public IHttpActionResult Delete(int _blogId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.Blogs.Any(x => x.BlogId == _blogId))
                            return NotFound();
                        Blog blog = db.Blogs.FirstOrDefault(x => x.BlogId == _blogId);
                        //db.W_ArticalMenu.RemoveRange(db.W_ArticalMenu.Where(x => x.ArticalId == _articleId));
                        db.BlogRelatedPosts.RemoveRange(db.BlogRelatedPosts.Where(x => x.BlogId == _blogId || x.BlogRelateId == _blogId));
                        db.Blogs.Remove(blog);
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
