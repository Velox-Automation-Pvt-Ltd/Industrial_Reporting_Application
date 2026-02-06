using AerialView.Domain.Common;
using AerialView.Domain.Enums;

namespace AerialView.Domain.Entities;

public class ColorCondition : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public ConditionOperator Operator { get; set; }
    public string Value1 { get; set; } = string.Empty;
    public string? Value2 { get; set; }
    public string BackgroundColor { get; set; } = "#FFFFFF";
    public string TextColor { get; set; } = "#000000";
    public int Priority { get; set; }
    
    // Navigation properties
    public ICollection<ReportColumn> ReportColumns { get; set; } = new List<ReportColumn>();
}
