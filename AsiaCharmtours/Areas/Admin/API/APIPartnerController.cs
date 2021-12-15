
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;

namespace AsiaCharmtours.Areas.Admin.API
{
    [RoutePrefix("api/partner")]
    [BaseAuthenticationAttribute]

    public class APIPartnerController : ApiController
    {
        // GET: Admin/APIPartner
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIPartnerController")]
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
                    var partner = db.W_Partner.Where(x => x.LanguageCode == _lang)
                        .OrderBy(x => x.Index)
                        .Select(x => new
                        {
                            x.PartnerId,
                            x.Title,
                            x.Image,
                            x.Link,
                            Status = (bool)x.Status ? "Mở" : "Khóa",
                            x.Index,
                            x.Description
                        }).ToList();
                    partner.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Title).Contains(_keySearch));
                    return Ok(new
                    {
                        partners = partner.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = partner.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIPartnerController")]
        public IHttpActionResult Post([FromBody]W_Partner _partner)
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
                        _partner.LanguageCode = _lang;
                        db.W_Partner.Add(_partner);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIPartnerController")]
        public IHttpActionResult Detail(int _partnerId)
        {
            try
            {
                using (var db = new DB())
                {
                    W_Partner partner = db.W_Partner.FirstOrDefault(x => x.PartnerId == _partnerId);
                    return Ok(new
                    {
                        partenr = new
                        {
                            partner.PartnerId,
                            partner.Title,
                            partner.Link,
                            partner.Image,
                            partner.Description,
                            partner.Index,
                            partner.Status,
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIPartnerController")]
        public IHttpActionResult Put([FromBody]W_Partner _partenr)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Partner.Any(x => x.PartnerId == _partenr.PartnerId))
                            return NotFound();
                        W_Partner partner = db.W_Partner.SingleOrDefault(x => x.PartnerId == _partenr.PartnerId);
                        partner.Title = _partenr.Title;
                        partner.Link = _partenr.Link;
                        partner.Image = _partenr.Image;
                        partner.Description = _partenr.Description;
                        partner.Index = _partenr.Index;
                        partner.Status = _partenr.Status;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIPartnerController")]
        public IHttpActionResult Delete(int _partnerId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Partner.Any(x => x.PartnerId == _partnerId))
                            return NotFound();
                        W_Partner partner = db.W_Partner.FirstOrDefault(x => x.PartnerId == _partnerId);
                        db.W_Partner.Remove(partner);
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