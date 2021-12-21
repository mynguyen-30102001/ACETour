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
    public class HomeController : BasicController
    {
        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            using (var db = new DB())
            {
                W_Company hotel = QuickData.Company(Request.Cookies["LanguageID"].Value);
                ViewBag.MetaTitle = hotel.MetaTitle;
                ViewBag.MetaDesctiption = hotel.MetaDescription;
                ViewData["sliders"] = QuickData.Slider(Request.Cookies["LanguageID"].Value);
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuTypeId == (int)MenuType.Home);
                W_Menu menufeedback = db.W_Menu.FirstOrDefault(x => x.MenuTypeId == (int)MenuType.Feedback);

                //List<SelectListItem> listmenu = new List<SelectListItem>();
                //listmenu.Add(new SelectListItem() { Value = "Type de voyage", Text = "All" });
                //ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");

                List<W_Menu> listMenu = QuickData.ListMenuThemes(0,menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");

                ViewData["menu"] = menu;
                ViewData["feedback"] = menufeedback;
                return View();
            }
        }
        [HttpGet]
        public ActionResult Category(string menuAlias, int? page, int? pageSize)
        {
            using (var db = new DB())
            {
                List<W_Language> languages = db.W_Language.ToList();
                foreach (var item in languages)
                {
                    if (menuAlias == item.LanguageCode)
                    {
                        HttpCookie langCookie = Request.Cookies["LanguageID"];
                        langCookie.Value = item.LanguageCode;
                        langCookie.Expires = DateTime.Now.AddDays(10);
                        HttpContext.Response.Cookies.Add(langCookie);
                        return Redirect("/");
                    }
                }
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == menuAlias);
                ViewData["menu"] = menu;
                switch (menu.MenuTypeId)
                {
                    case (int)MenuType.TourHighlight:
                        return TourHighLight(menu, page, pageSize);
                    case (int)MenuType.Tour:
                        return Tour(menu);
                    case (int)MenuType.Article:
                        return ListArticle(menu);
                    case (int)MenuType.Blog:
                        return ListBlog(menu);
                    case (int)MenuType.Contact:
                        return Contact(menu);
                    case (int)MenuType.AboutUs:
                        return AboutUs(menu);
                    case (int)MenuType.TravelIdeas:
                        return TravelIdeas(menu, page, pageSize);
                    case (int)MenuType.InfosArticle:
                        return InfoArticle(menu);
                    case (int)MenuType.Sites:
                        return Sites(menu);
                    case (int)MenuType.Hotels:
                        return Hotel(menu);
                    case (int)MenuType.Feedback:
                        return Feedback(menu, page, pageSize);
                    case (int)MenuType.Require:
                        return Require(menu);
                    case (int)MenuType.ArticleHot:
                        return ArticleHot(menu);

                    default:
                        return Redirect("/");
                }
            }
        }

        [HttpGet]
        public ActionResult Item(string menuAlias, string itemAlias)
        {
            using (var db = new DB())
            {
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == menuAlias);
                ViewData["menu"] = menu;
                switch (menu.MenuTypeId)
                {
                    case (int)MenuType.Tour:
                        return TourDetail(menu, itemAlias);
                    case (int)MenuType.Article:
                        return DetailArticle(menu, itemAlias);
                    case (int)MenuType.Blog:
                        return DetailBlog(menu, itemAlias);
                    case (int)MenuType.Question:
                        return DetailQuestion(menu, itemAlias);
                    case (int)MenuType.InfosArticle:
                        return DetailArticle(menu, itemAlias);
                    case (int)MenuType.Sites:
                        return SiteDetail(menu, itemAlias);
                    case (int)MenuType.Hotels:
                        return DetailHotel(menu, itemAlias);
                    default:
                        return Redirect("/");
                }
            }
        }

        public ActionResult Require(W_Menu menu)
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu2"] = menu;
                return View("Requirefb");
            }
        }

        public ActionResult ArticleHot(W_Menu menu)
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu2"] = menu;
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                W_Menu menus2 = db.W_Menu.FirstOrDefault(x => x.MenuId == menus.MenuParentId);
                ViewData["menu"] = menus2;
                W_Article article = db.W_Article
                 .Join(db.W_ThemesMenu, a => a.ArticleId, b => b.ArticleId, (a, b) => new { a, b })
                 .Where(x => x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId && !x.a.Status)
                 .Select(x => x.a)
                 .Distinct()
                 .FirstOrDefault();
                List<T2_Tour> tours = db.T2_Tour
                   .Join(db.W_ArticleRelatedPost, a => a.TourId, b => b.ArticleRelatedId, (a, b) => new { a, b })
                   .Join(db.W_Article, c=>c.b.ArticleId , d=>d.ArticleId , (c,d) =>new { c,d})
                   .Where(x => x.d.ArticleId == article.ArticleId && !x.c.a.IsDeleted)
                   .Select(x => x.c.a)
                   .Distinct()
                   .ToList();
                List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
               
                ViewData["ListTour"] = listTours;
                ViewData["ListSites"] = article;
                return View("Sites/DetailsSites");
            }
        }

        public ActionResult Feedback(W_Menu menu, int? page, int? pageSize)
        {
            using (var db = new DB())
            {
                int pagenumber = page ?? 1;
                int pagesize = pageSize ?? 5;
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "Type de voyage", Text = "All" });
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu2"] = menu;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<RV_Review> review = db.RV_Review.Where(x => (bool)x.Status && x.LanguageCode == menu.LanguageCode).ToList();
                IPagedList<RV_Review> list = review.ToPagedList(pagenumber, pagesize);
                ViewData["listReview"] = list;
                return View("Comment/ListComment", list);
            }
        }

        public ActionResult Contact(W_Menu menu)
        {
            using (var db = new DB())
            {
                
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewBag.NoSpam = "spammm";
                TempData["Spammm"] = 2;
                return View("Contact");
            }
        }

        public ActionResult TourHighLight(W_Menu menu, int? page, int? pageSize)
        {
            using (var db = new DB())
            {
                int pagenumber = page ?? 1;
                int pagesize = pageSize ?? 9;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = new List<W_Menu>();
                List<SelectListItem> listmenu = new List<SelectListItem>();
                List<T2_Tour> tours = new List<T2_Tour>();
                if (menu.Level == 2)
                {
                    W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                    ViewData["menu"] = menus;
                    //listMenu = QuickData.ListMenuThemes(menus.MenuId, 2, menu.LanguageCode);
                    tours = db.T2_Tour
                   .Join(db.SR_ThemeMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                   .Where(x => x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId)
                   .Select(x => x.a)
                   .Distinct()
                   .ToList();
                }
                else
                {
                    W_Menu menus2 = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                    W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menus2.MenuParentId);
                    //listMenu = QuickData.ListMenuThemes(menus.MenuId, 2, menu.LanguageCode);
                    ViewData["menu"] = menus;
                    tours = db.T2_Tour
                   .Join(db.T2_TourMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                   .Where(x => x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId)
                   .Select(x => x.a)
                   .Distinct()
                   .ToList();
                }
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu2"] = menu;
                List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
                IPagedList<EF_Tour> list = listTours.ToPagedList(pagenumber, pagesize);
                ViewData["listTours"] = list;
                return View("Tour/HighLight", list);
            }
        }

        public ActionResult ListArticle(W_Menu menu)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;
                ViewData["menu2"] = menu;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                //List<W_Article> list = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && (bool)x.Travel && x.Status && x.LanguageCode == lan).Take(3).ToList();
                //foreach (var article in list)
                //{
                //    article.MenuAlias = article.W_Menu.MenuAlias;
                //}

                //List<W_Article> listArticle = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == lan).OrderByDescending(x=>x.ArticleId).Take(5).ToList();
                //foreach (var item in listArticle)
                //{
                //    item.MenuAlias = item.W_Menu.MenuAlias;
                //}

                //List<W_Article> listDestitation = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && (bool)x.Destination && x.Status && x.LanguageCode == lan).OrderByDescending(x => x.ArticleId).Take(5).ToList();
                //foreach (var item in listDestitation)
                //{
                //    item.MenuAlias = item.W_Menu.MenuAlias;
                //}
                List<W_Article> listAll = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode).OrderBy(x => x.ArticleId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                ViewData["ArticleAll"] = listAll;

                W_Article detailsArticle = db.W_Article.FirstOrDefault(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode);
                //ViewData["ArticleList"] = list;
                //ViewData["Article"] = listArticle;
                //ViewData["ArticleDestination"] = listDestitation;
                return View("Guide/ListGuide", detailsArticle);
            }
        }
        
        public ActionResult ListBlog(W_Menu menu)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;
                ViewData["menu2"] = menu;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
            
                List<Blog> listAll = db.Blogs.Where(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode)
                    .OrderBy(x => x.BlogId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                    travel.AuthorName = travel.Author.Title;
                }
                ViewData["BlogAll"] = listAll;

                Blog detailsBlog = db.Blogs.FirstOrDefault(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode);
                //ViewData["ArticleList"] = list;
                //ViewData["Article"] = listArticle;
                //ViewData["ArticleDestination"] = listDestitation;
                return View("Blog/ListBlog", detailsBlog);
            }
        }

        public ActionResult InfoArticle(W_Menu menu)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu2"] = menu;
                List<W_Article> list = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode).ToList();
                foreach (var article in list)
                {
                    article.MenuAlias = article.W_Menu.MenuAlias;
                }

                List<W_Article> listDestination = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && (bool)x.Destination && x.LanguageCode == menu.LanguageCode).ToList();
                foreach (var destination in listDestination)
                {
                    destination.MenuAlias = destination.W_Menu.MenuAlias;
                }

                List<W_Article> listTravel = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && (bool)x.Travel && x.LanguageCode == menu.LanguageCode).ToList();
                foreach (var travel in listDestination)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                List<W_Article> listAll = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status && x.LanguageCode == menu.LanguageCode).OrderByDescending(x => x.ArticleId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }

                ViewData["ArticleList"] = list;
                ViewData["ArticleAll"] = listAll;
                ViewData["ArticleDestination"] = listDestination;
                ViewData["ArticleTravel"] = listTravel;
                return View("InfosPratiques/ListInfos");
            }
        }

        public ActionResult Sites(W_Menu menu)
        {
            using (var db = new DB())
            {
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu"] = menus;
                ViewData["menu2"] = menu;
                List<T2_Tour> tours = db.T2_Tour
                   .Join(db.T2_TourMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                   .Where(x => x.b.MenuId == menus.MenuId || x.a.MainMenuId == menus.MenuId && !x.a.IsDeleted && (bool)x.a.Hot)
                   .Select(x => x.a)
                   .Distinct()
                   .ToList();
                List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
                ViewData["TourHot"] = listTours;
            }
            return View("Sites/ListSites");
        }
        public ActionResult TravelIdeas(W_Menu menu, int? page, int? pageSize)
        {
            using (var db = new DB())
            {
                int pagenumber = page ?? 1;
                int pagesize = pageSize ?? 6;

                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0,menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                ViewData["menu"] = menus;
                ViewData["menu2"] = menu;
                List<T2_Tour> tours = db.T2_Tour
                    .Join(db.T2_TourMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                    .Where(x => /*x.b.MenuId == menus.MenuId || x.a.MainMenuId == menus.MenuId &&*/ !x.a.IsDeleted)
                    .Select(x => x.a)
                    .Distinct()
                    .ToList();
                List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
                IPagedList<EF_Tour> lists = listTours.ToPagedList(pagenumber, pagesize);
                ViewData["TourAll"] = lists;
                return View("TravelIdeas/ListTravel", lists);
            }
        }

        public ActionResult AboutUs(W_Menu menu)
        {
            using (var db = new DB())
            {
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "Type de voyage", Text = "All" });
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                QA_Question about = db.QA_Question.FirstOrDefault(x => x.MainMenuId == menu.MenuId);
                ViewData["ListAbout"] = about;
            }
            return View("AboutUs/ListAbout");
        }
        public ActionResult Hotel(W_Menu menu)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuId);
                ViewData["menu"] = menus;
                ViewData["menu2"] = menu;
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                List<W_Hotel> listAll = db.W_Hotel.Where(x => x.MainMenuId == menu.MenuId).OrderBy(x => x.HotelId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                ViewData["HotelAll"] = listAll;

                W_Hotel detailsHotel = db.W_Hotel.FirstOrDefault(x => x.MainMenuId == menu.MenuId && x.LanguageCode == menu.LanguageCode);
                //ViewData["ArticleList"] = list;
                //ViewData["Article"] = listArticle;
                //ViewData["ArticleDestination"] = listDestitation;
                   return View("Hotel/ListHotel");
            }
        }
        public ActionResult Tour(W_Menu menu)
        {
            using (var db = new DB())
            {

                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0,menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                List<T2_Tour> tours = db.T2_Tour
                   .Join(db.T2_TourMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                   .Where(x => x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId /*&& !x.a.IsDeleted*/ /*&& (bool)x.a.Like*/)
                   .Select(x => x.a)
                   .Distinct()
                   .ToList();
                List<T2_Tour> listAll = db.T2_Tour.Where(x => x.MainMenuId == menu.MenuId).OrderBy(x => x.TourId).ToList();
                List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
                ViewData["TourLike"] = listTours;
                return View("Tour/ViewHome");
            }
        }

        public ActionResult TourDetail(W_Menu menu, string itemAlias)
        {
            using (var db = new DB())
            {
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourAlias == itemAlias);
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                List<W_Menu> list = new List<W_Menu>();
                if (tour.T2_TourMenu.Count > 0)
                {
                    var listT2Tour = db.T2_TourMenu.Where(x => x.TourId == tour.TourId).ToList();
                    listT2Tour.ForEach(x =>
                    {
                        W_Menu w_Menu = db.W_Menu.FirstOrDefault(y => y.MenuId == x.MenuId);
                        list.Add(w_Menu);
                    });
                }
                EF_TourDetail tourDetail = QuickData.ConvertEFTourDetail(tour);
                ViewData["tourDetail"] = tourDetail;
                ViewData["menuTour"] = list;
                List<T2_TourGallery> listtourGalleries = db.T2_TourGallery.Where(m => m.TourId == tour.TourId).ToList();
                ViewData["tourgallary"] = listtourGalleries;
                return View("Tour/DetailTour");
            }
        }

        public ActionResult SiteDetail(W_Menu menu, string itemAlias)
        {
            using (var db = new DB())
            {
                //HttpCookie langCookie = Request.Cookies["LanguageID"];
                //var lan = langCookie.Value;
                T2_Tour tour = db.T2_Tour.FirstOrDefault(x => x.TourAlias == itemAlias);
                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                List<W_Menu> list = new List<W_Menu>();
                if (tour.T2_TourMenu.Count > 0)
                {
                    var listT2Tour = db.T2_TourMenu.Where(x => x.TourId == tour.TourId).ToList();
                    listT2Tour.ForEach(x =>
                    {
                        W_Menu w_Menu = db.W_Menu.FirstOrDefault(y => y.MenuId == x.MenuId);
                        list.Add(w_Menu);
                    });
                }
                EF_TourDetail tourDetail = QuickData.ConvertEFTourDetail(tour);
                ViewData["tourDetail"] = tourDetail;
                ViewData["menuTour"] = list;
                List<T2_TourGallery> listtourGalleries = db.T2_TourGallery.Where(m => m.TourId == tour.TourId).ToList();
                ViewData["tourgallary"] = listtourGalleries;
                return View("Sites/DetailsSites");
            }
        }

        public ActionResult DetailArticle(W_Menu menu, string articleArticle)
        {
            using (var db = new DB())
            {
                ViewData["menu2"] = menu;
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;

                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                W_Article detailAricle = db.W_Article.FirstOrDefault(x => x.Alias == articleArticle);
                List<W_Article> listAll = db.W_Article.Where(x => x.MainMenuId == menu.MenuId && x.Status).OrderByDescending(x => x.ArticleId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                ViewData["ArticleAll"] = listAll;
                ViewData["DetailArticle"] = detailAricle;

                return View("Article/DetailArticle");
            }
        }

        public ActionResult DetailBlog(W_Menu menu, string blogArticle)
        {
            using (var db = new DB())
            {
                ViewData["menu2"] = menu;
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;

                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                Blog detailBlog = db.Blogs.FirstOrDefault(x => x.Alias == blogArticle);
                List<Blog> listAll = db.Blogs.Where(x => x.MainMenuId == menu.MenuId && x.Status).OrderByDescending(x => x.BlogId).ToList();
                List<BlogRelatedPost> ListBlogRelate = db.BlogRelatedPosts.Where(a => a.BlogId == detailBlog.BlogId).ToList();
                List<Blog> listRelate = new List<Blog>();
               
                foreach (var relate in ListBlogRelate)
                {
                    Blog blog = listAll.FirstOrDefault(a => a.BlogId == relate.BlogRelateId);
                    Author author = db.Authors.FirstOrDefault(x => x.ID == blog.AuthoId);
                    blog.Author.Title = author.Title;
                    listRelate.Add(blog);
                }

                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                ViewData["BlogAll"] = listAll;
                ViewData["DetailBlog"] = detailBlog;
                ViewData["Relate"] = listRelate;

                return View("Blog/DetailBlog");
            }
        }
        public ActionResult DetailHotel(W_Menu menu, string articleHotel)
        {
            using (var db = new DB())
            {
                ViewData["menu2"] = menu;
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuParentId);
                ViewData["menu"] = menus;

                List<W_Menu> listMenu = QuickData.ListMenuThemes(0, menu.LanguageCode);
                List<SelectListItem> listmenu = new List<SelectListItem>();
                listmenu.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
                foreach (var b in listMenu)
                {
                    listmenu.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
                }
                ViewBag.ListMenuID = new SelectList(listmenu, "Text", "Value");
                W_Hotel detailHotel = db.W_Hotel.FirstOrDefault(x => x.HotelAlias == articleHotel);
                List<W_Hotel> listAll = db.W_Hotel.Where(x => x.MainMenuId == menu.MenuId ).OrderBy(x => x.HotelId).ToList();
                foreach (var travel in listAll)
                {
                    travel.MenuAlias = travel.W_Menu.MenuAlias;
                }
                List<W_HotelGallery> listhotelGalleries = db.W_HotelGallery.Where(m => m.HotelId == detailHotel.HotelId).ToList();
                ViewData["hotelGallery"] = listhotelGalleries;
                ViewData["HotelAll"] = listAll;
                ViewData["DetailHotel"] = detailHotel;

                return View("Hotel/DetailHotel");
            }
        }

        public ActionResult DetailQuestion(W_Menu menu, string articleArticle)
        {
            var db = new DB();
            ViewData["menu"] = menu;
            List<W_Menu> listMenu2 = QuickData.ListMenuThemes(0, menu.LanguageCode);
            List<SelectListItem> listmenu2 = new List<SelectListItem>();
            listmenu2.Add(new SelectListItem() { Value = "All trip types", Text = "All" });
            foreach (var b in listMenu2)
            {
                listmenu2.Add(new SelectListItem() { Value = b.MenuName, Text = b.MenuId.ToString() });
            }
            ViewBag.ListMenuID = new SelectList(listmenu2, "Text", "Value");
            QA_Question detailAricle = db.QA_Question.FirstOrDefault(x => x.Alias == articleArticle);
            List<QA_Question> listAll = db.QA_Question.Where(x => x.MainMenuId == menu.MenuId && x.Status).OrderByDescending(x => x.QuestionId).ToList();
            foreach (var travel in listAll)
            {
                travel.MenuAlias = travel.MenuAlias;
            }
            ViewData["ArticleAll"] = listAll;
            ViewData["DetailArticle"] = detailAricle;
            return View("Article/DetailsQuestion");
        }
    }
}
