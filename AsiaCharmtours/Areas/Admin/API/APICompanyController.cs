using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using System;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace LibraryServices.Areas.Admin.API
{
    [RoutePrefix("api/company")]
    [BaseAuthenticationAttribute]
    public class APICompanyController : ApiController
    {
        [Route]
        public IHttpActionResult Get()
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
                    W_Company company = db.W_Company.FirstOrDefault(x => x.LanguageCode == _lang) ?? new W_Company() { LanguageCode = _lang };
                    return Ok(new
                    {
                        company.Address,
                        company.CompanyCode,
                        company.CompanyId,
                        company.CompanyName,
                        company.CopyRight,
                        company.Email,
                        company.Facebook,
                        company.Favicon,
                        company.Fax,
                        company.IframeMap,
                        company.Image,
                        company.Instagram,
                        company.LanguageCode,
                        company.LocationMap,
                        company.Logo,
                        company.MetaDescription,
                        company.MetaTitle,
                        company.Phone,
                        company.Tripadvisor,
                        company.Twitter,
                        company.Website,
                        company.Youtube
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
        [AcceptAction(ActionName = "Put", ControllerName = "APICompanyController")]
        public IHttpActionResult Put(W_Company _company)
        {
            try
            {
                using (var db = new DB())
                {
                    using(var transaction = db.Database.BeginTransaction())
                    {
                        W_Company company = db.W_Company.FirstOrDefault(x => x.CompanyId == _company.CompanyId);
                        if (company is null)
                            db.W_Company.Add(_company);
                        else
                        {
                            company.Address = _company.Address;
                            company.CompanyCode = _company.CompanyCode;
                            company.CompanyName = _company.CompanyName;
                            company.CopyRight = _company.CopyRight;
                            company.Email = _company.Email;
                            company.Facebook = _company.Facebook;
                            company.Favicon = _company.Favicon;
                            company.Fax = _company.Fax;
                            company.IframeMap = _company.IframeMap;
                            company.Image = _company.Image;
                            company.Instagram = _company.Instagram;
                            company.LocationMap = _company.LocationMap;
                            company.Logo = _company.Logo;
                            company.MetaDescription = _company.MetaDescription;
                            company.MetaTitle = _company.MetaTitle;
                            company.Phone = _company.Phone;
                            company.Tripadvisor = _company.Tripadvisor;
                            company.Twitter = _company.Twitter;
                            company.Website = _company.Website;
                            company.Youtube = _company.Youtube;
                        }
                        db.SaveChanges();
                        transaction.Commit();
                        return Ok(_company.CompanyId);
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
