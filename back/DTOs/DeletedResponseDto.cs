namespace back.DTOs
{
    public class DeletedResponseDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string Message { get; set; }
        public DateTime DeletedAt { get; set; }
    }
}
