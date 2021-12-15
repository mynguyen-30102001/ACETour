using System.Collections.Generic;

namespace AsiaCharmtours.Models
{
    public class EF_TourRoomTypePrice
    {
        public int TourRoomTypeId { get; set; }
        public int TourTypeGroupId { get; set; }
        public double Price { get; set; }
        public double PromotionalPrice { get; set; }
        public double PriceChild { get; set; }
        public double PriceInfant { get; set; }
    }
    public class EF_TourTypeGroup
    {
        public int TourTypeGroupId { get; set; }
        public string TourTypeGroupName { get; set; }
        public bool Checked { get; set; }
    }
    public class EF_TourRoomType
    {
        public int TourRoomTypeId { get; set; }
        public int TourRoomTypePriceId { get; set; }
        public string TourRoomTypeName { get; set; }
        public bool Checked { get; set; }
        public string Description { get; set; }
        public List<EF_TourRoomTypePrice> EF_TourRoomTypePrice { get; set; }
    }
    public class EF_TourPrice
    {
        public int TourId { get; set; }
        public bool PriceContact { get; set; }
        public List<EF_TourRoomType> EF_TourRoomType { get; set; }
        public List<EF_TourTypeGroup> EF_TourTypeGroup { get; set; }
    }
}