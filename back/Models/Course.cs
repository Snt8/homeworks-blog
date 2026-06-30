using System.Text.Json.Serialization;

namespace back.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int OwnerId { get; set; }
        [JsonIgnore]
        public User Owner { get; set; }
        [JsonIgnore]
        public List<Homework> Homeworks { get; set; } = new List<Homework>();
    }
}
