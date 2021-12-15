using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.CruiseManagement.API
{
    [RoutePrefix("api/cruisetour")]
    [BaseAuthenticationAttribute]
    public class APICruiseTourController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APICruiseTourController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var cruiseTours = db.CR_CruiseTourType
                                    .Where(x => !x.IsDeleted)
                                    .Select(x => new
                                    {
                                        x.CruiseTourTypeId,
                                        x.CruiseTourTypeName,
                                        x.Index
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    cruiseTours.RemoveAll(x => !W_Helper.ConvertToUnSign(x.CruiseTourTypeName).Contains(_keySearch));
                    return Ok(new
                    {
                        cruiseTours = cruiseTours.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = cruiseTours.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APICruiseTourController")]
        public IHttpActionResult Post([FromBody]CR_CruiseTourType _cruiseTourType)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        _cruiseTourType.IsDeleted = false;
                        db.CR_CruiseTourType.Add(_cruiseTourType);
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

        [Route("detail")]
        [HttpGet]
        [AcceptAction(ActionName = "Detail", ControllerName = "APICruiseTourController")]
        public IHttpActionResult Detail(int _cruiseTourTypeId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.CR_CruiseTourType.Any(x => x.CruiseTourTypeId == _cruiseTourTypeId && !x.IsDeleted))
                    {
                        return NotFound();
                    }
                    CR_CruiseTourType cruiseTourType = db.CR_CruiseTourType.FirstOrDefault(x => x.CruiseTourTypeId == _cruiseTourTypeId);
                    return Ok(new
                    {
                        cruiseTourType.CruiseTourTypeId,
                        cruiseTourType.CruiseTourTypeName,
                        cruiseTourType.Index
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
        [AcceptAction(ActionName = "Put", ControllerName = "APICruiseTourController")]
        public IHttpActionResult Put([FromBody]CR_CruiseTourType _cruiseTourType)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_CruiseTourType.Any(x => x.CruiseTourTypeId == _cruiseTourType.CruiseTourTypeId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        CR_CruiseTourType cruiseTourType = db.CR_CruiseTourType.FirstOrDefault(x => x.CruiseTourTypeId == _cruiseTourType.CruiseTourTypeId);
                        cruiseTourType.CruiseTourTypeName = _cruiseTourType.CruiseTourTypeName;
                        cruiseTourType.Index = _cruiseTourType.Index;
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

        [Route("delete")]
        [HttpGet]
        [AcceptAction(ActionName = "Delete", ControllerName = "APICruiseTourController")]
        public IHttpActionResult Delete(int _cruiseTourTypeId)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.CR_CruiseTourType.Any(x => x.CruiseTourTypeId == _cruiseTourTypeId && !x.IsDeleted))
                        {
                            return NotFound();
                        }
                        CR_CruiseTourType cruiseTourType = db.CR_CruiseTourType.FirstOrDefault(x => x.CruiseTourTypeId == _cruiseTourTypeId);
                        cruiseTourType.IsDeleted = true;
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

        [Route("get-all")]
        [HttpGet]
        public IHttpActionResult GetAll(string _lang = "vi")
        {
            try
            {
                using (var db = new DB())
                {
                    var cruiseTourTypes = db.CR_CruiseTourType
                            .Where(x => !x.IsDeleted)
                            .Select(x => new
                            {
                                x.CruiseTourTypeId,
                                x.CruiseTourTypeName,
                                x.Index
                            })
                            .OrderBy(x => x.Index)
                            .ToList();
                    return Ok(cruiseTourTypes);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
