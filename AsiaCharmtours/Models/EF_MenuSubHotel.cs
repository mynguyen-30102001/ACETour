using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_MenuSubHotel
    {
        public string MenuName { get; set; }
        public string MenuAlias { get; set; }
        public int NumberHotel { get; set; }
        public bool Highlight { get; set; }
        public string Photo { get; set; }
    }
}