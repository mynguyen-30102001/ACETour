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
    
    public partial class W_Hotel
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public W_Hotel()
        {
            this.W_HotelGallery = new HashSet<W_HotelGallery>();
            this.W_HotelMenu = new HashSet<W_HotelMenu>();
        }
    
        public int HotelId { get; set; }
        public int MainMenuId { get; set; }
        public string HotelCode { get; set; }
        public string HotelName { get; set; }
        public string HotelAlias { get; set; }
        public string LanguageCode { get; set; }
        public string Image { get; set; }
        public Nullable<double> PriceFrom { get; set; }
        public string FrameLocation { get; set; }
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public int Index { get; set; }
        public int Star { get; set; }
        public string Facility { get; set; }
        public string Note { get; set; }
        public double Excellent { get; set; }
        public string Services { get; set; }
        public string Activities { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public bool IsDeleted { get; set; }
        public string Address { get; set; }
        public bool Hot { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_HotelGallery> W_HotelGallery { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<W_HotelMenu> W_HotelMenu { get; set; }
        public virtual W_Menu W_Menu { get; set; }
    }
}
