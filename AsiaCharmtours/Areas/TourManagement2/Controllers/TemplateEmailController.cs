using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.TourManagement.Controllers
{
    [RouteArea("TourManagement", AreaPrefix = "admin")]
    [RoutePrefix("template")]
    public class TemplateEmailController : BaseController
    {
        [Route]
        public ActionResult Contract()
        {
            if (!CheckAcceptAction("Contract"))
                return Redirect("/admin/login");

            return View();
        }
    }
}