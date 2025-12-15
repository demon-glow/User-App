using Microsoft.AspNetCore.Mvc;
using DotApp.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[Controller]")]
public class UserController : ControllerBase 
{
    private readonly TestContext _context;
    public UserController(TestContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetUsers() 
    {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) 
            return NotFound();
        
        return Ok(user);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddUser(User user) 
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditUser(int id, EditUserDto dto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            return NotFound("User not found");
        
        if (dto.Department.HasValue)
        {
            var departmentExists = await _context.Departments.AnyAsync(d => d.Code == dto.Department.Value);
            if (!departmentExists)
                return BadRequest("Invalid department code");
        }
        
        user.FirstName = dto.FirstName;
        user.LastName = dto.LastName;
        user.Email = dto.Email;
        user.Dob = dto.Dob;
        user.Age = dto.Age;
        user.Salary = dto.Salary;
        user.Department = dto.Department;
        
        await _context.SaveChangesAsync();
        return Ok(user);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSingleUser(int id) 
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null) 
            return NotFound();
        
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}

public class EditUserDto
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public DateOnly? Dob { get; set; }
    public int? Age { get; set; }
    public int? Salary { get; set; }
    public int? Department { get; set; }
}