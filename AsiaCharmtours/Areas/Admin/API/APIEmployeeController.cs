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
    [RoutePrefix("api/employee")]
    [BaseAuthenticationAttribute]

    public class APIEmployeeController : ApiController
    {
        // GET: Admin/APIEmployee
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIEmployeeController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100)
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
                    var employee = db.W_Employee.Where(x => x.LanguageCode == _lang)
                            .OrderBy(x => x.Index)
                            .Select(x => new
                            {
                                x.EmployeeId,
                                x.FullName,
                                x.Position,
                                x.Image,
                                x.Description,
                                x.FaceBook,
                                x.Instagram,
                                x.Skype,
                                x.Twitter,
                                x.Whatsapp,
                                x.Email,
                                x.Phone,
                                Status = (bool)x.Status ? "Mở" : "Khóa",
                                x.Index
                            }).ToList();
                    employee.RemoveAll(x => !W_Helper.ConvertToUnSign(x.FullName).Contains(_keySearch));
                    return Ok(new
                    {
                        employee = employee.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = employee.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIEmployeeController")]
        public IHttpActionResult Post([FromBody]W_Employee _employee)
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
                        _employee.LanguageCode = _lang;
                        db.W_Employee.Add(_employee);
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIEmployeeController")]
        public IHttpActionResult Detail(int _employeeId)
        {
            try
            {
                using (var db = new DB())
                {
                    W_Employee employee = db.W_Employee.FirstOrDefault(x => x.EmployeeId == _employeeId);
                    return Ok(new
                    {
                        employee = new
                        {
                            employee.EmployeeId,
                            employee.FullName,
                            employee.Position,
                            employee.Image,
                            employee.FaceBook,
                            employee.Twitter,
                            employee.Instagram,
                            employee.Skype,
                            employee.Whatsapp,
                            employee.Email,
                            employee.Phone,
                            employee.Description,
                            employee.Index
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIEmployeeController")]
        public IHttpActionResult Put([FromBody]W_Employee _employee)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Employee.Any(x => x.EmployeeId == _employee.EmployeeId))
                            return NotFound();
                        W_Employee employee = db.W_Employee.SingleOrDefault(x => x.EmployeeId == _employee.EmployeeId);
                        employee.Email = _employee.Email;
                        employee.FullName = _employee.FullName;
                        employee.Position = _employee.Position;
                        employee.Image = _employee.Image;
                        employee.Description = _employee.Description;
                        employee.Index = _employee.Index;
                        employee.FaceBook = _employee.FaceBook;
                        employee.Phone = _employee.Phone;
                        employee.Twitter = _employee.Twitter;
                        employee.Instagram = _employee.Instagram;
                        employee.Whatsapp = _employee.Whatsapp;
                        employee.Skype = _employee.Skype;
                        employee.Status = _employee.Status;
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIEmployeeController")]
        public IHttpActionResult Delete(int _employeeId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.W_Employee.Any(x => x.EmployeeId == _employeeId))
                            return NotFound();
                        W_Employee employee = db.W_Employee.FirstOrDefault(x => x.EmployeeId == _employeeId);
                        db.W_Employee.Remove(employee);
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