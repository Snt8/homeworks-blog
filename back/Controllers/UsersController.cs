using back.Interfaces;
using back.Models;
using back.DTOs;
using back.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        //POST /api/users/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register([FromBody] UserRegisterDto request)
        {
            try
            {
                var user = await _userService.RegisterUser(request.Name, request.Lastname, request.Email, request.Password);
                return CreatedAtAction(nameof(Register), user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //POST /api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLoginDto request)
        {
            try
            {
                var user = await _userService.LoginUser(request.Email, request.Password);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (UserIncorrectPasswordException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
        }
    }
}
