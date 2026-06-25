using back.Models;
using back.DTOs;
namespace back.Interfaces
{
    public interface IHomeworkService
    {
        public Task<Homework> CreateHomework(HomeworkDto homeworkDto);
        public Task<Homework> UpdateHomework(int idHomework, HomeworkDto homeworkDto);
        public Task<List<Homework>> LookUpHomeworks(int courseId);
        public Task<Homework> DeleteHomework(int idHomework);
    }
}
