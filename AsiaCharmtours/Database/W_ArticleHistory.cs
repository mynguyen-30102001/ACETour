//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AsiaCharmtours.Database
{
    using System;
    using System.Collections.Generic;
    
    public partial class W_ArticleHistory
    {
        public int ArticleHistoryId { get; set; }
        public int ArticleId { get; set; }
        public string Content { get; set; }
        public System.DateTime Date { get; set; }
        public string UserUpdate { get; set; }
    
        public virtual D_User D_User { get; set; }
        public virtual W_Article W_Article { get; set; }
    }
}