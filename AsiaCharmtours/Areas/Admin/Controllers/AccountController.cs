using AsiaCharmtours.Auth;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("account")]
    public class AccountController : BaseController
    {
        [Route]
        public ActionResult Manage()
        {
            if (!CheckAcceptAction("Manage"))
                return Redirect("/admin/login");

            return View();
        }
    }
}