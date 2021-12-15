using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_Menu
    {
        public int MenuId { get; set; }
        public string LanguageCode { get; set; }
        public int MenuTypeId { get; set; }
        public int MenuParentId { get; set; }
        public int Level { get; set; }
        public string MenuName { get; set; }
        public string MenuAlias { get; set; }
        public int Index { get; set; }
        public int Location { get; set; }
        public string Link { get; set; }
        public string Title { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        public string Background { get; set; }
        public string Photo { get; set; }
        public string Image2 { get; set; }
        public bool Highlight { get; set; }
        public bool MayLike { get; set; }
        public Nullable<bool> ShowMenuTop { get; set; }
        public Nullable<bool> ShowMenuBottom { get; set; }
        public string Content { get; set; }
        public int TourCount { get; set; }
        public bool IsDelete { get; set; }
    }
}