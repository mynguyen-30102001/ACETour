using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AsiaCharmtours
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();
           
            routes.MapRoute("Home", "", new
            {
                controller = "Home",
                action = "Index"
            });
            routes.MapRoute("Inquire", "inquire", new
            {
                controller = "Inquire",
                action = "InquireNow"
            });
            routes.MapRoute("TourSearch", "tour-search", new
            {
                controller = "Home",
                action = "Search"
            });
            routes.MapRoute("Category", "{menuAlias}", new
            {
                controller = "Home",
                action = "Category"
            });

            routes.MapRoute("Search", "search/{menuAlias}", new
            {
                controller = "Search",
                action = "Test"
            });

            routes.MapRoute("Language", "admin/{id}", new
            {
                controller = "Dashboard",
                action = "Overview",
                id = UrlParameter.Optional,
            });

            routes.MapRoute("Item", "{menuAlias}/{itemAlias}", new
            {
                controller = "Home",
                action = "Item"
            });
        }
    }
}
