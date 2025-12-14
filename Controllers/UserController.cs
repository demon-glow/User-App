using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using DotApp.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("[Controller]")]
public class UserController : ControllerBase {

    private readonly TestContext _context;
    public UserController(TestContext context)
    {
        _context = context;
    }

    // to add a user
    [HttpPost]
    public async Task<IActionResult> AddUser(User user) {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUsers), new { id = user.UserId }, user);
    }

    // to get al users
    [HttpGet]
    public async Task<IActionResult> GetUsers() {
        var users = await _context.Users.ToListAsync();
        return Ok(users);
    }

    // to delete a user
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSingleUser(int id) {
        var user = await _context.Users.FindAsync(id);
        if (user==null) return NotFound();

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}