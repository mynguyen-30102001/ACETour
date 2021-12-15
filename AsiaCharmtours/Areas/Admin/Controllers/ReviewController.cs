using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("review")]
    public class ReviewController : BaseController
    {
        [Route]
        public ActionResult ListReview()
        {
            if (!CheckAcceptAction("ListReview"))
                return Redirect("/admin/login");

            return View();
        }

    }
}