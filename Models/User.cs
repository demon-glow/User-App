using System;
using System.Collections.Generic;

namespace DotApp.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public DateOnly? Dob { get; set; }

    public int? Age { get; set; }

    public int? Salary { get; set; }

    public int? Department { get; set; }

    public virtual Department? DepartmentNavigation { get; set; }
}
