using BCrypt.Net;
using back.Interfaces;
namespace back.Services
{
    public class PasswordService : IPasswordService
    {
        private const int WorkFactor = 12;
        public string Hash(string password)
        {
            string hashPassword = BCrypt.Net.BCrypt.HashPassword(password, workFactor: WorkFactor); 
            return hashPassword;
        }
        public bool Verify(string password, string hashPassword)
        {
            bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(password, hashPassword);
            return isPasswordCorrect;
        }
    }
}
