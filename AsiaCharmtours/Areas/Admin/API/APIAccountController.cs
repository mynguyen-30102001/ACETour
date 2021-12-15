using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Models;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace LibraryServices.Areas.Admin.API
{
    [RoutePrefix("api/account")]
    [BaseAuthenticationAttribute]
    public class APIAccountController : ApiController
    {
        [Route("get")]
        [HttpGet]
        [AcceptAction(ActionName = "Get", ControllerName = "APIAccountController")]
        public IHttpActionResult Get(string _keySearch = "", int _menuId = -1, int _pageNumber = 1, int _pageSize = 100)
        {
            if (_keySearch is null) _keySearch = "";
            _keySearch = W_Helper.ConvertToUnSign(_keySearch);
            try
            {
                using (var db = new DB())
                {
                    var accounts = db.D_UserMembership.Where(x => x.IsApproval)
                                            .Join(db.D_UserProfile, a => a.UserName, b => b.UserName, (a, b) => new { a, b })
                                                .Select(x => new
                                                {
                                                    x.a.UserName,
                                                    x.a.Email,
                                                    x.a.LastLoginDate,
                                                    x.b.PropertyName,
                                                    Status = x.a.IsLocked ? "Đã khóa" : "Hoạt động"
                                                })
                                                .ToList();
                    accounts.RemoveAll(x => !W_Helper.ConvertToUnSign(x.UserName).Contains(_keySearch) && !W_Helper.ConvertToUnSign(x.PropertyName).Contains(_keySearch));
                    return Ok(new
                    {
                        accounts = accounts.Skip((_pageNumber - 1) * _pageSize).Take(_pageSize),
                        totalRecord = accounts.Count
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
        [AcceptAction(ActionName = "Post", ControllerName = "APIAccountController")]
        public IHttpActionResult Post([FromBody]EF_Account _account)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (db.D_User.Any(x => x.UserName == _account.UserName))
                            return BadRequest("Tên tài khoản đã tồn tại");
                        DateTime dateTime = DatetimeHelper.DateTimeUTCNow();
                        // cập nhật thông tin user
                        db.D_User.Add(new D_User()
                        {
                            UserName = _account.UserName,
                            LoweredUserName = _account.UserName.Trim(),
                            LastActivityDate = dateTime
                        });
                        db.SaveChanges();
                        // cập nhật thông tin profile
                        db.D_UserProfile.Add(new D_UserProfile()
                        {
                            UserName = _account.UserName,
                            PropertyName = _account.PropertyName,
                            LastUpdateDate = dateTime
                        });
                        db.SaveChanges();
                        // cập nhật vai trò user
                        db.D_UserRole.Add(new D_UserRole()
                        {
                            UserName = _account.UserName,
                            RoleId = _account.RoleId
                        });
                        db.SaveChanges();
                        // cập nhật thông tin truy cập
                        db.D_UserMembership.Add(new D_UserMembership()
                        {
                            UserName = _account.UserName,
                            Password = Encode.MD5(_account.Password),
                            PasswordSalt = DataHelper.RandomString(10),
                            Email = _account.Email,
                            IsApproval = true,
                            IsLocked = !_account.Status,
                            CreateDate = dateTime,
                            FailedPasswordAnswerAttemptCount = 0,
                            FailedPasswordAttemptCount = 0
                        });
                        db.SaveChanges();
                        // cập nhật quyền truy cập chức năng
                        if (_account.Paths is null) _account.Paths = new List<int>();
                        _account.Paths.ForEach(x =>
                        {
                            db.D_UserPath.Add(new D_UserPath()
                            {
                                UserName = _account.UserName,
                                PathId = x
                            });
                        });
                        // cập nhật quyền truy cập màn hình
                        if (_account.Screens is null) _account.Screens = new List<int>();
                        _account.Screens.ForEach(x =>
                        {
                            db.D_UserScreen.Add(new D_UserScreen()
                            {
                                UserName = _account.UserName,
                                ScreenId = x
                            });
                        });
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

        [Route("put")]
        [HttpPost]
        [AcceptAction(ActionName = "Put", ControllerName = "APIAccountController")]
        public IHttpActionResult Put([FromBody]EF_Account _account)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.D_User.Any(x => x.UserName == _account.UserName))
                            return NotFound();

                        DateTime dateTime = DatetimeHelper.DateTimeUTCNow();
                        D_UserProfile userProfile = db.D_UserProfile.FirstOrDefault(x => x.UserName == _account.UserName);
                        userProfile.PropertyName = _account.PropertyName;
                        userProfile.LastUpdateDate = dateTime;

                        D_UserRole userRole = db.D_UserRole.FirstOrDefault(x => x.UserName == _account.UserName);
                        userRole.RoleId = _account.RoleId;

                        D_UserMembership userMembership = db.D_UserMembership.FirstOrDefault(x => x.UserName == _account.UserName);
                        userMembership.Email = _account.Email;
                        userMembership.IsLocked = !_account.Status;
                        if (_account.Password != null && _account.Password != "")
                            userMembership.Password = Encode.MD5(_account.Password);

                        db.D_UserPath.RemoveRange(db.D_UserPath.Where(x => x.UserName == _account.UserName));
                        db.D_UserScreen.RemoveRange(db.D_UserScreen.Where(x => x.UserName == _account.UserName));

                        if (_account.Paths is null) _account.Paths = new List<int>();
                        _account.Paths.ForEach(x =>
                        {
                            db.D_UserPath.Add(new D_UserPath()
                            {
                                UserName = _account.UserName,
                                PathId = x
                            });
                        });
                        // cập nhật quyền truy cập màn hình
                        if (_account.Screens is null) _account.Screens = new List<int>();
                        _account.Screens.ForEach(x =>
                        {
                            db.D_UserScreen.Add(new D_UserScreen()
                            {
                                UserName = _account.UserName,
                                ScreenId = x
                            });
                        });
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
        [AcceptAction(ActionName = "Detail", ControllerName = "APIAccountController")]
        public IHttpActionResult Detail(string _userName)
        {
            try
            {
                using (var db = new DB())
                {
                    if (!db.D_User.Any(x => x.UserName == _userName))
                        return NotFound();
                    EF_Account account = new EF_Account();
                    account.UserName = _userName;
                    account.PropertyName = db.D_UserProfile.FirstOrDefault(x => x.UserName == _userName).PropertyName;
                    D_UserMembership userMembership = db.D_UserMembership.FirstOrDefault(x => x.UserName == _userName);
                    account.Email = userMembership.Email;
                    account.Status = !userMembership.IsLocked;
                    account.RoleId = db.D_UserRole.FirstOrDefault(x => x.UserName == _userName).RoleId;
                    List<D_UserScreen> userScreens = db.D_UserScreen.Where(x => x.UserName == _userName).ToList();
                    List<D_UserPath> userPaths = db.D_UserPath.Where(x => x.UserName == _userName).ToList();
                    return Ok(new
                    {
                        account,
                        screens = userScreens.Select(x => new
                        {
                            x.ScreenId
                        }),
                        paths = userPaths.Select(x => new
                        {
                            x.PathId
                        })
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
        [AcceptAction(ActionName = "Delete", ControllerName = "APIAccountController")]
        public IHttpActionResult Delete(string _userName)
        {
            try
            {
                using (var db = new DB())
                {
                    using (var transaction = db.Database.BeginTransaction())
                    {
                        if (!db.D_User.Any(x => x.UserName == _userName))
                            return NotFound();
                        D_UserMembership userMembership = db.D_UserMembership.FirstOrDefault(x => x.UserName == _userName);
                        userMembership.IsApproval = false;
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

        [Route("get-role")]
        [HttpGet]
        public IHttpActionResult GetRole()
        {
            try
            {
                using (var db = new DB())
                {
                    List<D_Screen> screens = db.D_Screen.OrderBy(x => x.Index).ToList();
                    List<D_Path> paths = db.D_Path.OrderBy(x => x.Index).ToList();
                    List<D_Role> roles = db.D_Role.ToList();
                    return Ok(new
                    {
                        screens = screens.Select(x => new
                        {
                            x.ScreenId,
                            x.Description
                        }),
                        paths = paths.Select(x => new
                        {
                            x.PathId,
                            x.Description
                        }),
                        roles = roles.Select(x => new
                        {
                            x.RoleId,
                            x.RoleName
                        })
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
