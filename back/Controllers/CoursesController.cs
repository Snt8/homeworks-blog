using back.DTOs;
using back.Interfaces;
using back.Models;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;
        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        // POST /api/courses/create
        [HttpPost("create")]
        public async Task<ActionResult<Course>> Create([FromBody] CourseDto request)
        {
            try
            {
                var course = await _courseService.CreateCourse(request);
                return CreatedAtAction(nameof(GetById), new { courseId = course.Id }, course);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET /api/courses/{courseId}
        [HttpGet("{courseId}")]
        public async Task<ActionResult<Course>> GetById(int courseId)
        {
            try
            {
                var course = await _courseService.GetCourseById(courseId);
                return Ok(course);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // GET /api/courses
        [HttpGet]
        public async Task<ActionResult<List<Course>>> GetAll()
        {
            try
            {
                var courses = await _courseService.GetAllCourses();
                return Ok(courses);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT /api/courses/{courseId}
        [HttpPut("{courseId}")]
        public async Task<ActionResult<Course>> Update(int courseId, [FromQuery] int ownerId, [FromBody] CourseDto request)
        {
            try
            {
                var updated = await _courseService.UpdateCourse(courseId, ownerId, request);
                return Ok(updated);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE /api/courses/{courseId}
        [HttpDelete("{courseId}")]
        public async Task<ActionResult<Course>> Delete(int courseId, [FromQuery] int ownerId)
        {
            try
            {
                var deleted = await _courseService.DeleteCourse(courseId, ownerId);
                return Ok(deleted);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
