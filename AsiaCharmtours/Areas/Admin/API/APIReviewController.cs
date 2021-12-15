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
    [RoutePrefix("api/review")]
    [BaseAuthenticationAttribute]
    public class APIReviewController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIReviewController")]
        public IHttpActionResult Get(string _keySearch = "" , int _pageNumber = 1, int _pageSize = 100)
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
                    var review = db.RV_Review.Where(x => x.LanguageCode == _lang)
                            .OrderBy(x => x.Index)
                            .Select(x => new
                            {
                                x.ReviewId,
                                x.Title,
                                x.Image,
                                x.FullName,
                                x.Date,
                                Status = (bool)x.Status ? "Mở" : "Khóa",
                                x.Index
                            }).ToList();
                    review.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Title).Contains(_keySearch));
                    return Ok(new
                    {
                        review = review.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = review.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIReviewController")]
        public IHttpActionResult Post([FromBody]RV_Review _review)
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
                        _review.LanguageCode = _lang;
                        _review.Date = DateTime.Now;
                        db.RV_Review.Add(_review);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIReviewController")]
        public IHttpActionResult Detail(int _reviewId)
        {
            try
            {
                using (var db = new DB())
                {
                    RV_Review review = db.RV_Review.FirstOrDefault(x => x.ReviewId == _reviewId);
                    return Ok(new
                    {
                        review = new
                        {
                            review.ReviewId,
                            review.Title,
                            review.FullName,
                            review.Image,
                            review.Content,
                            review.Address,
                            review.Index
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIReviewController")]
        public IHttpActionResult Put([FromBody]RV_Review _review)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.RV_Review.Any(x => x.ReviewId == _review.ReviewId))
                            return NotFound();
                        RV_Review review = db.RV_Review.SingleOrDefault(x => x.ReviewId == _review.ReviewId);
                        review.Title = _review.Title;
                        review.FullName = _review.FullName;
                        review.Image = _review.Image;
                        review.Content = _review.Content;
                        review.Index = _review.Index;
                        review.Address = _review.Address;
                        review.Status = _review.Status;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIReviewController")]
        public IHttpActionResult Delete(int _reviewId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.RV_Review.Any(x => x.ReviewId == _reviewId))
                            return NotFound();
                        RV_Review review = db.RV_Review.FirstOrDefault(x => x.ReviewId == _reviewId);          
                        db.RV_Review.Remove(review);
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