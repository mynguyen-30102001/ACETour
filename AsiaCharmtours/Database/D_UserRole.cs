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
    
    public partial class D_UserRole
    {
        public int UserRoleId { get; set; }
        public string UserName { get; set; }
        public int RoleId { get; set; }
    
        public virtual D_Role D_Role { get; set; }
        public virtual D_User D_User { get; set; }
    }
}
