using back.Models;
using back.DTOs;
namespace back.Interfaces
{
    public interface IUserService
    {
        public Task<User> RegisterUser(UserRegisterDto userRegisterDto);
        public Task<User> LoginUser(UserLoginDto userLoginDto);
        public Task<User> RegisterCourseUser(int userId, int courseId);
        public Task<User> UpdateUser(UserUpdateDto userData, int userId);
        public Task<DeletedUserDto> DeleteUser(int userId);
    }
}
