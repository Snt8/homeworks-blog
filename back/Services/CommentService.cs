using back.Data;
using back.DTOs;
using back.Interfaces;
using back.Models;
using back.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace back.Services
{
    public class CommentService : ICommentService
    {
        private readonly ApplicationDbContext _context;
        public CommentService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Comment> CreateComment(CommentDto commentDto)
        {
            var comment = new Comment();
            //Assign the attributes values from the DTO
            comment.Content = commentDto.Content;
            comment.HomeworkId = commentDto.HomeworkId;
            comment.UserId = commentDto.UserId;
            //Create the comment into database and save changes
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<List<Comment>> GetAllComments(int homeworkId)
        {
            var comments = await _context.Comments.Where(c => c.HomeworkId == homeworkId).ToListAsync();
            return comments;
        }

        public async Task<Comment> UpdateComment(CommentDto commentDto, int commentId) 
        {
            var comment = await _context.Comments.Where(c => c.Id == commentId).FirstOrDefaultAsync();
            if(comment == null)
            {
                throw new CommentNotFoundException("The comment you are trying to update does not exist");
            }
            //Update comment content
            comment.Content = commentDto.Content;
            _context.Comments.Update(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<bool> DeleteComment(int commentId, int authorId)
        {
            var comment = await _context.Comments.Where(c => c.Id == commentId).FirstOrDefaultAsync();
            if(comment == null)
            {
                throw new CommentNotFoundException("The comment tried to delete is not found");
            }
            if(comment.UserId != authorId)
            {
                throw new CommentWrongAuthorIdException("You cannot delete this comment because is not yours");
            }
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
