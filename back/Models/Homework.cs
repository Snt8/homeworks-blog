namespace back.Models
{
    public class Homework
    {
        //Homework unique identifier
        public int Id { get; set; }
        public string Subject  { get; set; }
        public DateTime DueDate { get; set; }
        // Homework instructions
        public string Description { get; set; }
        // Course identifier
        public int CourseId { get; set; }
        // Course where homework is assigned
        public Course Course { get; set; }
        public List<Comment> Comments { get; set; }
    }
}
