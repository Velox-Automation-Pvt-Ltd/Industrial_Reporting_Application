using AerialView.Domain.Common;
using AerialView.Domain.Enums;
namespace AerialView.Domain.Entities;

public class Tag : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string DataType { get; set; } = string.Empty;
    public string? Description { get; set; }
    public bool IsActive { get; set; } = true;
}

public class SqlTable : BaseEntity
{
    public int DatabaseConnectionId { get; set; }
    public string TableName { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime? LastSyncedAt { get; set; }
    
    // Navigation properties
    public DatabaseConnection DatabaseConnection { get; set; } = null!;
}

public class MenuSetting : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public string? Route { get; set; }
    public int? ParentId { get; set; }
    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
    
    // Navigation properties
    public MenuSetting? Parent { get; set; }
    public ICollection<MenuSetting> Children { get; set; } = new List<MenuSetting>();
}

public class ProjectSetting : BaseEntity
{
    public string ProjectName { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string? LogoPath { get; set; }
    public string LicenseKey { get; set; } = string.Empty;
    public DateTime? LicenseExpiryDate { get; set; }
    public int MaxUsers { get; set; }
    public int MaxReports { get; set; }
    public bool IsLicenseValid { get; set; } = true;
}

public class BatchPreview : BaseEntity
{
    public int ReportId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string TemplateFilePath { get; set; } = string.Empty;
    public string OutputPath { get; set; } = string.Empty;
    
    // Navigation properties
    public Report Report { get; set; } = null!;
}

public class GraphicalPreview : BaseEntity
{
    public int ReportId { get; set; }
    public string Name { get; set; } = string.Empty;
    public ChartType ChartType { get; set; }
    public string XAxisColumn { get; set; } = string.Empty;
    public string YAxisColumn { get; set; } = string.Empty;
    public string? SeriesColumn { get; set; }
    
    // Navigation properties
    public Report Report { get; set; } = null!;
}

public class LiveChart : BaseEntity
{
    public int ReportId { get; set; }
    public string Name { get; set; } = string.Empty;
    public ChartType ChartType { get; set; }
    public int RefreshInterval { get; set; } = 5000;
    public int MaxDataPoints { get; set; } = 100;
    
    // Navigation properties
    public Report Report { get; set; } = null!;
}
