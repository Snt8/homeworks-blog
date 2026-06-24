namespace back.Models
{
    public class UserClass
    {
        //Class unique identifier
        public int Id { get; set; }
        //Students registed in the class
        public List<User> Students { get; set; }
        //Homeworks assigned for the class
        public List<Homework> Homeworks { get; set; }

    }
}
