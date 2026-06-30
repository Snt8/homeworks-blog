using Microsoft.EntityFrameworkCore;
using back.Models;

namespace back.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Homework> Homeworks { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Course.Owner: OwnerId NOT NULL, restricts delete to avoid cycles
            modelBuilder.Entity<Course>()
                .HasOne(c => c.Owner)
                .WithMany()
                .HasForeignKey(c => c.OwnerId)
                .OnDelete(DeleteBehavior.Restrict);

            // User.Course: CourseId nullable, set null on course delete
            modelBuilder.Entity<User>()
                .HasOne(u => u.Course)
                .WithMany()
                .HasForeignKey(u => u.CourseId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}