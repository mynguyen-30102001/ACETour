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
    
    public partial class T2_TourMenu
    {
        public int TourMenuId { get; set; }
        public int TourId { get; set; }
        public int MenuId { get; set; }
        public int Index { get; set; }
    
        public virtual T2_Tour T2_Tour { get; set; }
        public virtual W_Menu W_Menu { get; set; }
    }
}
