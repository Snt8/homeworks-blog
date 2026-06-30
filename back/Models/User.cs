using System.Text.Json.Serialization;

namespace back.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public int? CourseId { get; set; }
        [JsonIgnore]
        public Course? Course { get; set; }
    }
}
