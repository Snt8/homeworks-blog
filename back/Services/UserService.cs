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
    }
}
