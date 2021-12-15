using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AsiaCharmtours.Models
{
    public class ShowObject
    {
        public string TourName { get; set; }
        public string CruiseName { get; set; }
        public string TourAlias { get; set; }
        public string CruiseAlias { get; set; }
        public string MenuAlias { get; set; }
        public string MenuAliasCruise { get; set; }
        public string Image { get; set; }
        public string ImageTour { get; set; }
        public double ExcellentTour { get; set; }
        public double ExcellentCruise { get; set; }
        public int ReviewTour { get; set; }
        public int ReviewCruise { get; set; }
        public string DescriptionTour { get; set; }
        public string DescriptionCruise { get; set; }
        public double PriceTour { get; set; }
        public double PriceCruise { get; set; }
        public int SlideId { get; set; }
        public string Title { get; set; }
    }
}