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
    
    public partial class BlogTag
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public BlogTag()
        {
            this.BlogThemeTags = new HashSet<BlogThemeTag>();
        }
    
        public int TagId { get; set; }
        public string LanguageCode { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public int Index { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<BlogThemeTag> BlogThemeTags { get; set; }
    }
}
