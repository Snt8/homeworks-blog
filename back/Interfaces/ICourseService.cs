using back.DTOs;
using back.Models;

namespace back.Interfaces
{
    public interface ICourseService
    {
        public Task<Course> CreateCourse(CourseDto courseDto);
        public Task<Course> GetCourseById(int courseId);
        public Task<List<Course>> GetAllCourses();
        public Task<Course> UpdateCourse(int courseId, int ownerId, CourseDto courseDto);  
        public Task<Course> DeleteCourse(int courseId, int ownerId);
    }
}
