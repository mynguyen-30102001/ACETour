using AsiaCharmtours.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace AsiaCharmtours.Database
{
    public enum MenuType
    {
        Home = 2,
        Article = 3,
        Contact = 4,
        Guide = 5,
        Partner = 6,
        Location = 7,
        OutSite = 8,
        Tour = 9,
        Booking = 10,
        Service = 11,
        Feedback = 12,
        Question = 13,
        Registration = 14,
        Require = 15,
        Sites = 20,
        TravelIdeas = 21,
        TourHighlight = 22,
        InfosArticle = 23,
        ArticleHot = 24,
        AboutUs = 25,
        Hotels = 26,
        Blog = 27,
    }
    public partial class W_Article
    {
        [NotMapped]
        public string MenuAlias { get; set; }
    }
    public partial class QA_Question
    {
        [NotMapped]
        public string MenuAlias { get; set; }
    }
    public class QuickData
    {
        public static W_Company Company(string _lang)
        {
            using (var db = new DB())
            {
                W_Company company = db.W_Company
                                .FirstOrDefault(x => x.LanguageCode == _lang);
                return company;
            }
        }
        public static List<W_Slider> Slider(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Slider> sliders = db.W_Slider.Where(x => x.LanguageCode == _lang)
                                            .OrderBy(x => x.Index)
                                            .ToList();
                return sliders;
            }
        }
        //public static List<ShowObject> Slides (string _lang)
        //{
        //    using (var db = new DB())
        //    {
        //        List<ShowObject> sliders = db.W_Slider.Where(x => x.LanguageCode == _lang)
        //            .Join(db.W_SliderMenu, a => a.SliderId, b => b.SliderId, (a, b) => new ShowObject
        //            {
        //                SlideId = a.SliderId,
        //                Image = a.Image,
        //                Title = a.Title,
        //            }).ToList();
        //        return sliders;

        //    }
        //}

        public static List<W_Menu> GetMenu(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Status && a.Location == 1 && a.LanguageCode == _lang 
                                    && (a.MenuTypeId == (int)MenuType.Require || a.MenuTypeId == (int)MenuType.Contact)).OrderBy(a => a.Index)
                                    .ToList();
                return menus;
            }
        }
        public static List<W_Menu> GetMasterMainMenus(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Status && a.Location == 1 && a.LanguageCode == _lang).OrderBy(a => a.Index)
                                    .ToList();
                return menus;
            }
        }

        public static List<EF_Menu> GetDestitation(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Menu> menu = db.W_Menu.Where(a => a.LanguageCode == _lang && a.Location == 1 && a.MenuTypeId == (int)MenuType.Sites)
                   .Join(db.T2_Tour, a => a.MenuId, b => b.MainMenuId, (a, b) => new EF_Menu
                   {
                       MenuId = a.MenuId,
                       MenuAlias = a.MenuAlias,
                       Photo = a.Photo,
                       Title = a.Title,
                       MenuName = a.MenuName,
                       Index = a.Index,
                       TourCount = a.T2_Tour.Count,
                   }).Distinct().ToList();
                //List<W_Menu> menus = db.W_Menu.Where(x => x.LanguageCode == _lang && x.Level == 1 && x.Location == 1 && x.MenuTypeId == (int)MenuType.Tour).ToList();
                return menu;
            }
        }
        public static List<EF_Tour> GetDestitations(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Tour> menu = db.T2_Tour.Where(a => a.LanguageCode == _lang)
                   .Join(db.W_Menu.Where(b=> b.Status && b.Location == 1 && b.MenuTypeId == (int)MenuType.Sites) , a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Tour
                   {
                       MenuAlias = b.MenuAlias,
                       TourName = a.TourName,
                       MenuName = b.MenuName,
                       Index = a.Index,
                       Image = a.Image,
                       Description = a.Description,
                       
                   }).OrderBy(a =>a.Index).ToList();
                //List<W_Menu> menus = db.W_Menu.Where(x => x.LanguageCode == _lang && x.Level == 1 && x.Location == 1 && x.MenuTypeId == (int)MenuType.Tour).ToList();
                return menu;
            }
        }

        public static List<EF_Question> ListQuestion(string _lang)
        {
            using (var db = new DB()) 
            {
                List<EF_Question> list = db.QA_Question
                   .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Question
                   {
                       MenuAlias = b.MenuAlias,
                       Description = a.Description,
                       Title = a.Title,
                       Alias = a.Alias,
                       Content = a.Content,
                       Avatar = a.Avatar,
                       Icon = a.Icon,
                       Menutype = b.MenuTypeId,
                       Location = b.Location,
                       Lever = b.Level
                   }).Where(x=>x.Menutype == (int)MenuType.AboutUs && x.Lever == 0 && x.Location == 1).Distinct().ToList();
                return list;
            }
        }

        public static List<EF_Tour> ListTourLike(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Tour> list = db.T2_Tour.Where(a => a.LanguageCode == _lang && a.Like == true)
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Tour
                    {
                        MenuAlias = b.MenuAlias,
                        Description = a.Description,
                        TourName = a.TourName,
                        TourAlias = a.TourAlias,
                        Destination = a.Destination,
                        DescriptionMin = a.DescriptionMin,
                        Image = a.Image,
                        PriceExcludes = a.PriceExcludes,
                    }).ToList();
                return list;
            }
        }

        public static List<EF_Tour> ListTourHot(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Tour> list = db.T2_Tour.Where(a => a.LanguageCode == _lang && a.Hot == true)
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Tour
                    {
                        MenuAlias = b.MenuAlias,
                        Description = a.Description,
                        TourName = a.TourName,
                        TourAlias = a.TourAlias,
                        Destination = a.Destination,
                        DescriptionMin = a.DescriptionMin,
                        Image = a.Image,
                        PriceExcludes = a.PriceExcludes,
                    }).ToList();
                return list;
            }
        }
        public static List<EF_Article> ListArticle(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Article> list = db.W_Article.Where(a => a.LanguageCode == _lang)
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId, (a, b) => new EF_Article
                    {
                        MenuAlias = b.MenuAlias,
                        Description = a.Description,
                        Title = a.Title,
                        Alias = a.Alias,
                        Content = a.Content,
                        Avatar = a.Avatar,
                        MetaTitle = a.MetaTitle,
                        MetaDescription = a.MetaDescription,
                    }).ToList();
                return list;
            }
        }

        public static List<QA_Question> Question(string _lang)
        {
            using (var db = new DB())
            {
                List<QA_Question> list = db.QA_Question.Where(a => a.LanguageCode == _lang).ToList();
                return list;
            }
        }

        public static List<EF_Tour> ListTour(string _lang)
        {
            using (var db = new DB())
            {
                List<EF_Tour> list = db.T2_Tour.Where(a => (bool)a.Status && a.LanguageCode == _lang)
                    .Join(db.W_Menu, a => a.MainMenuId, b => b.MenuId , (a,b) => new EF_Tour {
                        MenuAlias = b.MenuAlias,
                        Description = a.Description,
                        TourName = a.TourName,
                        TourAlias = a.TourAlias,
                        Destination = a.Destination,
                        DescriptionMin = a.DescriptionMin,
                        Image = a.Image,
                        MainMenuId = a.MainMenuId,
                        PriceExcludes = a.PriceExcludes,
                        Status = (bool)a.Status,

                    })
                    .ToList();
                return list;
            }
        }

        public static List<W_Menu> ListDestination(W_Menu menu, string _lang)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuId);
                List<W_Menu> list = db.W_Menu.Where(x => x.MenuParentId == menus.MenuId).ToList();
                List<W_Menu> menus2 = new List<W_Menu>();
                if (list != null)
                {
                    foreach (var item in list)
                    {
                        List<W_Menu> menudestitation = db.W_Menu.Where(x => x.MenuParentId == item.MenuId && x.MenuTypeId == (int)MenuType.TourHighlight).ToList();
                        foreach (var item2 in menudestitation)
                        {
                            menus2.Add(item2);
                        }
                    }
                }
                return menus2.Take(5).Distinct().ToList();
            }
        }

        public static List<W_Menu> ListMenuParent(W_Menu menu, string _lang)
        {
            using (var db = new DB())
            {
                W_Menu menus = db.W_Menu.FirstOrDefault(x => x.MenuId == menu.MenuId);
                List<W_Menu> list = db.W_Menu.Where(x => x.MenuParentId == menus.MenuId && x.MenuTypeId == (int)MenuType.ArticleHot).ToList();
                return list;
            }
        }

        public static List<W_Menu> GetMasterSubMenus(string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Status && a.Location == 0 && a.LanguageCode == _lang && a.MenuParentId == 0)
                                    .ToList();
                return menus;
            }
        }
        public static List<W_Menu> GetMainMenus(string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Status && a.Location == 1 && a.LanguageCode == _lang)
                                    .ToList();
                return menus;
            }
        }

        public static List<W_Menu> GetMainMenus2(string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Location == 1 && a.LanguageCode == _lang)
                                    .ToList();
                return menus;
            }
        }


        public static List<W_Menu> GetSubMenus(string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                                    .Where(a => a.Status && a.Location == 0 && a.LanguageCode == _lang)
                                    .ToList();
                return menus;
            }
        }
        /// <summary>
        /// Lấy danh sách các chuyên mục menu
        /// </summary>
        /// <param name="_lang"></param>
        /// <returns></returns>
        public static List<W_Menu> GetAllMenu(string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenus = new List<W_Menu>();
                // chuyên mục chính
                List<W_Menu> menus = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Location == 1 && x.Status).ToList();
                if (menus is null) menus = new List<W_Menu>();
                if (menus.Count > 0)
                {
                    int maxLevel = menus.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                // chuyên mục phụ
                List<W_Menu> menus2 = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Location == 0 && x.Status).ToList();
                if (menus2 is null) menus2 = new List<W_Menu>();
                if (menus2.Count > 0)
                {
                    int maxLevel = menus2.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus2.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = menus2.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                return listMenus;
            }
        }


        //Select language
        public static List<W_Language> ListLanguage()
        {
            using (var db = new DB())
            {
                return db.W_Language.ToList();
            }
        }

        public static List<RV_Review> ListReview(string _lang)
        {
            using (var db = new DB())
            {
                List<RV_Review> review = db.RV_Review.Where(x => (bool)x.Status && x.LanguageCode == _lang).ToList();
                return review;
            }
        }

        public static List<W_Partner> ListPartner(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Partner> partners = db.W_Partner.Where(x => (bool)x.Status && x.LanguageCode == _lang).ToList();
                return partners;
            }
        }

        public static List<W_Employee> ListEmployee(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Employee> employee = db.W_Employee.Where(x => x.Status && x.LanguageCode == _lang).ToList();
                return employee;
            }
        }

        // Lấy ngôn ngữ hiện tại
        public static string CurentLanguage(string languageId)
        {
            using (var db = new DB())
            {
                var firstOrDefault = db.W_Language.FirstOrDefault(a => a.LanguageCode == languageId);
                if (firstOrDefault != null)
                    return firstOrDefault.LanguageName ?? "";
                else
                {
                    return "";
                }
            }
        }


        /// <summary>
        /// Lấy danh sách các chuyên mục menu tour
        /// </summary>
        /// <param name="_lang"></param>
        /// <returns></returns>
        public static List<W_Menu> GetAllMenuTour(string _lang = "en")
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenus = new List<W_Menu>();
                // chuyên mục chính
                List<W_Menu> menus = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Location == 1 && (x.MenuTypeId == (int)MenuType.Tour || x.MenuTypeId == (int)MenuType.TourHighlight || x.MenuTypeId == (int)MenuType.Sites))
                        .OrderBy(x => x.Index)
                        .ToList();
                if (menus is null) menus = new List<W_Menu>();
                if (menus.Count > 0)
                {
                    int maxLevel = menus.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = new List<W_Menu>();
                        if (masterMenus.Count > 0)
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        else
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderBy(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                // chuyên mục phụ
                List<W_Menu> menus2 = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Location == 0 && x.Status && (x.MenuTypeId == (int)MenuType.Tour || x.MenuTypeId == (int)MenuType.TourHighlight))
                        .OrderBy(x => x.Index)
                        .ToList();
                if (menus2 is null) menus2 = new List<W_Menu>();
                if (menus2.Count > 0)
                {
                    int maxLevel = menus2.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus2.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = menus2.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                return listMenus;
            }
        }

        public static List<W_Menu> GetAllMenuArticle(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenus = new List<W_Menu>();
                // chuyên mục chính
                List<W_Menu> menus = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Location == 1 && (x.MenuTypeId == (int)MenuType.Article || x.MenuTypeId == (int)MenuType.AboutUs || x.MenuTypeId == (int)MenuType.InfosArticle))
                        .OrderBy(x => x.Index)
                        .ToList();
                if (menus is null) menus = new List<W_Menu>();
                if (menus.Count > 0)
                {
                    int maxLevel = menus.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = new List<W_Menu>();
                        if (masterMenus.Count > 0)
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        else
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderBy(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                return listMenus;
            }
        }

        public static List<W_Menu> GetAllMenuQuestion(string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenus = new List<W_Menu>();
                // chuyên mục chính
                List<W_Menu> menus = db.W_Menu
                        .Where(x => x.LanguageCode == _lang && x.Level == 0 && (x.MenuTypeId == (int)MenuType.Question || x.MenuTypeId == (int)MenuType.AboutUs))
                        .OrderBy(x => x.Index)
                        .ToList();
                if (menus is null) menus = new List<W_Menu>();
                if (menus.Count > 0)
                {
                    int maxLevel = menus.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = new List<W_Menu>();
                        if (masterMenus.Count > 0)
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        else
                            menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderBy(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                return listMenus;
            }
        }


        public static List<W_Menu> GetMenuByType(int _menuTypeId, int _parentMennuId = 0, string _lang = "vi")
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenuRoot = db.W_Menu.Where(m => m.LanguageCode == _lang).ToList();
                listMenuRoot = listMenuRoot.Where(m => m.MenuParentId == _parentMennuId && m.MenuTypeId == _menuTypeId).OrderBy(m => m.Index).ToList();
                List<W_Menu> listMenu = listMenuRoot;
                W_Menu menuMaxLevel = db.W_Menu.OrderByDescending(m => m.Level).FirstOrDefault();

                int level = 0;
                if (menuMaxLevel != null)
                {
                    level = menuMaxLevel.Level;
                }

                if (level > 0)
                {
                    for (int i = 1; i <= level; i++)
                    {
                        var listMenuTemp = new List<W_Menu>();
                        List<W_Menu> listMenuByLevel;

                        listMenuByLevel =
                            db.W_Menu.Where(m => m.Level == i && m.MenuTypeId == _menuTypeId && m.LanguageCode == _lang).ToList();

                        foreach (W_Menu menu in listMenu)
                        {
                            listMenuTemp.Add(menu);
                            listMenuTemp.AddRange(listMenuByLevel.Where(m => m.MenuParentId == menu.MenuId).ToList());
                        }
                        listMenu = listMenuTemp;
                    }
                }
                else
                {
                    listMenu = listMenuRoot;
                }
                return listMenu;
            }
        }

        public static W_Menu GetMenuTour(string _lang)
        {
            var db = new DB();
            var menu = db.W_Menu.FirstOrDefault(x => x.MenuTypeId == (int)MenuType.Tour && x.MenuParentId == 0 && x.Level == 0 && x.LanguageCode == _lang);
            return menu;
        }

        public static List<W_Menu> ListMenuThemes(int _level, string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> list = db.W_Menu.Where(x => x.LanguageCode == _lang
                                                     && x.Location == 1
                                                     && x.MenuTypeId == (int)MenuType.TourHighlight
                                                     && x.Level == _level).ToList();
                return list;
            }
        }

        public static List<W_Menu> GetMenuArticleLeve(int _parentMenuId, int _level, string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                       .Where(x => x.LanguageCode == _lang
                                   && x.Location == 1
                                   && (x.MenuParentId == _parentMenuId || x.MenuParentId == 0)
                                   && (x.MenuTypeId == (int)MenuType.InfosArticle || x.MenuTypeId == (int)MenuType.Article || x.MenuTypeId == (int)MenuType.Sites)
                                   && (x.Level == _level || x.Level == 0)).ToList();
                return menus;
            }
        }

        public static List<W_Menu> GetMenuArticleDestination(int _parentMenuId, int _level, string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = db.W_Menu
                       .Where(x => x.LanguageCode == _lang
                                   && x.Location == 1
                                   && x.MenuParentId == _parentMenuId
                                   && x.MenuTypeId == (int)MenuType.ArticleHot
                                   && x.Level == _level).ToList();
                return menus;
            }
        }

        public static List<W_Menu> ListMenuArticle(int _parentMenuId, int _level, string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> menus = new List<W_Menu>();
                menus = db.W_Menu
                       .Where(x => x.LanguageCode == _lang
                                   && (x.Location == 1)
                                   && (x.MenuParentId == _parentMenuId)
                                   && (x.MenuTypeId == (int)MenuType.Tour)
                                   && x.Level == _level).ToList();
                W_Menu menu = db.W_Menu.FirstOrDefault(x => x.MenuTypeId == (int)MenuType.AboutUs);
                menus.Add(menu);
                return menus;
            }
        }

        public static List<W_Menu> GetMenuTourByLevel(int _parentMenuId, int _level, string _lang)
        {
            using (var db = new DB())
            {
                List<W_Menu> listMenus = new List<W_Menu>();
                // chuyên mục chính
                List<W_Menu> menus = db.W_Menu
                        .Where(x => x.LanguageCode == _lang
                                    && x.Location == 1
                                    && x.MenuParentId == _parentMenuId
                                    && (x.MenuTypeId == (int)MenuType.Tour || x.MenuTypeId == (int)MenuType.Sites)
                                    && x.Level == _level).ToList();
                if (menus is null) menus = new List<W_Menu>();
                if (menus.Count > 0)
                {
                    int maxLevel = menus.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = menus.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                // chuyên mục phụ
                List<W_Menu> menus2 = db.W_Menu
                        .Where(x => x.LanguageCode == _lang
                                    && x.Location == 0
                                    && x.MenuParentId == _parentMenuId
                                    && x.MenuTypeId == (int)MenuType.Tour
                                    && x.Level == _level).ToList();
                if (menus2 is null) menus2 = new List<W_Menu>();
                if (menus2.Count > 0)
                {
                    int maxLevel = menus2.Max(x => x.Level) + 1;
                    List<W_Menu> masterMenus = menus2.FindAll(x => x.Level == 0).OrderBy(x => x.Index).ToList();
                    listMenus.AddRange(masterMenus);
                    for (int i = 1; i < maxLevel; i++)
                    {
                        List<W_Menu> menuCurrentLevel = menus2.FindAll(x => x.Level == i).OrderByDescending(x => x.Index).ToList();
                        if (menuCurrentLevel != null && menuCurrentLevel.Count > 0)
                        {
                            menuCurrentLevel.ForEach(x =>
                            {
                                int indexParentMenu = listMenus.FindIndex(y => y.MenuId == x.MenuParentId);
                                if (indexParentMenu < 0 || indexParentMenu == listMenus.Count - 1)
                                    listMenus.Add(x);
                                else
                                    listMenus.Insert(indexParentMenu + 1, x);
                            });
                        }
                    }
                }
                return listMenus;
            }
        }

        public static List<EF_Tour> ConvertEFTour(List<T2_Tour> _tours)
        {
            List<EF_Tour> tours = new List<EF_Tour>();
            using (var db = new DB())
            {
                _tours.ForEach(x =>
                {

                    if (x.PriceContact == false)
                    {
                        T2_TourRoomTypePriceGroup tourRoomTypePriceGroup = x.T2_TourRoomTypePrice
                                .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                                .OrderBy(y => y.b.PromotionalPrice)
                                .Select(y => y.b)
                                .FirstOrDefault();
                        double save = 0;
                        if (tourRoomTypePriceGroup != null)
                        {
                            if (tourRoomTypePriceGroup.PromotionalPrice > 0)
                            {
                                save = 100 - Math.Round((((double)tourRoomTypePriceGroup.PromotionalPrice / (double)tourRoomTypePriceGroup.Price) * 100), 0);
                            }
                            tours.Add(new EF_Tour()
                            {
                                TourId = x.TourId,
                                Description = x.Description,
                                Destination = x.Destination,
                                Excellent = x.Excellent,
                                Hot = x.Hot,
                                PriceContact = (bool)x.PriceContact,
                                Image = x.Image,
                                Index = x.Index,
                                MenuAlias = x.W_Menu.MenuAlias,
                                MenuName = x.W_Menu.MenuName,
                                MetaDescription = x.MetaDescription,
                                MetaTitle = x.MetaTitle,
                                NumberDay = x.NumberDay,
                                Review = 0,
                                TourAlias = x.TourAlias,
                                TourName = x.TourName,
                                TourTypeGroupNames = x.T2_TourRoomTypePrice
                                                    .Where(y => y.TourId == x.TourId)
                                                    .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { b })
                                                    .Join(db.T2_TourTypeGroup, c => c.b.TourTypeGroupId, d => d.TourTypeGroupId, (c, d) => new { d })
                                                    .Select(y => y.d.TourTypeGroupName)
                                                    .Distinct()
                                                    .ToList(),
                                PromotionTitle = x.PromotionTitle,
                                PromotionContent = x.PromotionContent,
                                Price = tourRoomTypePriceGroup.Price,
                                PromotionalPrice = tourRoomTypePriceGroup.PromotionalPrice,
                                DisCount = save,
                                DescriptionMin = x.DescriptionMin,
                                DateCreate = DateTime.Parse(x.DateCreate.ToLongDateString()),
                            });
                        }
                    }
                    else
                    {
                        tours.Add(new EF_Tour()
                        {
                            TourId = x.TourId,
                            Description = x.Description,
                            Destination = x.Destination,
                            Excellent = x.Excellent,
                            Hot = x.Hot,
                            PriceContact = (bool)x.PriceContact,
                            Image = x.Image,
                            Index = x.Index,
                            MenuAlias = x.W_Menu.MenuAlias,
                            MetaDescription = x.MetaDescription,
                            MenuName = x.W_Menu.MenuName,
                            MetaTitle = x.MetaTitle,
                            NumberDay = x.NumberDay,
                            Review = 0,
                            TourAlias = x.TourAlias,
                            TourName = x.TourName,

                            TourTypeGroupNames = x.T2_TourRoomTypePrice
                                                .Where(y => y.TourId == x.TourId)
                                                .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { b })
                                                .Join(db.T2_TourTypeGroup, c => c.b.TourTypeGroupId, d => d.TourTypeGroupId, (c, d) => new { d })
                                                .Select(y => y.d.TourTypeGroupName)
                                                .Distinct()
                                                .ToList(),
                            PromotionTitle = x.PromotionTitle,
                            PromotionContent = x.PromotionContent,
                            DescriptionMin = x.DescriptionMin,
                            DateCreate = DateTime.Parse(x.DateCreate.ToLongDateString()),
                        });
                    }


                });
                return tours.Skip(0).ToList();
            }
        }
        public static EF_TourDetail ConvertEFTourDetail(T2_Tour _tour)
        {
            using (var db = new DB())
            {
                //if ((bool)_tour.PriceContact)
                //{
                //    EF_TourDetail tourDetail = new EF_TourDetail()
                //    {
                //        Image = _tour.Image,
                //        MenuAlias = _tour.W_Menu.MenuAlias,
                //        TourName = _tour.TourName,
                //        TourAlias = _tour.TourAlias,
                //        TourGallery = _tour.T2_TourGallery.FirstOrDefault().Image,
                //        TourId = _tour.TourId,
                //        Accommodation = _tour.Accommodation,
                //        Cancellation = _tour.Cancellation,
                //        Highlights = _tour.Highlights,
                //        Meals = _tour.Meals,
                //        Destination = _tour.Destination,
                //        Note = _tour.Note,
                //        NumberDay = _tour.NumberDay,
                //        PromotionTitle = _tour.PromotionTitle,
                //        Overview = _tour.Overview,
                //        Policy = _tour.Policy,
                //        PriceExcludes = _tour.PriceExcludes,
                //        PriceIncludes = _tour.PriceIncludes,
                //        Transportation = _tour.Transportation,
                //        T2_TourShortJourney = _tour.T2_TourShortJourney.ToList(),
                //        T2_TourJourney = _tour.T2_TourJourney.ToList(),
                //        PromotionContent = _tour.PromotionContent,
                //        Description = _tour.Description
                //    };

                //    return tourDetail;
                //}
                //else
                //{
                //    T2_TourRoomTypePriceGroup tourRoomTypePriceGroupSmall = _tour.T2_TourRoomTypePrice
                //        .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                //        .OrderBy(y => y.b.PromotionalPrice)
                //        .Select(y => y.b)
                //        .FirstOrDefault();
                //    EF_TourDetail tourDetail = new EF_TourDetail()
                //    {
                //        Image = _tour.Image,
                //        MenuAlias = _tour.W_Menu.MenuAlias,
                //        TourName = _tour.TourName,
                //        TourAlias = _tour.TourAlias,
                //        TourGallery = _tour.T2_TourGallery.FirstOrDefault().Image,
                //        TourId = _tour.TourId,
                //        Accommodation = _tour.Accommodation,
                //        Cancellation = _tour.Cancellation,
                //        Highlights = _tour.Highlights,
                //        Meals = _tour.Meals,
                //        Destination = _tour.Destination,
                //        Note = _tour.Note,
                //        NumberDay = _tour.NumberDay,
                //        PromotionTitle = _tour.PromotionTitle,
                //        Overview = _tour.Overview,
                //        Policy = _tour.Policy,
                //        Price = tourRoomTypePriceGroupSmall.Price,
                //        PricePromotion = tourRoomTypePriceGroupSmall.PromotionalPrice,
                //        PriceExcludes = _tour.PriceExcludes,
                //        PriceIncludes = _tour.PriceIncludes,
                //        Transportation = _tour.Transportation,
                //        T2_TourShortJourney = _tour.T2_TourShortJourney.ToList(),
                //        T2_TourJourney = _tour.T2_TourJourney.ToList()
                //    };
                //    EF_TourPrice tourPrice = new EF_TourPrice()
                //    {
                //        EF_TourRoomType = new List<EF_TourRoomType>(),
                //        EF_TourTypeGroup = new List<EF_TourTypeGroup>()
                //    };

                //    List<T2_TourRoomTypePrice> tourRoomTypePrices = db.T2_TourRoomTypePrice
                //                            .Where(x => x.TourId == _tour.TourId)
                //                            .ToList();
                //    if (tourRoomTypePrices is null) tourRoomTypePrices = new List<T2_TourRoomTypePrice>();
                //    List<EF_TourRoomType> tourRoomTypes = new List<EF_TourRoomType>();
                //    tourRoomTypePrices.ForEach(x =>
                //    {
                //        tourRoomTypes.Add(new EF_TourRoomType
                //        {
                //            TourRoomTypePriceId = x.TourRoomTypePriceId,
                //            Description = x.Description,
                //            TourRoomTypeName = x.T2_TourRoomType.TourRoomTypeName
                //        });
                //    });

                //    List<T2_TourTypeGroup> tourTypeGroupsBase = db.T2_TourRoomTypePrice
                //                            .Where(x => x.TourId == _tour.TourId)
                //                            .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                //                            .Join(db.T2_TourTypeGroup, c => c.b.TourTypeGroupId, d => d.TourTypeGroupId, (c, d) => new { d })
                //                            .Select(x => x.d)
                //                            .Distinct()
                //                            .ToList();
                //    if (tourTypeGroupsBase is null) tourTypeGroupsBase = new List<T2_TourTypeGroup>();
                //    List<EF_TourTypeGroup> tourTypeGroups = new List<EF_TourTypeGroup>();
                //    tourTypeGroupsBase.ForEach(x =>
                //    {
                //        tourTypeGroups.Add(new EF_TourTypeGroup()
                //        {
                //            TourTypeGroupId = x.TourTypeGroupId,
                //            TourTypeGroupName = x.TourTypeGroupName
                //        });
                //    });
                //    tourRoomTypes.ForEach(x =>
                //    {
                //        x.EF_TourRoomTypePrice = new List<EF_TourRoomTypePrice>();
                //        tourTypeGroups.ForEach(y =>
                //        {
                //            T2_TourRoomTypePriceGroup tourRoomTypePriceGroup = db.T2_TourRoomTypePriceGroup
                //                    .FirstOrDefault(z => z.TourRoomTypePriceId == x.TourRoomTypePriceId
                //                                            && z.TourTypeGroupId == y.TourTypeGroupId);
                //            if (tourRoomTypePriceGroup != null)
                //            {
                //                x.EF_TourRoomTypePrice.Add(new EF_TourRoomTypePrice()
                //                {
                //                    TourTypeGroupId = tourRoomTypePriceGroup.TourTypeGroupId,
                //                    Price = tourRoomTypePriceGroup.Price,
                //                    PromotionalPrice = tourRoomTypePriceGroup.PromotionalPrice
                //                });
                //            }

                //        });
                //    });
                //    tourDetail.EF_TourPrice = new EF_TourPrice()
                //    {
                //        EF_TourRoomType = tourRoomTypes,
                //        EF_TourTypeGroup = tourTypeGroups
                //    };
                //    return tourDetail;
                //}




                T2_TourRoomTypePriceGroup tourRoomTypePriceGroupSmall = _tour.T2_TourRoomTypePrice
                        .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                        .OrderBy(y => y.b.PromotionalPrice)
                        .Select(y => y.b)
                        .FirstOrDefault();
                EF_TourDetail tourDetail = new EF_TourDetail()
                {
                    Image = _tour.Image,
                    MenuAlias = _tour.W_Menu.MenuAlias,
                    TourName = _tour.TourName,
                    TourAlias = _tour.TourAlias,
                    //TourGallery = _tour.T2_TourGallery.FirstOrDefault().Image,
                    TourId = _tour.TourId,
                    Accommodation = _tour.Accommodation,
                    Cancellation = _tour.Cancellation,
                    Highlights = _tour.Highlights,
                    Meals = _tour.Meals,
                    Destination = _tour.Destination,
                    Note = _tour.Note,
                    NumberDay = _tour.NumberDay,
                    PromotionTitle = _tour.PromotionTitle,
                    Overview = _tour.Overview,
                    Policy = _tour.Policy,
                    //Price = tourRoomTypePriceGroupSmall.Price,
                    //PricePromotion = tourRoomTypePriceGroupSmall.PromotionalPrice,
                    PriceExcludes = _tour.PriceExcludes,
                    PriceIncludes = _tour.PriceIncludes,
                    Transportation = _tour.Transportation,
                    T2_TourShortJourney = _tour.T2_TourShortJourney.ToList(),
                    T2_TourJourney = _tour.T2_TourJourney.ToList()
                };
                EF_TourPrice tourPrice = new EF_TourPrice()
                {
                    EF_TourRoomType = new List<EF_TourRoomType>(),
                    EF_TourTypeGroup = new List<EF_TourTypeGroup>()
                };

                List<T2_TourRoomTypePrice> tourRoomTypePrices = db.T2_TourRoomTypePrice
                                        .Where(x => x.TourId == _tour.TourId)
                                        .ToList();
                if (tourRoomTypePrices is null) tourRoomTypePrices = new List<T2_TourRoomTypePrice>();
                List<EF_TourRoomType> tourRoomTypes = new List<EF_TourRoomType>();
                tourRoomTypePrices.ForEach(x =>
                {
                    tourRoomTypes.Add(new EF_TourRoomType
                    {
                        TourRoomTypePriceId = x.TourRoomTypePriceId,
                        Description = x.Description,
                        TourRoomTypeName = x.T2_TourRoomType.TourRoomTypeName
                    });
                });

                List<T2_TourTypeGroup> tourTypeGroupsBase = db.T2_TourRoomTypePrice
                                        .Where(x => x.TourId == _tour.TourId)
                                        .Join(db.T2_TourRoomTypePriceGroup, a => a.TourRoomTypePriceId, b => b.TourRoomTypePriceId, (a, b) => new { a, b })
                                        .Join(db.T2_TourTypeGroup, c => c.b.TourTypeGroupId, d => d.TourTypeGroupId, (c, d) => new { d })
                                        .Select(x => x.d)
                                        .Distinct()
                                        .ToList();
                if (tourTypeGroupsBase is null) tourTypeGroupsBase = new List<T2_TourTypeGroup>();
                List<EF_TourTypeGroup> tourTypeGroups = new List<EF_TourTypeGroup>();
                tourTypeGroupsBase.ForEach(x =>
                {
                    tourTypeGroups.Add(new EF_TourTypeGroup()
                    {
                        TourTypeGroupId = x.TourTypeGroupId,
                        TourTypeGroupName = x.TourTypeGroupName
                    });
                });
                tourRoomTypes.ForEach(x =>
                {
                    x.EF_TourRoomTypePrice = new List<EF_TourRoomTypePrice>();
                    tourTypeGroups.ForEach(y =>
                    {
                        T2_TourRoomTypePriceGroup tourRoomTypePriceGroup = db.T2_TourRoomTypePriceGroup
                                .FirstOrDefault(z => z.TourRoomTypePriceId == x.TourRoomTypePriceId
                                                        && z.TourTypeGroupId == y.TourTypeGroupId);
                        if (tourRoomTypePriceGroup != null)
                        {
                            x.EF_TourRoomTypePrice.Add(new EF_TourRoomTypePrice()
                            {
                                TourTypeGroupId = tourRoomTypePriceGroup.TourTypeGroupId,
                                Price = tourRoomTypePriceGroup.Price,
                                PromotionalPrice = tourRoomTypePriceGroup.PromotionalPrice
                            });
                        }

                    });
                });
                tourDetail.EF_TourPrice = new EF_TourPrice()
                {
                    EF_TourRoomType = tourRoomTypes,
                    EF_TourTypeGroup = tourTypeGroups
                };
                return tourDetail;
            }
        }

    }
}