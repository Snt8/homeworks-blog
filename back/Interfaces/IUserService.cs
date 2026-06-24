using back.Models;
using back.DTOs;
namespace back.Interfaces
{
    public interface IUserService
    {
        public Task<User> RegisterUser(UserRegisterDto userRegisterDto);
        public Task<User> LoginUser(UserLoginDto userLoginDto);
    }
}
