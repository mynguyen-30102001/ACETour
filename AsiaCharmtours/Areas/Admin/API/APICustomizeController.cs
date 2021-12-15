using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
namespace LibraryServices.Areas.Customize.API
{
    [RoutePrefix("api/customize")]
    public class APICustomizeController : ApiController
    {
        [Route("get")]
        [HttpGet]
        
        public IHttpActionResult GetCustomize(int _pageNumber = 1, int _pageSize = 100)
        {
            try
            {
                using (var db = new DB())
                {
                    var getCustomize = db.T2_Customize.Where(x => x.Id == x.Id)
                            .OrderByDescending(x => x.Id)
                            .Select(x => new
                            {
                                x.Id,
                                x.FullName,
                                x.Email,
                                x.Date,
                                x.Request,
                            }).ToList();
                    return Ok(new
                    {
                        getCustomize = getCustomize.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = getCustomize.Count
                    });
                }

            }

            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        [Route("detail")]
        [HttpGet]
        [AcceptAction(ActionName = "Detail", ControllerName = "APICustomizeController")]
        public IHttpActionResult Detail(int _customizeId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.T2_Customize.Any(x => x.Id == _customizeId))
                        return NotFound();
                    T2_Customize customize = db.T2_Customize.FirstOrDefault(x => x.Id == _customizeId);
                    return Ok(new T2_Customize()
                    {
                       Id = customize.Id,
                       FullName = customize.FullName,
                       Email = customize.Email,
                       Date = customize.Date,
                       Request = customize.Request,
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APICustomizeController")]
        public IHttpActionResult DeleteCustomize ( int _customizeId)
        {
            try
            {
                using (var db = new DB())
                {
                    var res = db.T2_Customize.FirstOrDefault(x => x.Id == _customizeId);
                    if (res != null)
                    {
                        db.T2_Customize.Remove(res);
                        db.SaveChanges();
                        
                        return Ok();
                    }
                    else
                        return NotFound();

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
