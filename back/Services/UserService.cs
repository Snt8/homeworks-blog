using back.Interfaces;
using back.Models;
using back.Exceptions;
using back.DTOs;
using Microsoft.EntityFrameworkCore;
using back.Data;
using System.Security.Cryptography.X509Certificates;
namespace back.Services
{
    public class UserService : IUserService
    {
        private readonly IPasswordService _passwordService;
        private readonly ApplicationDbContext _context;
        private const int withoutCourseUserId = 0;
        public UserService(IPasswordService passwordService, ApplicationDbContext context) { 
            _passwordService = passwordService;
            _context = context;
        }
        public async Task<User> RegisterUser(UserRegisterDto userRegisterDto)
        {
            //Create the user's model
            var user = new User
            {
                Name = userRegisterDto.Name,
                Lastname = userRegisterDto.Lastname,
                Email = userRegisterDto.Email,
                PasswordHash = _passwordService.Hash(userRegisterDto.Password)
            };

            //Add to the Data Base
            _context.Users.Add(user);
            //Save the changes
            await _context.SaveChangesAsync();

            //Do not return the password hash for security
            user.PasswordHash = null;
            //Return the user created
            return user;
        }

        public async Task<User> LoginUser(UserLoginDto userLoginDto)
        {
            //Get the user from the Data Base
            var userDatabase = await _context.Users.FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);

            //Check if the user exists
            if (userDatabase == null)
                throw new UserNotFoundException("User not found");

            //Verify the password
            bool correctPassword = _passwordService.Verify(userLoginDto.Password, userDatabase.PasswordHash);
            if (!correctPassword)
                throw new UserIncorrectPasswordException("Incorrect password");

            //Return the user without the password hash for security
            return new User
            {
                Id = userDatabase.Id,
                Name = userDatabase.Name,
                Lastname = userDatabase.Lastname,
                Email = userDatabase.Email
            };
        }

        public async Task<User> RegisterCourseUser(int userId, int courseId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            var course = await _context.Courses.Where(c => c.Id == courseId).FirstOrDefaultAsync();
            if(user == null)
            {
                throw new UserNotFoundException("User is not found");
            }
            if(course == null)
            {
                throw new CourseNotFoundException("Course is not found");
            }
            //Check if the user is already in a course
            if(user.CourseId != withoutCourseUserId)
            {
                throw new UserIsAlreadyInACourse("User is already in a course");
            }

            user.Course = course;
            user.CourseId = course.Id;
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> UpdateUser(UserUpdateDto userData, int userId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if(user == null)
            {
                throw new UserNotFoundException("User is not found");
            }
            //Verify attributes the user could change
            if (!string.IsNullOrEmpty(userData.Name))
            {
                user.Name = userData.Name;
            }
            if (!string.IsNullOrEmpty(userData.LastName))
            {
                user.Lastname = userData.LastName;
            }
            if (!string.IsNullOrEmpty(userData.Email))
            {
                user.Email = userData.Email;
            }
            if (!string.IsNullOrEmpty(userData.Password))
            {
                var newPassword = _passwordService.Hash(userData.Password);
                user.PasswordHash = newPassword;
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            user.PasswordHash = null;
            return user;
        }

        public async Task<bool> DeleteUser(int userId)
        {
            var user = await _context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync();
            if(user == null)
            {
                throw new UserNotFoundException("User is not found");
            }
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
