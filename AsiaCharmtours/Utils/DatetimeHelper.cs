using System;
using System.Collections.Generic;

namespace AsiaCharmtours.Utils
{
    public class DatetimeHelper
    {
        public static DateTime DateTimeUTCNow()
        {
            DateTime utcDateTime = DateTime.UtcNow;
            string vnTimeZoneKey = "SE Asia Standard Time";
            TimeZoneInfo vnTimeZone = TimeZoneInfo.FindSystemTimeZoneById(vnTimeZoneKey);
            DateTime ngayhientai = DateTime.Parse(TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, vnTimeZone).ToString());
            return ngayhientai;
        }
    }
}