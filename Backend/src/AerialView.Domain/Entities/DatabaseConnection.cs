using AerialView.Domain.Common;
using AerialView.Domain.Enums;

namespace AerialView.Domain.Entities;

public class DatabaseConnection : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public DatabaseType Type { get; set; }
    public string Server { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int Port { get; set; }
    public string ConnectionString { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime? LastTestedAt { get; set; }
    
    // Navigation properties
    public ICollection<Report> Reports { get; set; } = new List<Report>();
}
