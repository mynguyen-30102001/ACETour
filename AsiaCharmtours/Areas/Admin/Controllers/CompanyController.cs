using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("company")]
    public class CompanyController : BaseController
    {
        [Route]
        public ActionResult Information()
        {
            if (!CheckAcceptAction("Information"))
                return Redirect("/admin/login");

            return View();
        }
    }
}