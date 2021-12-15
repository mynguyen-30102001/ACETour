using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.Http.Description;
using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
 

namespace LibraryServices.Areas.Contact.Api
{
    [RoutePrefix("api/contact")]
    [BaseAuthentication]
    public class APIContactController : ApiController
    {
        private DB db = new DB();

        // GET: api/W_Contact
        [Route("get")]
        [HttpGet]
        //[AcceptAction(ActionName = "Get", ControllerName = "APITourController")]
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
                    var Contact = db.W_Contact.Where(x => x.LanguageCode == _lang)
                                                .OrderBy(x => x.ContactId)
                                                .Select(x => new
                                                {
                                                    x.ContactId,
                                                   
                                                    x.FullName,
                                                     x.Date,
                                                    x.Phone,
                                                    x.Email,
                                                    x.Gender
                                                })
                                                .ToList();
                    Contact.RemoveAll(x => !W_Helper.ConvertToUnSign(x.FullName).Contains(_keySearch) && !W_Helper.ConvertToUnSign(x.Email).Contains(_keySearch));
                    return Ok(new
                    {
                        contact = Contact.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = Contact.Count
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        // GET: api/W_Contact/5
        [Route("detail")]
        [ResponseType(typeof(W_Contact))]
        public IHttpActionResult GetW_Contact(int id)
        {
            W_Contact w_Contact = db.W_Contact.Find(id);
            if (w_Contact == null)
            {
                return NotFound();
            }

            return Ok(w_Contact);
        }

        // PUT: api/W_Contact/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutW_Contact(int id, W_Contact w_Contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != w_Contact.ContactId)
            {
                return BadRequest();
            }

            db.Entry(w_Contact).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!W_ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/W_Contact
        [ResponseType(typeof(W_Contact))]
        public IHttpActionResult PostW_Contact(W_Contact w_Contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.W_Contact.Add(w_Contact);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = w_Contact.ContactId }, w_Contact);
        }

        // DELETE: api/W_Contact/5
        [Route("delete")]
        [HttpDelete]
        [ResponseType(typeof(W_Contact))]
        public IHttpActionResult Delete(int id)
        {
            W_Contact w_Contact = db.W_Contact.Find(id);
            if (w_Contact == null)
            {
                return NotFound();
            }

            db.W_Contact.Remove(w_Contact);
            db.SaveChanges();

            return Ok(w_Contact);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool W_ContactExists(int id)
        {
            return db.W_Contact.Count(e => e.ContactId == id) > 0;
        }
    }
}