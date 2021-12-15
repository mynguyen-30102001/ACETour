using AsiaCharmtours.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AsiaCharmtours.Controllers
{
    public class BasicController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (Request.Cookies["LanguageID"] == null)
            {
                using (var db = new DB())
                {
                    W_Language language = db.W_Language.FirstOrDefault(a => a.IsDefault);
                    if (language == null)
                    {
                        language = db.W_Language.FirstOrDefault();
                    }

                    if (language != null)
                    {
                        HttpCookie langCookie = new HttpCookie("LanguageID");
                        langCookie.Value = language.LanguageCode;
                        langCookie.Expires = DateTime.Now.AddDays(10);
                        filterContext.RequestContext.HttpContext.Response.Cookies.Add(langCookie);
                    }
                    else
                    {
                        filterContext.Result =
                                    new RedirectToRouteResult(
                                        new RouteValueDictionary(new { controller = "Home", action = "404" }));
                    }
                }
            }
        }
    }
}