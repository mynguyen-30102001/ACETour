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
    
    public partial class CR_CruiseGallery
    {
        public int CruiseGalleryId { get; set; }
        public int CruiseId { get; set; }
        public string Image { get; set; }
        public string Title { get; set; }
    
        public virtual CR_Cruise CR_Cruise { get; set; }
    }
}
