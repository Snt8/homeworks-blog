using System.Text.Json.Serialization;

namespace back.Models
{
    public class Homework
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public DateTime DueDate { get; set; }
        public string Description { get; set; }
        public int CourseId { get; set; }
        [JsonIgnore]
        public Course Course { get; set; }
        [JsonIgnore]
        public List<Comment> Comments { get; set; }
    }
}
