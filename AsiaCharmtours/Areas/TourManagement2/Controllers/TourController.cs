using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.TourManagement.Controllers
{
    [RouteArea("TourManagement2", AreaPrefix = "admin")]
    [RoutePrefix("tour")]
    public class TourController : BaseController
    {
        [Route("list-tour")]
        public ActionResult ListTour()
        {
            if (!CheckAcceptAction("ListTour"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("flight")]
        public ActionResult Flight()
        {
            if (!CheckAcceptAction("Flight"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("journey")]
        public ActionResult Journey()
        {
            if (!CheckAcceptAction("Journey"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("list-book-tour")]
        public ActionResult ListBookTour()
        {
            if (!CheckAcceptAction("ListBookTour"))
                return Redirect("/admin/login");

            return View();
        }
        [Route("tour-price-list")]
        public ActionResult TourPriceList()
        {
            if (!CheckAcceptAction("TourPriceList"))
                return Redirect("/admin/login");

            return View();
        }
    }
}