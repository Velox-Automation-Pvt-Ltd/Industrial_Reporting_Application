namespace AerialView.Domain.Enums;

public enum UserRole
{
    Admin = 1,
    User = 2,
    Viewer = 3
}

public enum ReportType
{
    Tabular = 1,
    Graphical = 2,
    LiveChart = 3
}

public enum ChartType
{
    Column = 1,
    Bar = 2,
    Line = 3,
    Pie = 4,
    Area = 5,
    Scatter = 6
}

public enum ExportFormat
{
    PDF = 1,
    Excel = 2,
    CustomExcelTemplate = 3
}

public enum ExportFrequency
{
    Hourly = 1,
    Daily = 2,
    Weekly = 3,
    Monthly = 4
}

public enum DatabaseType
{
    SqlServer = 1,
    MySQL = 2,
    PostgreSQL = 3,
    Oracle = 4
}

public enum ConditionOperator
{
    Equal = 1,
    NotEqual = 2,
    GreaterThan = 3,
    LessThan = 4,
    GreaterThanOrEqual = 5,
    LessThanOrEqual = 6,
    Between = 7,
    Contains = 8
}

