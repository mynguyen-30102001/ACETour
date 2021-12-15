using System.Web.Mvc;

namespace AsiaCharmtours.Areas.CruiseManagement
{
    public class CruiseManagementAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "CruiseManagement";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
        }
    }
}