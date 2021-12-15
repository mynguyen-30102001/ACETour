using System;
using System.Collections.Generic;
using AsiaCharmtours.Database;
using AsiaCharmtours.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AsiaCharmtours.Utils;
using PagedList;
using System.Web;
using System;
using PagedList;

namespace AsiaCharmtours.Controllers
{
    public class ContactController : Controller
    {
        // GET: Contact
        public ActionResult Index()
        {
            return View();
        }

        [Route("book-contact")]
        [HttpPost]
        public ActionResult AddBook(W_Contact book, string menuAlias)
        {
            if ((int)TempData["Spammm"] == 1)
            {
                using (var db = new DB())
                {
                    HttpCookie langCookie = Request.Cookies["LanguageID"];
                    var lan = langCookie.Value;
                    W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == menuAlias);
                    ViewData["menu"] = menu;
                    List<SelectListItem> listmenu = new List<SelectListItem>();
                    listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                    ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                    W_Contact insert = new W_Contact();
                    insert = book;
                    insert.Date = DatetimeHelper.DateTimeUTCNow();
                    insert.LanguageCode = lan;
                    db.W_Contact.Add(insert);
                    db.SaveChanges();

                    var TKmail = db.W_EmailConfig.Select(x => new ConfigEmail
                    {
                        Email = x.Email,
                        Password = x.Password
                    }).FirstOrDefault();

                    W_TemplateEmail getTemplate = db.W_TemplateEmail.FirstOrDefault(m => m.TypeEmailId == 2);

                    getTemplate.Subject = getTemplate.Subject.Replace("{tentour}", "Contact");

                    W_Company get = db.W_Company.FirstOrDefault();
                    string content = getTemplate.Content;

                    content = content.Replace("{Gender}", book.Gender);
                    content = content.Replace("{FullName}", book.FullName);
                    content = content.Replace("{Tel}", book.Phone.ToString());
                    content = content.Replace("{Email}", book.Email);
                    content = content.Replace("{Country}", book.Nationality);

                    content = content.Replace("{Request}", book.Request);
                    content = content.Replace("{HotelName}", get.CompanyName);
                    content = content.Replace("{Add}", get.Address);
                    content = content.Replace("{Hotline}", get.Phone);
                    content = content.Replace("{EmailHotel}", get.Email);
                    content = content.Replace("{Website}", get.Website);

                    W_Helper.SendMailGuest(TKmail, book.Email, getTemplate.Subject, content);
                    W_Helper.SendMailGuest(TKmail, get.Email, getTemplate.Subject, content);

                    return View("Booking/AddBook");
                }
            }
            else
            {
                return View("ContactError");
            }
            
        }

        [Route("require")]
        [HttpPost]
        public ActionResult Require(EF_Require info, Require require)
        {
            var db = new DB();
            W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == info.menuAlias);
            ViewData["menu"] = menu;
            List<SelectListItem> listmenu = new List<SelectListItem>();
            listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
            ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
            Require requires = new Require();
            requires = require;
            requires.Date = DateTime.Now;
            requires.LanguageCode = menu.LanguageCode;
            var destination = "";
            var roomtype = "";
            var typetravel = "";
            if (info.themes != null)
            {
                for (var i = 0; i < info.themes.Length; i++)
                {
                    destination += info.themes[i] + " ,____";
                }
            }
            requires.Destination = "Điểm đến : " + destination;
            if (info.roomtype != null)
            {
                for (var i = 0; i < info.roomtype.Length; i++)
                {
                    roomtype += info.roomtype[i] + " ,";
                }
            }
            requires.RoomType = "Loại phòng :" + roomtype;
            if (info.typetravel != null)
            {
                for (var i = 0; i < info.typetravel.Length; i++)
                {
                    typetravel += info.typetravel[i] + " ,____";
                }
            }
            requires.TypeTravel = "Loại hình du lịch :" + roomtype;

            requires.RoomSelect = "Phòng đôi có giường đôi :" + info.Double
                + ",____      Phòng đôi :" + info.Twin
                + ",____      Phòng cho 3 người :" + info.Room3people
                + ",____      Phòng đơn :" + info.Single;
            requires.People = "Từ 2 đến 12 tuổi :" + info.More12
                + ",____      Từ 2 đến 12 tuổi : " + info.Between2_12
                + ",____      Dưới 2 tuổi :" + info.Lessthan2;
            db.Requires.Add(requires);
            db.SaveChanges();

            var TKmail = db.W_EmailConfig.Select(x => new ConfigEmail
            {
                Email = x.Email,
                Password = x.Password
            }).FirstOrDefault();

            W_TemplateEmail getTemplate = db.W_TemplateEmail.FirstOrDefault(m => m.TypeEmailId == 2);

            getTemplate.Subject = getTemplate.Subject.Replace("{tentour}", "Contact");

            W_Company get = db.W_Company.FirstOrDefault();
            string content = getTemplate.Content;

            content = content.Replace("{Gender}", require.Gender);
            content = content.Replace("{FullName}", require.FullName);
            content = content.Replace("{Tel}", require.Phone.ToString());
            content = content.Replace("{Email}", require.Email);
            content = content.Replace("{Country}", require.Nationality);

            content = content.Replace("{Request}", require.Message);
            content = content.Replace("{HotelName}", get.CompanyName);
            content = content.Replace("{Add}", get.Address);
            content = content.Replace("{Hotline}", get.Phone);
            content = content.Replace("{EmailHotel}", get.Email);
            content = content.Replace("{Website}", get.Website);

            W_Helper.SendMailGuest(TKmail, require.Email, getTemplate.Subject, content);
            W_Helper.SendMailGuest(TKmail, get.Email, getTemplate.Subject, content);

            return View("RequesSuccess");
        }
    }
}