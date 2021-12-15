using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace LibraryServices.Areas.Admin.API
{
    [RoutePrefix("api/login")]
    public class APILoginController : ApiController
    {
        public class AccountLogin
        {
            public string _userName { get; set; }
            public string _password { get; set; }
            public bool _saveLogin { get; set; }
        }
        [Route("check-account")]
        [HttpPost]
        public HttpResponseMessage CheckAccount(AccountLogin account)
        {
            try
            {
                using (var db = new DB())
                {
                    if (UserSecurity.CheckLogin(account._userName, account._password))
                    {
                        D_UserMembership userMembership = db.D_UserMembership.First(x => x.UserName == account._userName);
                        userMembership.PasswordSalt = DataHelper.RandomString(10);
                        userMembership.LastLoginDate = DatetimeHelper.DateTimeUTCNow();
                        userMembership.FailedPasswordAnswerAttemptCount = 0;
                        userMembership.FailedPasswordAttemptCount = 0;
                        db.SaveChanges();
                        HttpResponseMessage response = getResponseToken(account._userName, account._password, userMembership.PasswordSalt);
                        response.Content = new StringContent("/admin");
                        return response;
                    }
                    else
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Tài khoản hoặc mật khẩu không đúng");
                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }

        private HttpResponseMessage getResponseToken(string _userName, string _password, string _passwordSalt)
        {
            string token = Encode.Encrypt(_userName) + ":" + Encode.Encrypt(_password, _passwordSalt);
            byte[] bytes = new byte[token.Length];
            for (int i = 0; i < token.Length; i++)
            {
                bytes[i] = (byte)token[i];
            }
            string tokenString = Convert.ToBase64String(bytes);
            HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.OK);
            var cookie = new CookieHeaderValue("token", tokenString);
            cookie.Expires = DateTimeOffset.Now.AddDays(1);
            cookie.Domain = Request.RequestUri.Host;
            cookie.Path = "/";
            response.Headers.AddCookies(new CookieHeaderValue[] { cookie });
            return response;
        }
    }
}
