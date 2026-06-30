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
                var user = await _userService.RegisterUser(request);
                return CreatedAtAction(nameof(Register), user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //POST /api/users/login
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLoginDto request)
        {
            try
            {
                var user = await _userService.LoginUser(request);
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

        //PUT /api/users/{userId}/enroll/{courseId}
        [HttpPut("{userId}/enroll/{courseId}")]
        public async Task<ActionResult<User>> EnrollInCourse(int userId, int courseId)
        {
            try
            {
                var user = await _userService.RegisterCourseUser(userId, courseId);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (CourseNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (UserIsAlreadyInACourse ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //PUT /api/users/{userId}
        [HttpPut("{userId}")]
        public async Task<ActionResult<User>> UpdateUser(int userId, [FromBody] UserUpdateDto request)
        {
            try
            {
                var user = await _userService.UpdateUser(request, userId);
                return Ok(user);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        //DELETE /api/users/{userId}
        [HttpDelete("{userId}")]
        public async Task<ActionResult<DeletedUserDto>> DeleteUser(int userId)
        {
            try
            {
                var deletedUser = await _userService.DeleteUser(userId);
                return Ok(deletedUser);
            }
            catch (UserNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }
    }
}
