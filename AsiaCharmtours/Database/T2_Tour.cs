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
    
    public partial class T2_Tour
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public T2_Tour()
        {
            this.SR_ThemeMenu = new HashSet<SR_ThemeMenu>();
            this.T2_TourGallery = new HashSet<T2_TourGallery>();
            this.T2_TourJourney = new HashSet<T2_TourJourney>();
            this.T2_TourMenu = new HashSet<T2_TourMenu>();
            this.T2_TourRoomTypePrice = new HashSet<T2_TourRoomTypePrice>();
            this.T2_TourShortJourney = new HashSet<T2_TourShortJourney>();
        }
    
        public int TourId { get; set; }
        public int MainMenuId { get; set; }
        public string LanguageCode { get; set; }
        public Nullable<int> ThemeId { get; set; }
        public string Image { get; set; }
        public string TourName { get; set; }
        public string TourAlias { get; set; }
        public double Excellent { get; set; }
        public int NumberDay { get; set; }
        public string Destination { get; set; }
        public string PromotionTitle { get; set; }
        public string PromotionContent { get; set; }
        public string Description { get; set; }
        public string Overview { get; set; }
        public string Highlights { get; set; }
        public string Meals { get; set; }
        public string Transportation { get; set; }
        public string Accommodation { get; set; }
        public string PriceIncludes { get; set; }
        public string PriceExcludes { get; set; }
        public string Cancellation { get; set; }
        public string Policy { get; set; }
        public string Star { get; set; }
        public string Note { get; set; }
        public int Index { get; set; }
        public string MetaTitle { get; set; }
        public string MetaDescription { get; set; }
        public System.DateTime DateCreate { get; set; }
        public bool IsDeleted { get; set; }
        public Nullable<bool> Like { get; set; }
        public bool Hot { get; set; }
        public Nullable<bool> PriceContact { get; set; }
        public Nullable<bool> Status { get; set; }
        public string DescriptionMin { get; set; }
        public string Background { get; set; }
        public string Image2 { get; set; }
    
        public virtual SR_Theme SR_Theme { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<SR_ThemeMenu> SR_ThemeMenu { get; set; }
        public virtual W_Menu W_Menu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourGallery> T2_TourGallery { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourJourney> T2_TourJourney { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourMenu> T2_TourMenu { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourRoomTypePrice> T2_TourRoomTypePrice { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<T2_TourShortJourney> T2_TourShortJourney { get; set; }
    }
}
