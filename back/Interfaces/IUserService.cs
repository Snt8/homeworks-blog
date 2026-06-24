using back.Models;
namespace back.Interfaces
{
    public interface IUserService
    {
        public Task<User> RegisterUser(string name, string lastname,  string email, string password);
        public Task<User> LoginUser(string email, string password); 
    }
}
