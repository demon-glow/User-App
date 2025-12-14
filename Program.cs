using Microsoft.EntityFrameworkCore;
using DotApp.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TestContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowReactApp");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/users/all", async (TestContext db) =>
{
    return await db.Users.ToListAsync();
});

app.MapPost("/users/add", async (User user, TestContext db) =>
{
    db.Users.Add(user);
    await db.SaveChangesAsync();
    return Results.Created($"/users/add/{user.UserId}", user);
});

app.MapDelete("/users/delete/{id}", async (int id, TestContext db) =>
{
    var user = await db.Users.FindAsync(id);
    if (user == null) return Results.NotFound();
    db.Users.Remove(user);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.MapGet("/departments/all", async (TestContext db) =>
{
    return await db.Departments.ToListAsync();
});

app.MapPost("/departments/add", async (DepartmentDto departmentDto, TestContext db) =>
{
    var department = new Department 
    { 
        Code = departmentDto.Code, 
        Name = departmentDto.Name 
    };
    db.Departments.Add(department);
    await db.SaveChangesAsync();
    return Results.Created($"/departments/add/{department.Code}", department);
});

app.MapDelete("/departments/delete/{id}", async (int id, TestContext db) =>
{
    var department = await db.Departments.FindAsync(id);
    if (department == null) return Results.NotFound();
    db.Departments.Remove(department);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();