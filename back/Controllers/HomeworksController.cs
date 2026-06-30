using back.DTOs;
using back.Exceptions;
using back.Interfaces;
using back.Models;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeworksController : ControllerBase
    {
        private readonly IHomeworkService _homeworkService;
        public HomeworksController(IHomeworkService homeworkService)
        {
            _homeworkService = homeworkService;
        }

        //POST /api/homeworks/create
        [HttpPost("create")]
        public async Task<ActionResult<Homework>> Create([FromBody] HomeworkDto request)
        {
            try
            {
                var homework = await _homeworkService.CreateHomework(request);
                return CreatedAtAction(nameof(Create), new { id = homework.Id }, homework);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //PUT /api/homeworks/{homeworkId}
        [HttpPut("{homeworkId}")]
        public async Task<ActionResult<Homework>> Update(int homeworkId, [FromBody] HomeworkDto request)
        {
            try
            {
                var homeworkUpdated = await _homeworkService.UpdateHomework(homeworkId, request);
                return Ok(homeworkUpdated);
            }
            catch (HomeworkNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //GET api/homeworks/lookup?courseId={courseId}
        [HttpGet("lookup")]
        public async Task<ActionResult<List<Homework>>> LookUp([FromQuery] int courseId)
        {
            try
            {
                var homeworkList = await _homeworkService.LookUpHomeworks(courseId);
                return Ok(homeworkList);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //DELETE api/homeworks/delete?idHomework={idHomework}
        [HttpDelete("delete")]
        public async Task<ActionResult<DeletedHomeworkDto>> Delete([FromQuery] int idHomework)
        {
            try
            {
                var homeworkDeleted = await _homeworkService.DeleteHomework(idHomework);
                return Ok(homeworkDeleted);
            }
            catch (HomeworkNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
