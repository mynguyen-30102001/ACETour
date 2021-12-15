using System;
using System.Collections.Generic;

namespace AsiaCharmtours.Models
{
    public class EF_Tour
    {
        public int TourId { get; set; }
        public string MenuAlias { get; set; }
        public string MenuName { get; set; }
        public string Image { get; set; }
        public string TourName { get; set; }
        public string TourAlias { get; set; }
        public double Excellent { get; set; }
        public int Review { get; set; }
        public int NumberDay { get; set; }
        public string Destination { get; set; }
        public string PromotionTitle { get; set; }
        public string PromotionContent { get; set; }
        public string Description { get; set; }
        public int Index { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public bool Hot { get; set; }
        public bool Status { get; set; }
        public bool PriceContact { get; set; }
        public string ThemeName { get; set; }
        public double Price { get; set; }
        public string PriceExcludes { get; set; }
        public int MainMenuId { get; set; }
        //public int ThemeId { get; set; }
        public double PromotionalPrice { get; set; }
        public double DisCount { get; set; }
        public DateTime DateCreate { get; set;}
        public string DescriptionMin { get; set; }

        public List<string> TourTypeGroupNames { get; set; }
        public EF_Filter EF_Filters { get; set; }
    }
}