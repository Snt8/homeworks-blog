namespace back.Models
{
    public class User
    {
        //User unique identifier
        public int Id { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        // User's course
        public int CourseId { get; set; }
        public Course Course { get; set; }

    }
}
