using AsiaCharmtours.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_Blog
    {
        public int BlogId { get; set; }
        public int BlogRelatedId { get; set; }
        public string LanguageCode { get; set; }
        public int MainMenuId { get; set; }
        public int AuthorId { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string Description { get; set; }
        public string Content { get; set; }
        public string Avatar { get; set; }
        public string Background { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public DateTime DateUpdate { get; set; }
        public DateTime DateCreate { get; set; }
        public bool Status { get; set; }
        public bool Like { get; set; }
        public int Index { get; set; }
        public bool SelectRelatedPost { get; set; }
        public Author Author { get; set; }
        public BlogRelatedPost BlogRelatedPost { get; set; }

    }
}