using System.ComponentModel.DataAnnotations.Schema;

namespace back.Models
{
    public class Course
    {
        // Course unique identifier
        public int Id { get; set; }
        public string Name { get; set; }
        //Course creator 
        [ForeignKey("OwnerId")]
        public User Owner { get; set; }
        public int OwnerId { get; set; }
        // Homeworks assigned for the course
        public List<Homework> Homeworks { get; set; } = new List<Homework>();

    }
}
