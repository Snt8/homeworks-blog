using back.DTOs;
using back.Exceptions;
using back.Interfaces;
using back.Models;
using Microsoft.AspNetCore.Mvc;

namespace back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentService _commentService;
        public CommentsController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        //POST /api/comments/create
        [HttpPost("create")]
        public async Task<ActionResult<Comment>> Create([FromBody] CommentDto request)
        {
            try
            {
                var comment = await _commentService.CreateComment(request);
                return Ok(comment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        // GET /api/comments?homeworkId={homeworkId}
        [HttpGet]
        public async Task<ActionResult<List<Comment>>> GetAll([FromQuery] int homeworkId)
        {
            try
            {
                var comments = await _commentService.GetAllComments(homeworkId);
                return Ok(comments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //PUT /api/comments/update?commentId={commentId}
        [HttpPut("update")]
        public async Task<ActionResult<Comment>> Update([FromQuery] int commentId, [FromBody] CommentDto request)
        {
            try
            {
                var comment = await _commentService.UpdateComment(request, commentId);
                return Ok(comment);
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //DELETE /api/comments/delete?commentId={commentId}&authorId={authorId}
        [HttpDelete("delete")]
        public async Task<ActionResult<DeletedCommentDto>> Delete([FromQuery] int commentId, [FromQuery] int authorId)
        {
            try
            {
                var deleteStatus = await _commentService.DeleteComment(commentId, authorId);
                return Ok(deleteStatus);
            }
            catch (CommentNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (CommentWrongAuthorIdException ex)
            {
                return StatusCode(403, new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
