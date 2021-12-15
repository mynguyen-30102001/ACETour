using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Auth
{
    public class BaseController : Controller
    {
        // GET: Base
        public bool TryGetRole()
        {
            using (var db = new DB())
            {
                W_Language language = db.W_Language.FirstOrDefault();
                if (Request.Cookies["lang_client"] != null)
                {
                    HttpCookie nameCookie = Request.Cookies["name_client"];
                    //string cookieClient = Request.Cookies["name_client"].Value;
                    string languageKey = Request.Cookies["lang_client"].Value;
                    if (db.W_Language.Any(a => a.LanguageCode == languageKey) == false)
                    {
                        HttpCookie langCookie = new HttpCookie("lang_client");
                        langCookie.Value = language.LanguageCode;
                        langCookie.Expires = DateTime.Now.AddDays(30);
                        HttpContext.Response.Cookies.Add(langCookie);
                    }
                }
                else
                {
                    HttpCookie langCookie = new HttpCookie("lang_client");
                    langCookie.Value = language.LanguageCode;
                    langCookie.Expires = DateTime.Now.AddDays(30);
                    HttpContext.Response.Cookies.Add(langCookie);
                }
                return true;
            }
            
            //try
            //{
            //    string authenticationToken = Request.Cookies["token"].Value;
            //    if (authenticationToken is null)
            //    {
            //        return false;
            //    }
            //    string userName = GetCurrentUser(authenticationToken);
            //    var db = new DB();
            //    List<string> acceptScreen = db.D_UserScreen.Where(x => x.UserName == userName)
            //                                    .Join(db.D_Screen, a => a.ScreenId, b => b.ScreenId, (a, b) => new { a, b })
            //                                    .Select(x => x.b.ScreenName)
            //                                    .ToList();
            //    Session["acceptScreen"] = acceptScreen;
            //    return true;
            //}
            //catch (Exception ex)
            //{
            //    return false;
            //}
        }
        public bool CheckAcceptAction(string _action)
        {
            return true;
            //if (Session["acceptScreen"] is null)
            //    return false;
            //List<string> acceptScreen = (List<string>)Session["acceptScreen"];
            //return acceptScreen.Any(x => x == _action);
        }
        private string GetCurrentUser(string authenticationToken)
        {
            authenticationToken = System.Web.HttpUtility.UrlDecode(authenticationToken);
            string decodeAuthenticationToken = Encoding.UTF8.GetString(Convert.FromBase64String(authenticationToken));
            string[] account = decodeAuthenticationToken.Split(':');
            return Encode.Decrypt(account[0]);
        }
    }
}