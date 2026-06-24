namespace back.Models
{
    public class Course
    {
        // Course unique identifier
        public int Id { get; set; }
        // Students registered in the course
        public List<User> Students { get; set; }
        // Homeworks assigned for the course
        public List<Homework> Homeworks { get; set; }

    }
}
