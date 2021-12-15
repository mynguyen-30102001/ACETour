using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LibraryServices.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("login")]
    public class LoginController : Controller
    {
        [Route]
        public ActionResult Login()
        {
            return View();
        }
        [Route("log-out")]
        public ActionResult Logout()
        {
            Session["acceptScreen"] = null;
            if (Request.Cookies["token"] != null)
            {
                var c = new HttpCookie("token");
                c.Expires = DateTime.Now.AddDays(-1d);
                c.Domain = "";
                c.Path = "/";
                Response.Cookies.Add(c);
            }
            int cout = 0;
            HttpCookie langCookie = Request.Cookies["lang_client"];
            while (langCookie != null)
            {
                langCookie.Expires = DateTime.Now.AddDays(-30);
                HttpContext.Response.Cookies.Add(langCookie);
                cout++;
                if (cout == 10)
                    break;
            }
            cout = 0;
            HttpCookie nameCookie = Request.Cookies["name_client"];
            while (nameCookie != null)
            {
                nameCookie.Expires = DateTime.Now.AddDays(-30);
                HttpContext.Response.Cookies.Add(nameCookie);
                cout++;
                if (cout == 10)
                    break;
            }
            return Redirect("/admin/login");
        }
    }
}