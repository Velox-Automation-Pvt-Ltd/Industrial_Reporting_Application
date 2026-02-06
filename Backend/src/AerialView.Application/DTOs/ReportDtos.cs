namespace AerialView.Application.DTOs;

public class ReportDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DatabaseConnectionId { get; set; }
    public string DatabaseConnectionName { get; set; } = string.Empty;
    public string TableName { get; set; } = string.Empty;
    public string SqlQuery { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int RefreshInterval { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
    public List<ReportColumnDto> Columns { get; set; } = new();
}

public class CreateReportDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int DatabaseConnectionId { get; set; }
    public string TableName { get; set; } = string.Empty;
    public string SqlQuery { get; set; } = string.Empty;
    public string Type { get; set; } = "Tabular";
    public int RefreshInterval { get; set; } = 5000;
}

public class UpdateReportDto
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SqlQuery { get; set; } = string.Empty;
    public int RefreshInterval { get; set; }
    public bool IsActive { get; set; }
    public int DisplayOrder { get; set; }
}

public class ReportColumnDto
{
    public int Id { get; set; }
    public string ColumnName { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public bool IsVisible { get; set; }
    public int DisplayOrder { get; set; }
    public int DecimalPlaces { get; set; }
    public string DataType { get; set; } = string.Empty;
    public int Width { get; set; }
}

public class ReportDataResponse
{
    public List<Dictionary<string, object>> Data { get; set; } = new();
    public int TotalRecords { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages { get; set; }
}
