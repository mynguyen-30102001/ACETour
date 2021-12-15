using AsiaCharmtours.Auth;
using AsiaCharmtours.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LibraryServices.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("article")]
    public class ArticleController : BaseController
    {
        [Route]
        public ActionResult ListArticle()
        {
            if (!CheckAcceptAction("ListArticle"))
                return Redirect("/admin/login");

            return View();
        }
    }
}