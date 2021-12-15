using AsiaCharmtours.Auth;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("plugin")]
    public class PluginController : BaseController
    {
        [Route("js-code")]
        public ActionResult JsCode()
        {
            if (!CheckAcceptAction("JsCode"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("css-code")]
        public ActionResult CssCode()
        {
            if (!CheckAcceptAction("CssCode"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("sidebar-code")]
        public ActionResult SideBarCode()
        {
            if (!CheckAcceptAction("SideBarCode"))
                return Redirect("/admin/login");

            return View();
        }
    }
}