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
    
    public partial class D_RolePath
    {
        public int D_RolePathId { get; set; }
        public int RoleId { get; set; }
        public int PathId { get; set; }
    
        public virtual D_Path D_Path { get; set; }
        public virtual D_Role D_Role { get; set; }
    }
}
