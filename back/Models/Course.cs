namespace back.Models
{
    public class Course
    {
        // Course unique identifier
        public int Id { get; set; }
        public string Name { get; set; }
        //Course creator 
        public User Owner { get; set; }
        public int OwnerId { get; set; }
        // Students registered in the course
        public List<User> Students { get; set; } = new List<User>();
        // Homeworks assigned for the course
        public List<Homework> Homeworks { get; set; } = new List<Homework>();

    }
}
