using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("slider")]
    public class SliderController : BaseController
    {
        [Route]
        public ActionResult ListSlider()
        {
            if (!CheckAcceptAction("ListSlider"))
                return Redirect("/admin/login");

            return View();
        }
    }
}