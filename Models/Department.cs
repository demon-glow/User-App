using System;
using System.Collections.Generic;

namespace DotApp.Models;

public partial class Department
{
    public int Code { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
