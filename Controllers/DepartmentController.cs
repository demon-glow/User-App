using Microsoft.AspNetCore.Mvc;
using DotApp.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[Controller]")]
public class DepartmentController : ControllerBase 
{
    private readonly TestContext _context;
    public DepartmentController(TestContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetDepartments() 
    {
        var departments = await _context.Departments.ToListAsync();
        return Ok(departments);
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDepartment(int id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null) 
            return NotFound();
        
        return Ok(department);
    }
    
    [HttpPost]
    public async Task<IActionResult> AddDepartment(DepartmentDto departmentDto) 
    {
        var department = new Department 
        { 
            Code = departmentDto.Code, 
            Name = departmentDto.Name 
        };
        
        _context.Departments.Add(department);
        await _context.SaveChangesAsync();
        
        return CreatedAtAction(nameof(GetDepartment), new { id = department.Code }, department);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> EditDepartment(int id, EditDepartmentDto dto)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null)
            return NotFound("Department not found");
        
        if (dto.Code != id)
        {
            var codeExists = await _context.Departments.AnyAsync(d => d.Code == dto.Code);
            if (codeExists)
                return Conflict("Department code already exists");
        }
        
        department.Code = dto.Code;
        department.Name = dto.Name;
        
        await _context.SaveChangesAsync();
        return Ok(department);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDepartment(int id) 
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null) 
            return NotFound();
        
        var hasUsers = await _context.Users.AnyAsync(u => u.Department == id);
        if (hasUsers)
            return BadRequest("Cannot delete department because users are assigned to it.");
        
        _context.Departments.Remove(department);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}