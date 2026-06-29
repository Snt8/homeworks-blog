using back.DTOs;
using back.Models;

namespace back.Interfaces
{
    public interface ICommentService
    {
        public Task<Comment> CreateComment(CommentDto commentDto);
        public Task<List<Comment>> GetAllComments(int homeworkId);
        public Task<Comment> UpdateComment(CommentDto commentDto, int commentId);
        public Task<DeletedCommentDto> DeleteComment(int commentId, int authorId);
    }
}
