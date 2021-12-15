using AsiaCharmtours.Auth;
using System.Web.Mvc;

namespace AsiaCharmtours.Areas.Admin.Controllers
{
    [RouteArea("admin")]
    [RoutePrefix("gallery")]
    public class GalleryController : BaseController
    {
        [Route]
        public ActionResult ListGallery()
        {
            if (!CheckAcceptAction("ListGallery"))
                return Redirect("/admin/login");

            return View();
        }
    }
}