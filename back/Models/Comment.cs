namespace back.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User {  get; set; }
        public DateTime Date { get; set; }
        public string Content { get; set; }
        public int HomeworkId { get; set; }
        public Homework Homework { get; set; }

    }
}
