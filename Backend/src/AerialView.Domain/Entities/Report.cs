using AerialView.Domain.Common;
using AerialView.Domain.Enums;

namespace AerialView.Domain.Entities;

public class Report : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DatabaseConnectionId { get; set; }
    public string TableName { get; set; } = string.Empty;
    public string SqlQuery { get; set; } = string.Empty;
    public ReportType Type { get; set; }
    public int RefreshInterval { get; set; } = 5000; // milliseconds
    public bool IsActive { get; set; } = true;
    public int DisplayOrder { get; set; }
    
    // Navigation properties
    public DatabaseConnection DatabaseConnection { get; set; } = null!;
    public ICollection<ReportColumn> Columns { get; set; } = new List<ReportColumn>();
    public ICollection<AutoExportConfig> AutoExportConfigs { get; set; } = new List<AutoExportConfig>();
}
