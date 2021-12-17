using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("author")]
    public class AuthorController : BaseController
    {
        [Route]
        public ActionResult ListAuthor()
        {
            if (!CheckAcceptAction("ListAuthor"))
                return Redirect("/admin/login");

            return View();
        }
    }
}