using AerialView.Domain.Common;

namespace AerialView.Domain.Entities;

public class TextList : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    // Navigation properties
    public ICollection<TextListItem> Items { get; set; } = new List<TextListItem>();
    public ICollection<ReportColumn> ReportColumns { get; set; } = new List<ReportColumn>();
}

public class TextListItem : BaseEntity
{
    public int TextListId { get; set; }
    public string OriginalValue { get; set; } = string.Empty;
    public string TransformedValue { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
    
    // Navigation properties
    public TextList TextList { get; set; } = null!;
}
