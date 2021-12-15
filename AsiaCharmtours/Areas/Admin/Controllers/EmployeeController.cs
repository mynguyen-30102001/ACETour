using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AsiaCharmtours.Auth;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("employee")]
    public class EmployeeController : BaseController
    {
        [Route]
        public ActionResult ListEmployee()
        {
            if (!CheckAcceptAction("ListEmployee"))
                return Redirect("/admin/login");

            return View();
        }

    }
}