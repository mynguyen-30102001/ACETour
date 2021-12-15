using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("question")]
    public class QuestionController : BaseController
    {
        [Route]
        public ActionResult ListQuestion()
        {
            if (!CheckAcceptAction("ListQuestion"))
                return Redirect("/admin/login");

            return View();
        }
    }

}