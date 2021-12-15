using AsiaCharmtours.Auth;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("menu")]
    public class MenuController : BaseController
    {
        [Route("main-menu")]
        public ActionResult MainMenu()
        {
            if (!CheckAcceptAction("MainMenu"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("sub-menu")]
        public ActionResult SubMenu()
        {
            if (!CheckAcceptAction("SubMenu"))
                return Redirect("/admin/login");

            return View();
        }
    }
}