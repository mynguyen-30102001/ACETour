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
    
    public partial class CR_CabinPriceDetail
    {
        public int CabinPriceDetailId { get; set; }
        public int CabinId { get; set; }
        public int CruiseTourTypeId { get; set; }
        public int People { get; set; }
        public decimal Price { get; set; }
        public decimal PromotionalPriceAdult { get; set; }
        public decimal PriceChild { get; set; }
        public decimal PromotionalPriceChild { get; set; }
        public decimal PriceInfant { get; set; }
        public decimal PromotionalPriceInfant { get; set; }
    
        public virtual CR_Cabin CR_Cabin { get; set; }
        public virtual CR_CruiseTourType CR_CruiseTourType { get; set; }
    }
}
