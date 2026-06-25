namespace back.DTOs
{
    public class HomeworkDto
    {
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public int CourseId { get; set; }

    }
}
