using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_Article
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string MenuAlias { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Avatar { get; set; }
        public string MetaTitle { get; set; }
        public int Index { get; set; }
        public string MetaDescription { get; set; }
        public Nullable<int> View { get; set; }
        public DateTime DateCreate { get; set; }
    }
}