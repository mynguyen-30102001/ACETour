using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("partner")]
    public class PartnerController : BaseController
    {
       [Route]
        public ActionResult ListPartner()
        {
            if (!CheckAcceptAction("ListPartner"))
                return Redirect("/admin/login");

            return View();
        }
    }
}