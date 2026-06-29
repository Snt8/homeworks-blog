namespace back.DTOs
{
    public class DeletedCommentDto : DeletedResponseDto
    {
        public int AuthorId { get; set; }
        public int HomeworkId { get; set; }
    }
}
