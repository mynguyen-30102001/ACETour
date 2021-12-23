using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AsiaCharmtours.Database;
using AsiaCharmtours.Models;
using System.Web.Mvc;
using PagedList;

namespace AsiaCharmtours.Controllers
{
    public class SearchController : Controller
    {
        [Route("search")]
        [HttpGet]
        public ActionResult SearchTour(EF_Filter eF_Filter)
        {
            var db = new DB();
            W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == eF_Filter.MenuAlias);
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

            EF_Tour eft = new EF_Tour();
            EF_Filter infoSearch = new EF_Filter();
            infoSearch.Departure = eF_Filter.Departure;
            infoSearch.Destination = eF_Filter.Destination;
            infoSearch.Duration = eF_Filter.Duration;
            infoSearch.XType = eF_Filter.XType;
            infoSearch.MenuAlias = eF_Filter.MenuAlias;

            eft.EF_Filters = infoSearch;
            return View(eft);
        }

        [Route("search-json")]
        [HttpPost]
        public JsonResult SearchResult(EF_Filter eF_Filter, int page, int pageSize = 9)
        {
            var db = new DB();
            W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuAlias == eF_Filter.MenuAlias);
            List<T2_Tour> tours = new List<T2_Tour>();
          
            if (menu.MenuTypeId != (int)MenuType.Tour)
            {
                tours = db.T2_Tour.Where(x => !x.IsDeleted).ToList();
            }
            else
            {
                tours = db.T2_Tour
                .Join(db.SR_ThemeMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                .Where(x => x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId && !x.a.IsDeleted)
                .Select(x => x.a)
                .Distinct()
                .ToList();
            }
            if (eF_Filter.XType != 0)
            {
                tours = db.T2_Tour
                .Join(db.SR_ThemeMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                .Where(x => /*x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId &&*/ !x.a.IsDeleted && (x.b.MenuId == eF_Filter.XType))
                .Select(x => x.a)
                .Distinct()
                .ToList();
            }
            if (eF_Filter.themes != null)
            {
                tours = db.T2_Tour
                .Join(db.SR_ThemeMenu, a => a.TourId, b => b.TourId, (a, b) => new { a, b })
                .Where(x => /*x.b.MenuId == menu.MenuId || x.a.MainMenuId == menu.MenuId &&*/ !x.a.IsDeleted && (eF_Filter.themes.Contains(x.b.MenuId)))
                .Select(x => x.a)
                .Distinct()
                .ToList();
            }
            if (!string.IsNullOrEmpty(eF_Filter.Destination))
            {
                tours = tours.Where(x => 
                x.Destination.ToUpper().Contains(eF_Filter.Destination.ToUpper())
                || x.TourName.ToUpper().Contains(eF_Filter.Destination.ToUpper())
                ).ToList();
            }
            if (eF_Filter.Duration == 1)
            {
                tours = tours.Where(x => x.NumberDay <= 4).ToList();
            }
            if (eF_Filter.Duration == 2)
            {
                tours = tours.Where(x =>x.NumberDay > 4 && x.NumberDay <= 7).ToList();
            }
            if (eF_Filter.Duration == 3)
            {
                tours = tours.Where(x =>x.NumberDay > 7 && x.NumberDay <= 10).ToList();
            }
            if (eF_Filter.Duration == 4)
            {
                tours = tours.Where(x =>x.NumberDay > 10 && x.NumberDay <= 14).ToList();
            }
            if (eF_Filter.Duration == 5)
            {
                tours = tours.Where(x => x.NumberDay >= 14).ToList();
            }
            List<EF_Tour> listTours = QuickData.ConvertEFTour(tours);
            var model = listTours.Skip((page - 1) * pageSize).Take(pageSize);
            int totalRow = listTours.Count;
            return Json(new { list = model, total = totalRow, status = true }, JsonRequestBehavior.AllowGet);
        }



        public ActionResult Test(string menuAlias)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuAlias == menuAlias);
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuId == menus.MenuParentId);
                ViewData["menu"] = menus;
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

                EF_Tour eft = new EF_Tour();
                EF_Filter infoSearch = new EF_Filter();
                infoSearch.XType = menus.MenuId;
                infoSearch.MenuAlias = menus.MenuAlias;

                eft.EF_Filters = infoSearch;
                return View("SearchTour", eft);
            }
           
        }
        [Route("search-index")]
        [HttpGet]
        public ActionResult SearchIndex(string keySearch)
        {
            using (var db = new DB())
            {
                HttpCookie langCookie = Request.Cookies["LanguageID"];
                var lan = langCookie.Value;
                ViewBag.KeySearch = keySearch;
                List<EF_Tour> list = db.T2_Tour.Where(x => (bool)x.Status && (x.TourName.Contains(keySearch)))
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Tour
                    {
                        TourName = a.TourName,
                        PriceExcludes = a.PriceExcludes,
                        MenuAlias = b.MenuAlias,
                        DescriptionMin = a.DescriptionMin,
                        Description  = a.Description,
                        DateCreate = a.DateCreate,
                        Destination = a.Destination,
                        Image = a.Image,
                        NumberDay = a.NumberDay,
                        MetaTitle = a.MetaTitle,
                        MetaDescription = a.MetaDescription
                    }).ToList();
                if (list == null)
                {
                    return View("/messageSearch");
                }
                ViewData["result"] = list;
                return View();
            }
            
        }

        [Route("search-menu")]
        [HttpGet]
        public ActionResult SearchMenu(string keySearch)
        {
            using (var db = new DB())
            {
                HttpCookie langCookie = Request.Cookies["LanguageID"];
                List<ShowObject> result = new List<ShowObject>();
                var lan = langCookie.Value;
                ViewBag.KeySearch = keySearch;
                List<ShowObject> tour = db.T2_Tour.Where(x => (bool)x.Status && (x.TourName.Contains(keySearch)))
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new ShowObject
                    {
                        TourName = a.TourName,
                        PriceExcludes = a.PriceExcludes,
                        MenuAlias = b.MenuAlias,
                        Alias = a.TourAlias,
                        DescriptionMin = a.DescriptionMin,
                        Description = a.Description,
                        DateCreate = a.DateCreate,
                        Image = a.Image,
                        NumberDay = a.NumberDay,
                        MetaTitle = a.MetaTitle,
                        MetaDescription = a.MetaDescription
                    }).ToList();
                result.AddRange(tour);

                List<ShowObject> article = db.W_Article.Where(x => (bool)x.Status && (x.Title.Contains(keySearch)))
                   .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new ShowObject
                   {
                       Title = a.Title,
                       MenuAlias = b.MenuAlias,
                       Description = a.Description,
                       Content = a.Content,
                       Image = a.Avatar,
                       Alias = a.Alias,
                       Index = a.Index,
                   }).ToList();
                result.AddRange(article);
                if (result == null)
                {
                    return View("/messageSearch");
                }
                ViewData["result"] = result;
                return View();
            }


        }
    }
}