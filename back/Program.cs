using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
//Database configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddOpenApi();

var app = builder.Build();
