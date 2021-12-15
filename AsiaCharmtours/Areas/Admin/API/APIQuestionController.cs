using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace AsiaCharmtours.Areas.Admin.API
{
    [RoutePrefix("api/question")]
    [BaseAuthenticationAttribute]
    public class APIQuestionController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIQuestionController")]
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
                    var articles = db.QA_Question.Where(x => x.LanguageCode == _lang && (_menuId < 0 ? true : x.MainMenuId == _menuId))
                                                .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new { a, b.MenuName })
                                                .OrderBy(x => x.a.Index)
                                                .Select(x => new
                                                {
                                                    x.a.QuestionId,
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

        [Route("post")]
        [HttpPost]
        [AcceptAction(ActionName = "Post", ControllerName = "APIQuestionController")]
        public IHttpActionResult Post([FromBody]QA_Question _article)
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
                        //if (!_article.SelectRelatedPost) _article.W_ArticleRelatedPost = new List<W_ArticleRelatedPost>();
                        db.QA_Question.Add(_article);
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIQuestionController")]
        public IHttpActionResult Put([FromBody]QA_Question _article)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.QA_Question.Any(x => x.QuestionId == _article.QuestionId))
                            return NotFound();
                        QA_Question article = db.QA_Question.SingleOrDefault(x => x.QuestionId == _article.QuestionId);
                        //db.W_ArticalMenu.RemoveRange(db.W_ArticalMenu.Where(x => x.ArticalId == _article.ArticleId));
                        //db.W_ArticleRelatedPost.RemoveRange(db.W_ArticleRelatedPost.Where(x => x.ArticleId == _article.ArticleId));
                        //if (!_article.SelectRelatedPost) _article.W_ArticleRelatedPost = new List<W_ArticleRelatedPost>();
                        //_article.W_ArticleRelatedPost.ToList().ForEach(x =>
                        //{
                        //    db.W_ArticleRelatedPost.Add(new W_ArticleRelatedPost()
                        //    {
                        //        ArticleId = _article.ArticleId,
                        //        ArticleRelatedId = x.ArticleRelatedId
                        //    });
                        //});
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
                        article.Alias = _article.Alias;
                        article.Avatar = _article.Avatar;
                        article.Icon = _article.Icon;
                        article.FullName = article.FullName;
                        article.Comment = _article.Comment;
                        article.Content = _article.Content;
                        article.DateUpdate = DatetimeHelper.DateTimeUTCNow();
                        article.Description = _article.Description;
                        article.Index = _article.Index;
                        article.MainMenuId = _article.MainMenuId;
                        article.MetaDescription = _article.MetaDescription;
                        article.MetaTitle = _article.MetaTitle;
                        //article.SelectRelatedPost = _article.SelectRelatedPost;
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIQuestionController")]
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
                    QA_Question article = db.QA_Question.FirstOrDefault(x => x.QuestionId == _articleId);
                   
                    return Ok(new
                    {
                        article = new
                        {
                            article.QuestionId,
                            article.Alias,
                            article.Avatar,
                            article.FullName,
                            article.Icon,
                            article.Comment,
                            article.Content,
                            article.Description,
                            article.Index,
                            article.MainMenuId,
                            article.MetaDescription,
                            article.MetaTitle,
                            //article.SelectRelatedPost,
                            article.Status,
                            article.Title,
                            article.Destination,
                            article.Travel,
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

                        //relatedPosts = article.W_ArticleRelatedPost
                        //            .Join(db.W_Article, a => a.ArticleRelatedId, b => b.ArticleId, (a, b) => new { b.Title, b.ArticleId })
                        //            .ToList(),
                        //_menuParent1 = _menuParent1 == null ? "" : _menuParent1.MenuId.ToString()

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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIQuestionController")]
        public IHttpActionResult Delete(int _articleId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.QA_Question.Any(x => x.QuestionId == _articleId))
                            return NotFound();
                        QA_Question article = db.QA_Question.FirstOrDefault(x => x.QuestionId == _articleId);
                        //db.W_ArticalMenu.RemoveRange(db.W_ArticalMenu.Where(x => x.ArticalId == _articleId));
                        //db.W_ArticleRelatedPost.RemoveRange(db.W_ArticleRelatedPost.Where(x => x.ArticleId == _articleId || x.ArticleRelatedId == _articleId));
                        db.QA_Question.Remove(article);
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