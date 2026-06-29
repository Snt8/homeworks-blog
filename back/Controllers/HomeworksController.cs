using back.DTOs;
using back.Interfaces;
using back.Models;
using back.Services;
using Microsoft.AspNetCore.Mvc;
namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeworksController : ControllerBase
    {
        //Homework service instance 
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
                //Call the service method to create a new homework and return the result
                var homework = await _homeworkService.CreateHomework(request);
                return CreatedAtAction(nameof(Create), new { id = homework.Id }, homework);
            }

            catch (Exception ex) 
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //PUT /api/homeworks/update
        [HttpPut("{homeworkId}")]
        public async Task<ActionResult<Homework>> Update(int homeworkId, [FromBody] HomeworkDto request)
        {
            try
            {
                //Call the update method from the homework service
                var homeworkUpdated = await _homeworkService.UpdateHomework(homeworkId, request);
                return Ok(homeworkUpdated);
            }

            catch (Exception ex)
            {
                return BadRequest(new {message = ex.Message});
            }
        }
        
        //GET api/homeworks/lookup
        [HttpGet("lookup")]
        public async Task<ActionResult<List<Homework>>> LookUp([FromQuery] int courseId)
        {
            try
            {
                //Look up the homeworks in a specific course
                var homeworkList = await _homeworkService.LookUpHomeworks(courseId);
                return Ok(homeworkList);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        //DELETE api/homeworks/delete
        [HttpDelete("delete")]
        public async Task<ActionResult<DeletedHomeworkDto>> Delete([FromQuery] int idHomework)
        {
            try
            {
                //Call the delete method from the homework service
                var homeworkDeleted = await _homeworkService.DeleteHomework(idHomework);
                return Ok(homeworkDeleted);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        } 
        
    }
}
