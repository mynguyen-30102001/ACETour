using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Controllers
{
    public class InquireController : Controller
    {
        // GET: Inquire
        [HttpGet]
        public ActionResult InquireNow()
        {
            return View();
        }
    }
}