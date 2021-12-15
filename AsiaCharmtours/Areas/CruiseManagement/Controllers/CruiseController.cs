using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.CruiseManagement.Controllers
{
    [RouteArea("CruiseManagement", AreaPrefix = "admin")]
    [RoutePrefix("cruise")]
    public class CruiseController : Controller
    {
        [Route("list-cruise")]
        public ActionResult ListCruise()
        {
            return View();
        }

        [Route("cruise-journey")]
        public ActionResult CruiseJourney()
        {
            return View();
        }

        [Route("cruise-tour")]
        public ActionResult CruiseTour()
        {
            return View();
        }

        [Route("list-cabin")]
        public ActionResult ListCabin()
        {
            return View();
        }

        [Route("cabin-price")]
        public ActionResult CabinPrice()
        {
            return View();
        }

        [Route("cabin-book")]
        public ActionResult CabinBook()
        {
            return View();
        }
    }
}