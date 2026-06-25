using back.Interfaces;
using back.Models;
using back.DTOs;
using back.Exceptions;
using back.Data;
using Microsoft.EntityFrameworkCore;
namespace back.Services
{
    public class HomeworkService : IHomeworkService
    {
        private readonly ApplicationDbContext _context;
        public HomeworkService(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Homework> CreateHomework(HomeworkDto homeworkDto)
        {
            //Creating the Homework model
            var homework = new Homework();
            //Assign the attributes value for the Homework DTO
            homework.Subject = homeworkDto.Subject;
            homework.Description = homeworkDto.Description;
            homework.DueDate = homeworkDto.DueDate;
            homework.CourseId = homeworkDto.CourseId;
            //Create the homework into database 
            _context.Homeworks.Add(homework);
            //Save the changes of the database
            await _context.SaveChangesAsync();
            return homework;
        }

        public async Task<Homework> UpdateHomework(int idHomework, HomeworkDto homeworkDto)
        {
            //Consult the homework in the database
            var homework = await _context.Homeworks.FirstOrDefaultAsync(h  => h.Id == idHomework);
            //Check if the homework exists
            if (homework == null)
            {
                throw new HomeworkNotFoundException("Homework not found into database");
            }
            //Assign the new homework data
            homework.Subject = homeworkDto.Subject;
            homework.Description = homeworkDto.Description;
            homework.DueDate = homeworkDto.DueDate;
            //Update the homework in the database
            _context.Homeworks.Update(homework);
            //Save the changes and return the homework updated
            await _context.SaveChangesAsync();
            return homework;
        }

        public async Task<List<Homework>> LookUpHomeworks(int courseId)
        {
            var homeworksList = await _context.Homeworks.Where(h => h.CourseId == courseId).ToListAsync();
            return homeworksList;
        }

        public async Task<Homework> DeleteHomework(int idHomework) 
        { 
            var homework = await _context.Homeworks.FirstOrDefaultAsync(h => h.Id == idHomework);
            //Check if the homework exists
            if(homework == null)
            {
                throw new HomeworkNotFoundException("The homework you are trying to delete does not exist");
            }
            //Delete the homework from the database
            _context.Homeworks.Remove(homework);
            //Save the changes and return the homework was removed
            await _context.SaveChangesAsync();
            return homework;
        }
    }
}
