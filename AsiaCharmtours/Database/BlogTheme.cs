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
    
    public partial class BlogTheme
    {
        public int Id { get; set; }
        public Nullable<int> BlogId { get; set; }
        public Nullable<int> ThemeId { get; set; }
    
        public virtual Blog Blog { get; set; }
        public virtual BlogMenuTheme BlogMenuTheme { get; set; }
    }
}
