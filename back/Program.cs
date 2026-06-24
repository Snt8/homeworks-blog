using Microsoft.EntityFrameworkCore;
using back.Data;
using back.Interfaces;
using back.Services;

var builder = WebApplication.CreateBuilder(args);

//Database configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

//Services registration (Dependency Injection)
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPasswordService, PasswordService>();

//Add Controllers support
builder.Services.AddControllers();

//CORS configuration for frontend communication
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

//API documentation
builder.Services.AddOpenApi();

var app = builder.Build();

//Middleware configuration
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthorization();

//Map controller routes
app.MapControllers();

app.Run();
