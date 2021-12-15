using System.Web.Mvc;

namespace AsiaCharmtours.Areas.HotelManagement
{
    public class HotelManagementAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "HotelManagement";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
        }
    }
}