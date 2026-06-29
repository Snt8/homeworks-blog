namespace back.DTOs
{
    public class DeletedHomeworkDto : DeletedResponseDto
    {
        public string Description { get; set; }
        public int CourseId { get; set; }
    }
}
