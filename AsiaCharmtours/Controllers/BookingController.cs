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
    public class BookingController : Controller
    {
        // GET: Booking
        [Route("book-tour")]
        public ActionResult AddBook()
        {
            return View();
        }

        [Route("book-tour")]
        [HttpPost]
        public ActionResult AddBook(T2_TourBook book, string PeopleAdult, string PeopleChild , string TourName, int IDtour, string menuAlias)
        {
            using (var db = new DB())
            {
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == menuAlias);
                ViewData["menu"] = menu;
                HttpCookie langCookie = Request.Cookies["LanguageID"];
                var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, lan);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                T2_TourBook insertTour = new T2_TourBook();
                book.People = "Adults: " + PeopleAdult + ", Childrent: " + PeopleChild;
                insertTour = book;
                insertTour.TourType = TourName;
                insertTour.LanguageCode = lan;
                db.T2_TourBook.Add(insertTour);
                db.SaveChanges();
                string Message = "Ho ten" + book.FullName;

                var TKmail = db.W_EmailConfig.Select(x => new ConfigEmail
                {
                    Email = x.Email,
                    Password = x.Password
                }).FirstOrDefault();

                W_TemplateEmail getTemplate = db.W_TemplateEmail.FirstOrDefault(m => m.TypeEmailId == 2);

                getTemplate.Subject = getTemplate.Subject.Replace("{tentour}", TourName);

                W_Company get = db.W_Company.FirstOrDefault();
                T2_Tour tour = db.T2_Tour.FirstOrDefault(m => m.TourId == IDtour);
                string content = getTemplate.Content;

                //content = content.Replace("{Gender}", book.Gender);
                content = content.Replace("{Code}", "ID_" + tour.TourId.ToString());
                content = content.Replace("{From7ToUnder9YearsOld}", PeopleChild.ToString());
                content = content.Replace("{From9YearsOld}", PeopleAdult.ToString());
                content = content.Replace("{InfoBooking}", tour.TourName);
                content = content.Replace("{Star}", tour.Star);

                content = content.Replace("{FullName}", book.FullName);
                content = content.Replace("{Tel}", book.Phone.ToString());
                content = content.Replace("{Email}", book.Email);
                //content = content.Replace("{Country}", book.Nationality);
                //content = content.Replace("{Communicate}", book.communicate);
                content = content.Replace("{Departure}", book.DateArrival);
                //content = content.Replace("{Departure}", book.DateArrival.ToString("dddd, dd MMMM yyyy"));

                //content = content.Replace("{Request}", book.Message);
                content = content.Replace("{HotelName}", get.CompanyName);
                content = content.Replace("{Add}", get.Address);
                content = content.Replace("{Hotline}", get.Phone);
                content = content.Replace("{EmailHotel}", get.Email);
                content = content.Replace("{Website}", get.Website);

                W_Helper.SendMailGuest(TKmail, book.Email, getTemplate.Subject, content);
                W_Helper.SendMailGuest(TKmail, get.Email, getTemplate.Subject, content);

                return View();
            }
        }


    }
}