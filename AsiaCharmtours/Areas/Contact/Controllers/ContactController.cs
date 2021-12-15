 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AsiaCharmtours.Auth;

namespace LibraryServices.Areas.Contact.Controllers
{
    [RouteArea("Contact", AreaPrefix = "admin")]
    [RoutePrefix("contact")]
    public class ContactController : BaseController
    {
        // GET: Contact/Contact
        [Route("list-contact")]
        public ActionResult Index()
        {
            if (!CheckAcceptAction("ListContact"))
                return Redirect("/admin/login");

            return View();
        }

        [Route("list-require")]
        public ActionResult ListRequire()
        {
            if (!CheckAcceptAction("ListContact"))
                return Redirect("/admin/login");

            return View();
        }
    }
}