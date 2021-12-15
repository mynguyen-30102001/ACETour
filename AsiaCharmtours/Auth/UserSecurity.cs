using AsiaCharmtours.Database;
using AsiaCharmtours.Utils;
using System.Linq;

namespace AsiaCharmtours.Auth
{
    public class UserSecurity
    {
        public static bool CheckLogin(string _userName, string _passWord)
        {
            using (var db = new DB())
            {
                string passMD5 = Encode.MD5(_passWord);
                return db.D_UserMembership
                        .Any(x => x.UserName.Equals(_userName) &&
                                x.Password.Equals(passMD5));
            }
        }
    }
}