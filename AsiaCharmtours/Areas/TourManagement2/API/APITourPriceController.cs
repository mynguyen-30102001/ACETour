using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Models;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AsiaCharmtours.Areas.TourManagement.API
{
    [RoutePrefix("api/tour-price")]
    [BaseAuthenticationAttribute]
    public class APITourPriceController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APITourPriceController")]
        public IHttpActionResult Get(string _keySearch = "", int _pageNumber = 1, int _pageSize = 100, string _lang = "vi")
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var tourPrices = db.T2_Tour
                                    .Where(x => !x.IsDeleted)
                                    .Select(x => new
                                    {
                                        x.TourName,
                                        x.TourId,
                                        x.Index,
                                        T2_TourTypeGroup = x.T2_TourRoomTypePrice
                                            .Where(y => y.TourId == x.TourId)
                                            .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { b })
                                            .Join(db.T2_TourTypeGroup, c => c.b.TourTypeGroupId, d => d.TourTypeGroupId, (c, d) => new { d })
                                            .Select(y => y.d.TourTypeGroupName)
                                            .Distinct()
                                            .ToList(),
                                        T2_TourRoomType = x.T2_TourRoomTypePrice
                                            .Where(y => y.TourId == x.TourId)
                                            .Join(db.T2_TourRoomType, a => a.TourRoomTypeId, b => b.TourRoomTypeId, (a, b) => new { b })
                                            .Select(y => y.b.TourRoomTypeName)
                                            .Distinct()
                                            .ToList(),
                                    })
                                    .OrderBy(x => x.Index)
                                    .ToList();
                    tourPrices.RemoveAll(x => !W_Helper.ConvertToUnSign(x.TourName).Contains(_keySearch));
                    return Ok(new
                    {
                        tourPrices = tourPrices.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = tourPrices.Count
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APITourPriceController")]
        public IHttpActionResult Detail(int _tourId)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.T2_Tour.Any(x => x.TourId == _tourId))
                        return NotFound();
                    List<T2_TourRoomTypePriceGroup> tourRoomTypePrices = db.T2_TourRoomTypePrice
                                                    .Where(x => x.TourId == _tourId)
                                                    .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                                                    .Select(x => x.b)
                                                    .ToList();
                    List<T2_TourRoomTypePrice> tourDes = db.T2_TourRoomTypePrice.Where(m => m.TourId == _tourId).ToList();

                    return Ok(new
                    {
                        tourDes = tourDes.Select(a => new {
                            a.Description
                        }),
                        priceContact = db.T2_Tour.FirstOrDefault(x => x.TourId == _tourId).PriceContact,
                        tourRoomTypePrices = tourRoomTypePrices.Select(x => new
                        {
                            x.TourTypeGroupId,
                            x.T2_TourRoomTypePrice.TourRoomTypeId,
                            x.PromotionalPrice,
                            x.PriceInfant,
                            x.PriceChild,
                            x.Price,
                            x.T2_TourRoomTypePrice.Description
                        }).ToList()

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
        [AcceptAction(ActionName = "Put", ControllerName = "APITourPriceController")]
        public IHttpActionResult Put([FromBody]EF_TourPrice _tourPrice)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.T2_Tour.Any(x => x.TourId == _tourPrice.TourId))
                        return NotFound();
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourId == _tourPrice.TourId);
                        tour.PriceContact = _tourPrice.PriceContact;
                        db.SaveChanges();
                        List<int> tourRoomPriceIds = db.T2_TourRoomTypePrice
                                .Where(x => x.TourId == _tourPrice.TourId)
                                .Select(x => x.TourRoomTypePriceId)
                                .ToList();
                        db.T2_TourRoomTypePriceGroup.RemoveRange(db.T2_TourRoomTypePriceGroup.Where(x => tourRoomPriceIds.Any(y => y == x.TourRoomTypePriceId)));
                        db.T2_TourRoomTypePrice.RemoveRange(db.T2_TourRoomTypePrice.Where(x => x.TourId == _tourPrice.TourId));
                        _tourPrice.EF_TourRoomType.ForEach(x =>
                        {
                            if (x.Checked)
                            {
                                #region Chỉnh sửa thông tin phòng giá ( thêm nếu không tồn tại)
                                T2_TourRoomTypePrice tourRoomTypePrice = new T2_TourRoomTypePrice()
                                {
                                    TourRoomTypeId = x.TourRoomTypeId,
                                    TourId = _tourPrice.TourId,
                                    Description = x.Description
                                };
                                db.T2_TourRoomTypePrice.Add(tourRoomTypePrice);
                                db.SaveChanges();
                                #endregion
                                x.EF_TourRoomTypePrice.ForEach(y =>
                                {
                                    if (_tourPrice.EF_TourTypeGroup.FirstOrDefault(z => z.TourTypeGroupId == y.TourTypeGroupId).Checked)
                                    {
                                        T2_TourRoomTypePriceGroup tourRoomTypePriceGroup = new T2_TourRoomTypePriceGroup()
                                        {
                                            Price = y.Price,
                                            PriceChild = y.PriceChild,
                                            PriceInfant = y.PriceInfant,
                                            PromotionalPrice = y.PromotionalPrice,
                                            TourRoomTypePriceId = tourRoomTypePrice.TourRoomTypePriceId,
                                            TourTypeGroupId = y.TourTypeGroupId
                                        };
                                        db.T2_TourRoomTypePriceGroup.Add(tourRoomTypePriceGroup);
                                        db.SaveChanges();
                                    }
                                });
                            }
                        });
                        transaction.Commit();
                        return Ok(_tourPrice);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("get-base-tour-price")]
        [HttpGet]
        [AcceptAction(ActionName = "GetBaseTourPrice", ControllerName = "APITourPriceController")]
        public IHttpActionResult GetBaseTourPrice()
        {
            try
            {
                using (var db = new DB())
                {
                    List<T2_TourRoomType> tourRoomTypesBase = db.T2_TourRoomType.ToList();
                    List<EF_TourRoomType> tourRoomTypes = new List<EF_TourRoomType>();
                    // Lấy danh sách các loại phòng
                    tourRoomTypesBase.ForEach(x =>
                    {
                        tourRoomTypes.Add(new EF_TourRoomType()
                        {
                            Checked = false,
                            Description = "",
                            TourRoomTypeId = x.TourRoomTypeId,
                            TourRoomTypeName = x.TourRoomTypeName,
                            EF_TourRoomTypePrice = new List<EF_TourRoomTypePrice>()
                        });
                    });
                    // lấy danh sách các loại nhóm tour và cài đặt giá tương ứng loại phòng và loại nhóm tour
                    List<T2_TourTypeGroup> tourTypeGroupsBase = db.T2_TourTypeGroup.ToList();
                    List<EF_TourTypeGroup> tourTypeGroups = new List<EF_TourTypeGroup>();
                    tourTypeGroupsBase.ForEach(x =>
                    {
                        tourTypeGroups.Add(new EF_TourTypeGroup()
                        {
                            TourTypeGroupId = x.TourTypeGroupId,
                            TourTypeGroupName = x.TourTypeGroupName,
                            Checked = false
                        });
                        tourRoomTypes.ForEach(y =>
                        {
                            y.EF_TourRoomTypePrice.Add(new EF_TourRoomTypePrice()
                            {
                                TourTypeGroupId = x.TourTypeGroupId,
                                TourRoomTypeId = y.TourRoomTypeId,
                                Price = 0,
                                PriceChild = 0,
                                PriceInfant = 0,
                                PromotionalPrice = 0
                            });
                        });
                    });
                    return Ok(new EF_TourPrice
                    {
                        EF_TourRoomType = tourRoomTypes,
                        EF_TourTypeGroup = tourTypeGroups
                    });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
