using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Customize.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("customize")]
    public class CustomizeController : BaseController
    {
        [Route("list-customize")]
        public ActionResult ListCustomize()
        {
            return View();
        }
    }
}