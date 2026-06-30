namespace back.DTOs
{
    public class DeletedUserDto : DeletedResponseDto
    {
        public string LastName { get; set; }
        public string Email { get; set; }
        public int? CourseId { get; set; }
    }
}
