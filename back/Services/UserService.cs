using back.Interfaces;
using back.Models;
using back.Exceptions;
using Microsoft.EntityFrameworkCore;
using back.Data;
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
        public async Task<User> RegisterUser(string name, string lastname, string email, string password)
        {
            //Create the user's model
            var user = new User
            {
                Name = name,
                Lastname = lastname,
                Email = email,
                PasswordHash = _passwordService.Hash(password)
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

        public async Task<User> LoginUser(string email, string password)
        {
            //Get the user from the Data Base
            var userDatabase = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            //Check if the user exists
            if (userDatabase == null)
                throw new UserNotFoundException("User not found");

            //Verify the password
            bool correctPassword = _passwordService.Verify(password, userDatabase.PasswordHash);
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
