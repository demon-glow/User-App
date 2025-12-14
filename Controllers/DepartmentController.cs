using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotApp.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[Controller]")]
public class DepartmentController : ControllerBase {

    private readonly TestContext _context;
    public DepartmentController(TestContext context)
    {
        _context = context;
    }

    // to add a department
    [HttpPost]
    public async Task<IActionResult> AddDepartment(Department department) {
        _context.Departments.Add(department);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDepartments), new { id = department.Code }, department);
    }

    // to get all departments
    [HttpGet]
    public async Task<IActionResult> GetDepartments() {
        var departments = await _context.Departments.ToListAsync();
        return Ok(departments);
    }

    // to delete a Department
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSingleDepartment(int id) {
        var department = await _context.Departments.FindAsync(id);
        if (department==null) return NotFound();

        _context.Departments.Remove(department);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}