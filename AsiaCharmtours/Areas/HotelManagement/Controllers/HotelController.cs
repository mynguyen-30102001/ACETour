using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.HotelManagement.Controllers
{
    [RouteArea("HotelManagement", AreaPrefix = "admin")]
    [RoutePrefix("hotel")]
    public class HotelController : Controller
    {
        [Route("list-hotel")]
        public ActionResult ListHotel()
        {
            return View();
        }
    }
}