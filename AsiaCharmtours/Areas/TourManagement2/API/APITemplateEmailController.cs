using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.TourManagement.API
{
    [RoutePrefix("api/template")]
    [BaseAuthenticationAttribute]
    public class APITemplateEmailController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APITemplateEmail")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var templates = db.W_TemplateEmail.Where(x => x.LanguageCode == _lang)
                                                .Select(x => new
                                                {
                                                    x.W_TypeEmail.TypeEmailName,
                                                    x.TemplateEmailId,
                                                    x.Subject
                                                })
                                                .ToList();
                    templates.RemoveAll(x => !W_Helper.ConvertToUnSign(x.Subject).Contains(_keySearch));
                    return Ok(new
                    {
                        templates = templates.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = templates.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APITemplateEmail")]
        public IHttpActionResult Post([FromBody]W_TemplateEmail _templateEmail)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        _templateEmail.LanguageCode = "vi";
                        db.W_TemplateEmail.Add(_templateEmail);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APITemplateEmail")]
        public IHttpActionResult Detail(int _templateEmailId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.W_TemplateEmail.Any(x => x.TemplateEmailId == _templateEmailId))
                        return NotFound();
                    W_TemplateEmail templateEmail = db.W_TemplateEmail.FirstOrDefault(x => x.TemplateEmailId == _templateEmailId);
                    return Ok(new
                    {
                        templateEmail.TemplateEmailId,
                        templateEmail.Subject,
                        templateEmail.TypeEmailId,
                        templateEmail.BCC,
                        templateEmail.CC,
                        templateEmail.Content
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
        [AcceptAction(ActionName = "Put", ControllerName = "APITemplateEmail")]
        public IHttpActionResult Put([FromBody]W_TemplateEmail _templateEmail)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_TemplateEmail.Any(x => x.TemplateEmailId == _templateEmail.TemplateEmailId))
                            return NotFound();
                        W_TemplateEmail templateEmail = db.W_TemplateEmail.FirstOrDefault(x => x.TemplateEmailId == _templateEmail.TemplateEmailId);
                        templateEmail.TypeEmailId = _templateEmail.TypeEmailId;
                        templateEmail.Subject = _templateEmail.Subject;
                        templateEmail.Content = _templateEmail.Content;
                        templateEmail.CC = _templateEmail.CC;
                        templateEmail.BCC = _templateEmail.BCC;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APITemplateEmail")]
        public IHttpActionResult Delete(int _templateEmailId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_TemplateEmail.Any(x => x.TemplateEmailId == _templateEmailId))
                            return NotFound();
                        W_TemplateEmail templateEmail = db.W_TemplateEmail.FirstOrDefault(x => x.TemplateEmailId == _templateEmailId);
                        db.W_TemplateEmail.Remove(templateEmail);
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

        [Route("get-type-email")]
        [HttpGet]
        public IHttpActionResult GetTypeEmail()
        {
            try
            {
                using (var db = new DB())
                {
                    var typeEmails = db.W_TypeEmail
                                                .Select(x => new
                                                {
                                                    x.TypeEmailId,
                                                    x.TypeEmailName
                                                })
                                                .ToList();
                    return Ok(typeEmails);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
