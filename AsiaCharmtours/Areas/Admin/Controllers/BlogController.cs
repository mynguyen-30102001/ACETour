using AsiaCharmtours.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("blog")]
    public class BlogController : BaseController
    {
        [Route]
        public ActionResult ListBlog()
        {
            if (!CheckAcceptAction("ListBlog"))
                return Redirect("/admin/login");

            return View();
        }
    }
}