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
    
    public partial class SR_Theme
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SR_Theme()
        {
            this.T2_Tour = new HashSet<T2_Tour>();
        }
    
        public int ThemeId { get; set; }
        public Nullable<int> MenuId { get; set; }
        public string LanguageCode { get; set; }
        public string Title { get; set; }
        public string Alias { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public string Content { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_Tour> T2_Tour { get; set; }
    }
}