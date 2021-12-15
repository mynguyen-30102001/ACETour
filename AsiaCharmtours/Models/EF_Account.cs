using System.Collections.Generic;

namespace AsiaCharmtours.Models
{
    public class EF_Account
    {
        public string UserName { get; set; }
        public string PropertyName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public int RoleId { get; set; }
        public bool Status { get; set; }
        public List<int> Screens { get; set; }
        public List<int> Paths { get; set; }
    }
}