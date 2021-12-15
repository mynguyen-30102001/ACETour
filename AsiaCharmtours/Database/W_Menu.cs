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
    
    public partial class W_Menu
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public W_Menu()
        {
            this.CR_Cruise = new HashSet<CR_Cruise>();
            this.CR_CruiseMenu = new HashSet<CR_CruiseMenu>();
            this.SR_ThemeMenu = new HashSet<SR_ThemeMenu>();
            this.T2_Tour = new HashSet<T2_Tour>();
            this.T2_TourMenu = new HashSet<T2_TourMenu>();
            this.W_Article = new HashSet<W_Article>();
            this.W_Gallery = new HashSet<W_Gallery>();
            this.W_HotelMenu = new HashSet<W_HotelMenu>();
            this.W_ThemesMenu = new HashSet<W_ThemesMenu>();
            this.Blogs = new HashSet<Blog>();
        }
    
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
        public string Content { get; set; }
        public string Background { get; set; }
        public string Overview { get; set; }
        public string Note { get; set; }
        public string Introduct { get; set; }
        public string Photo { get; set; }
        public string Image2 { get; set; }
        public bool Highlight { get; set; }
        public bool MayLike { get; set; }
        public Nullable<bool> ShowMenuTop { get; set; }
        public Nullable<bool> ShowMenuBottom { get; set; }
        public string Iframe { get; set; }
        public string Tagline { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CR_Cruise> CR_Cruise { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CR_CruiseMenu> CR_CruiseMenu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SR_ThemeMenu> SR_ThemeMenu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_Tour> T2_Tour { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourMenu> T2_TourMenu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_Article> W_Article { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_Gallery> W_Gallery { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_HotelMenu> W_HotelMenu { get; set; }
        public virtual W_Language W_Language { get; set; }
        public virtual W_MenuType W_MenuType { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_ThemesMenu> W_ThemesMenu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Blog> Blogs { get; set; }
    }
}
