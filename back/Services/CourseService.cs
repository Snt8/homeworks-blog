using back.Data;
using back.DTOs;
using back.Interfaces;
using back.Models;
using back.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace back.Services
{
    public class CourseService : ICourseService
    {
        private readonly ApplicationDbContext _context;
        public CourseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Course> CreateCourse(CourseDto courseDto)
        {
            //Check if is not created a course with the name the client sent
            var courseWithSameName = await _context.Courses.Where(c => c.Name == courseDto.Name).FirstOrDefaultAsync();
            if (courseWithSameName != null)
            {
                throw new CourseSameNameException("Already exists a course with that name, please retry with another name");
            }
            //Consult the user request create the course
            var user = await _context.Users.Where(u => u.Id == courseDto.OwnerId).FirstOrDefaultAsync();
            if (user == null)
            {
                throw new UserNotFoundException("The user requested create the course is not found");
            }
            //Create the new course
            var course = new Course();
            //Assign the attributes values of the DTO in the model
            course.Name = courseDto.Name;
            course.Owner = user;
            //Add the new course in the database
            _context.Courses.Add(course);
            //Save the changes and return the course created
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course> GetCourseById(int courseId)
        {
            //Consult the course
            var course = await _context.Courses.Where(c => c.Id == courseId).FirstOrDefaultAsync();
            if(course == null)
            {
                throw new CourseNotFoundException("Course consulted is not found");
            }
            return course;
        }

        public async Task<List<Course>> GetAllCourses()
        {
            var courses = await _context.Courses.ToListAsync();
            return courses;
        }

        public async Task<Course> UpdateCourse(int courseId, int ownerId, CourseDto courseDto)
        {
            var course = await _context.Courses.Where(c => c.Id == courseId).FirstOrDefaultAsync();
            if(course == null)
            {
                throw new CourseNotFoundException("Course tried to update is not found");
            }
            if(course.OwnerId != ownerId)
            {
                throw new CourseWrongOwnerException("Only the owner can change this course");
            }
            if (course.Name == courseDto.Name)
            {
                throw new CourseSameNameException("The name is already used");
            }
            //Update the course
            course.Name = courseDto.Name;
            //Update and save the changes
            _context.Courses.Update(course);
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course> DeleteCourse(int courseId, int ownerId)
        {
            var course = await _context.Courses.Where(c => c.Id == courseId).FirstOrDefaultAsync();
            if(course == null)
            {
                throw new CourseNotFoundException("Course tried to delete is not found");
            }
            if(course.OwnerId != ownerId)
            {
                throw new CourseWrongOwnerException("Only the owner of this course can delete it");
            }
            //Delete the course and save the changes
            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            //Return the course deleted
            return course;
        }
    }
}
