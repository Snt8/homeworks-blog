using System.Text.Json.Serialization;

namespace back.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public string Content { get; set; }
        public int HomeworkId { get; set; }
        [JsonIgnore]
        public Homework Homework { get; set; }
    }
}
