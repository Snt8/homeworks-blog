using Microsoft.EntityFrameworkCore;
using back.Models;

namespace back.Data
{
    public class ApplicationDbContext : DbContext
{
    // Configuration
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {

    }
    // Set every entity in the system
    public DbSet<User> Users { get; set; }
    public DbSet<Course> Courses { get; set; }
    public DbSet<Homework> Homeworks { get; set; }
    public DbSet<Comment> Comments { get; set; }
    }
}