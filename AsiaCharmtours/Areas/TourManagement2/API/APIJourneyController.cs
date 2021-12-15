using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.TourManagement.API
{
    [RoutePrefix("api/journey")]
    [BaseAuthenticationAttribute]
    public class APIJourneyController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIJourneyController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var journeys = db.T2_Tour
                                    .Where(x => !x.IsDeleted)
                                    .Select(x => new
                                    {
                                        x.TourName,
                                        x.TourId,
                                        x.Destination,
                                        x.DateCreate,
                                        x.Index,
                                        x.NumberDay,
                                        StatusJourney = x.T2_TourJourney.Count == 0 || x.T2_TourShortJourney.Count == 0 ? "" : "Đã cập nhật"
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    journeys.RemoveAll(x => !W_Helper.ConvertToUnSign(x.TourName).Contains(_keySearch));
                    return Ok(new
                    {
                        journeys = journeys.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = journeys.Count
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIJourneyController")]
        public IHttpActionResult Detail(int _tourId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.T2_Tour.Any(x => x.TourId == _tourId))
                        return BadRequest("Tour không tồn tại");
                    var shortJourneys = db.T2_TourShortJourney
                        .Where(x => x.TourId == _tourId)
                        .Select(x => new
                        {
                            x.MoveHour,
                            x.Description,
                            x.Index
                        })
                    .OrderBy(x => x.Index)
                    .ToList();
                    var journeys = db.T2_TourJourney
                        .Where(x => x.TourId == _tourId).Select(x => new
                        {
                            x.Title,
                            x.Index,
                            x.Content
                        })
                    .OrderBy(x => x.Index)
                    .ToList();
                    return Ok(new
                    {
                        TourId = _tourId,
                        T2_TourShortJourney = shortJourneys,
                        T2_TourJourney = journeys
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
        [AcceptAction(ActionName = "Put", ControllerName = "APIJourneyController")]
        public IHttpActionResult Put([FromBody]T2_Tour _tour)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.T2_Tour.Any(x => x.TourId == _tour.TourId))
                            return NotFound();
                        db.T2_TourJourney.RemoveRange(db.T2_TourJourney.Where(x => x.TourId == _tour.TourId));
                        db.T2_TourShortJourney.RemoveRange(db.T2_TourShortJourney.Where(x => x.TourId == _tour.TourId));

                        if (_tour.T2_TourJourney is null) _tour.T2_TourJourney = new List<T2_TourJourney>();
                        _tour.T2_TourJourney.ToList().ForEach(x =>
                        {
                            db.T2_TourJourney.Add(new T2_TourJourney()
                            {
                                Content = x.Content,
                                Index = x.Index,
                                Title = x.Title,
                                TourId = _tour.TourId
                            });
                        });
                        if (_tour.T2_TourShortJourney is null) _tour.T2_TourShortJourney = new List<T2_TourShortJourney>();
                        _tour.T2_TourShortJourney.ToList().ForEach(x =>
                        {
                            db.T2_TourShortJourney.Add(new T2_TourShortJourney()
                            {
                                Description = x.Description,
                                Index = x.Index,
                                MoveHour = x.MoveHour,
                                TourId = _tour.TourId
                            });
                        });
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
