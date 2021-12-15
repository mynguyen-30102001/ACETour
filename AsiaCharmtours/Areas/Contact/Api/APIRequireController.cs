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

namespace AsiaCharmtours.Areas.Contact.Api
{
    [RoutePrefix("api/require")]
    [BaseAuthentication]
    public class APIRequireController : ApiController
    {
        // GET: Contact/APIRequire
        private DB db = new DB();

        // GET: api/W_Contact
        [Route("get")]
        [HttpGet]
        //[AcceptAction(ActionName = "Get", ControllerName = "APIRequireController")]
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
                    var require = db.Requires
                                                .OrderBy(x => x.RequireId)
                                                .Select(x => new
                                                {
                                                    x.RequireId,
                                                    x.FullName,
                                                    x.Address,
                                                    x.Date,
                                                    x.Phone,
                                                    x.Email,
                                                    x.Gender
                                                })
                                                .ToList();
                    require.RemoveAll(x => !W_Helper.ConvertToUnSign(x.FullName).Contains(_keySearch) && !W_Helper.ConvertToUnSign(x.Email).Contains(_keySearch));
                    return Ok(new
                    {
                        contact = require.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = require.Count
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
        [ResponseType(typeof(Require))]
        public IHttpActionResult GetW_Contact(int id)
        {
            Require w_Contact = db.Requires.Find(id);
            if (w_Contact == null)
            {
                return NotFound();
            }

            return Ok(w_Contact);
        }

        // PUT: api/W_Contact/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutW_Contact(int id, Require w_Contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != w_Contact.RequireId)
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
        [ResponseType(typeof(Require))]
        public IHttpActionResult Delete(int id)
        {
            Require w_Contact = db.Requires.Find(id);
            if (w_Contact == null)
            {
                return NotFound();
            }

            db.Requires.Remove(w_Contact);
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