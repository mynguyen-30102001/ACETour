using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("")]
    public class DashboardController : BaseController
    {
        [Route]
        public ActionResult Overview()
        {
            var db = new DB();
            if (!TryGetRole())
            {
                W_Language language = db.W_Language.FirstOrDefault();
                //string cookieClient = Request.Cookies["name_client"].Value;
                HttpCookie langCookie = new HttpCookie("lang_client");
                langCookie.Value = language.LanguageCode;
                langCookie.Expires = DateTime.Now.AddDays(30);
                HttpContext.Response.Cookies.Add(langCookie);
                return Redirect("/admin/login");
            }
            return View();
        }

        [HttpGet]
        public ActionResult Overview(string id)
        {
            var db = new DB();
            if (id != null)
            {
                W_Language lang = db.W_Language.FirstOrDefault(b => b.LanguageCode == id);
                if (lang != null)
                {
                    HttpCookie langCookie = Request.Cookies["lang_client"];
                    langCookie.Value = lang.LanguageCode;
                    langCookie.Expires = DateTime.Now.AddDays(30);
                    HttpContext.Response.Cookies.Add(langCookie);
                    TempData["Messages"] = "Thay đổi ngôn ngữ thành công";
                }
                else
                {
                    TempData["Messages"] = "Đổi ngôn ngữ không thành công, ngôn ngữ không tồn tại";
                }
            }
            return View("Select");
        }
    }
}