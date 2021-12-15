using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string MenuAlias { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Avatar { get; set; }
        public int Menutype { get; set; }
        public int Location { get; set; }
        public int Lever { get; set; }
        public string Icon { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public Nullable<int> View { get; set; }
        public DateTime DateCreate { get; set; }
    }
}