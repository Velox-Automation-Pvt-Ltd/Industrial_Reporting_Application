using AerialView.Domain.Common;
using AerialView.Domain.Enums;

namespace AerialView.Domain.Entities;

public class AutoExportConfig : BaseEntity
{
    public int ReportId { get; set; }
    public string Name { get; set; } = string.Empty;
    public ExportFrequency Frequency { get; set; }
    public ExportFormat Format { get; set; }
    public string? TemplateFilePath { get; set; }
    public string OutputPath { get; set; } = string.Empty;
    public string FileNamePattern { get; set; } = string.Empty;
    public bool SendEmail { get; set; }
    public string? EmailSubject { get; set; }
    public string? EmailBody { get; set; }
    public string? EmailRecipients { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? LastExecutedAt { get; set; }
    public DateTime? NextExecutionAt { get; set; }
    
    // Navigation properties
    public Report Report { get; set; } = null!;
    public ICollection<AutoExportLog> Logs { get; set; } = new List<AutoExportLog>();
}

public class AutoExportLog : BaseEntity
{
    public int AutoExportConfigId { get; set; }
    public DateTime ExecutedAt { get; set; }
    public bool IsSuccess { get; set; }
    public string? ErrorMessage { get; set; }
    public string? OutputFilePath { get; set; }
    public int RecordCount { get; set; }
    
    // Navigation properties
    public AutoExportConfig AutoExportConfig { get; set; } = null!;
}
