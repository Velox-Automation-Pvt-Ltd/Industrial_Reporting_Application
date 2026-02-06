using AerialView.Domain.Common;

namespace AerialView.Domain.Entities;

public class UserPermission : BaseEntity
{
    public int UserId { get; set; }
    public string PermissionName { get; set; } = string.Empty;
    public bool CanCreate { get; set; }
    public bool CanRead { get; set; }
    public bool CanUpdate { get; set; }
    public bool CanDelete { get; set; }
    
    // Navigation properties
    public User User { get; set; } = null!;
}
