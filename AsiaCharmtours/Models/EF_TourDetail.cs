using AsiaCharmtours.Database;
using System.Collections.Generic;

namespace AsiaCharmtours.Models
{
    public class EF_TourDetail
    {
        public int TourId { get; set; }
        public string MenuAlias { get; set; }
        public string Image { get; set; }
        public string TourName { get; set; }
        public string TourAlias { get; set; }
        public string TourGallery { get; set; }
        public string Highlights { get; set; }
        public string Overview { get; set; }
        public int NumberDay { get; set; }
        public string Destination { get; set; }
        public string Description { get; set; }
        public string Meals { get; set; }
        public string Transportation { get; set; }
        public string Accommodation { get; set; }
        public string PriceIncludes { get; set; }
        public string PriceExcludes { get; set; }
        public string Cancellation { get; set; }
        public string Policy { get; set; }
        public string Note { get; set; }
        public double PricePromotion { get; set; }
        public double Price { get; set; }
        public string PromotionTitle { get; set; }
        public string PromotionContent { get; set; }


        public List<T2_TourShortJourney> T2_TourShortJourney { get; set; }
        public List<T2_TourJourney> T2_TourJourney { get; set; }
        public EF_TourPrice EF_TourPrice { get; set; }
    }
}