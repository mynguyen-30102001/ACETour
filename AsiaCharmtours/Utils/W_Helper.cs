using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Mail;
using System.Text;
using System.Text.RegularExpressions;

namespace AsiaCharmtours.Utils
{
    public class ConfigEmail
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class W_Helper
    {
        public static string HeadSpecialString(int _level = 0)
        {
            if (_level > 0)
            {
                StringBuilder stringBuilder = new StringBuilder();
                for (int i = 0; i < _level; i++)
                    stringBuilder.Append("- ");
                return "|" + stringBuilder.ToString();
            }
            else
                return "";
        }
        public static string ConvertToUnSign(string _text)
        {
            for (int i = 33; i < 48; i++)
            {
                _text = _text.Replace(((char)i).ToString(), "");
            }
            for (int i = 58; i < 65; i++)
            {
                _text = _text.Replace(((char)i).ToString(), "");
            }
            for (int i = 91; i < 97; i++)
            {
                _text = _text.Replace(((char)i).ToString(), "");
            }
            for (int i = 123; i < 127; i++)
            {
                _text = _text.Replace(((char)i).ToString(), "");
            }
            _text = _text.Replace("  ", " ");
            Regex regex = new Regex(@"\p{IsCombiningDiacriticalMarks}+");
            string strFormD = _text.Normalize(System.Text.NormalizationForm.FormD);
            return regex.Replace(strFormD, String.Empty).Replace('\u0111', 'd').Replace('\u0110', 'D').ToLower();
        }
        public static string Currency(double _price)
        {
            CultureInfo cul = CultureInfo.GetCultureInfo("vi-VN");
            return _price.ToString("#,###", cul.NumberFormat);
        }

        public static bool SendMailGuest(ConfigEmail configEmail, string sendTo, string subject, string body, List<string> cc = null, List<string> bcc = null)
        {
            try
            {
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");
                // Mail send for Guest
                MailMessage mail = new MailMessage();
                mail.IsBodyHtml = true;
                mail.From = new MailAddress(configEmail.Email);
                mail.To.Add(sendTo);
                mail.Subject = subject;
                mail.Body = body;
                if (cc != null && cc.Count > 0)  
                {
                    cc.ForEach(x =>
                    {
                        if (x != "")
                            mail.CC.Add(x);
                    });
                }
                if (bcc != null && bcc.Count > 0)
                {
                    bcc.ForEach(x =>
                    {
                        if (x != "")
                            mail.Bcc.Add(x);
                    });
                }
                // Send
                SmtpServer.Port = 587;
                SmtpServer.Credentials = new System.Net.NetworkCredential(configEmail.Email, configEmail.Password);
                SmtpServer.EnableSsl = true;
                SmtpServer.Send(mail);
                return true;
            }
            catch (SmtpException e)
            {
                string s = e.Message;
                return false;
            }
        }
    }
}