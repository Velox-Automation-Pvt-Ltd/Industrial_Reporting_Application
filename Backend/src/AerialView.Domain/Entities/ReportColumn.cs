using AerialView.Domain.Common;

namespace AerialView.Domain.Entities;

public class ReportColumn : BaseEntity
{
    public int ReportId { get; set; }
    public string ColumnName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsVisible { get; set; } = true;
    public int DisplayOrder { get; set; }
    public int DecimalPlaces { get; set; } = 2;
    public int? ColorConditionId { get; set; }
    public int? TextListId { get; set; }
    public string DataType { get; set; } = string.Empty;
    public int Width { get; set; } = 100;
    
    // Navigation properties
    public Report Report { get; set; } = null!;
    public ColorCondition? ColorCondition { get; set; }
    public TextList? TextList { get; set; }
}
