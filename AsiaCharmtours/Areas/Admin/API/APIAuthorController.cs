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
    [RoutePrefix("api/author")]
    [BaseAuthenticationAttribute]
    public class APIAuthorController : ApiController
    {
        // GET: Admin/APIAuthor
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIAuthorController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100)
        {
            try
            {
                if (_keySearch is null) _keySearch = "";
                _keySearch = W_Helper.ConvertToUnSign(_keySearch);
                using (var db = new DB())
                {
                    string _lang = "";
                    CookieHeaderValue cookie = Request.Headers.GetCookies("lang_client").FirstOrDefault();
                    if (cookie != null)
                    {
                        _lang = cookie["lang_client"].Value;
                    }
                    var author = db.Authors.Where(x => x.LanguageCode == _lang)
                        .OrderBy(x => x.Index)
                        .Select(x => new
                        {
                            x.ID,
                            x.Title,
                            x.Image,
                            Status = (bool)x.Status ? "Mở" : "Khóa",
                            x.Index,
                            x.Description
                        }).ToList();
                    author.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Title).Contains(_keySearch));
                    return Ok(new
                    {
                        authors = author.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = author.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIAuthorController")]
        public IHttpActionResult Post([FromBody] Author _author)
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
                        _author.CreateDate = DatetimeHelper.DateTimeUTCNow();
                        _author.LanguageCode = _lang;
                        db.Authors.Add(_author);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIAuthorController")]
        public IHttpActionResult Detail(int _authorId)
        {
            try
            {
                using (var db = new DB())
                {
                    Author author = db.Authors.FirstOrDefault(x => x.ID == _authorId);
                    return Ok(new
                    {
                        author = new
                        {
                            author.ID,
                            author.Title,
                            author.Image,
                            author.Email,
                            author.Phone,
                            author.Status,
                            author.Index,
                            author.Alias,
                        }
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIAuthorController")]
        public IHttpActionResult Put([FromBody] Author _author)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.Authors.Any(x => x.ID == _author.ID))
                            return NotFound();
                        Author author = db.Authors.SingleOrDefault(x => x.ID == _author.ID);
                        author.Title = _author.Title;
                        author.Status = _author.Status;
                        author.Phone = _author.Phone;
                        author.Index = _author.Index;
                        author.Image = _author.Image;
                        author.ID = _author.ID;
                        author.Email = _author.Email;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIAuthorController")]
        public IHttpActionResult Delete(int _authorId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.Authors.Any(x => x.ID == _authorId))
                            return NotFound();
                        Author author = db.Authors.FirstOrDefault(x => x.ID == _authorId);
                        db.Authors.Remove(author);
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
