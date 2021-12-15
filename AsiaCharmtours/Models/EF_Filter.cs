using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class EF_Filter
    {
        public string Destination { get; set; }
        public DateTime Departure { get; set; }
        public int Duration { get; set; }
        public int XType { get; set; }
        public int PriceValue { get; set; }
        public int DurationTour { get; set; }
        public string NameHotel { get; set; }
        public int Night { get; set; }
        public int[] Stars { get; set; }
        public int[] themes { get; set; }
        public int[] travels { get; set; }
        public int sort { get; set; }
        public string MenuAlias { get; set; }
    }
}