namespace AerialView.Application.DTOs;

public class DatabaseConnectionDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Server { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public int Port { get; set; }
    public bool IsActive { get; set; }
    public DateTime? LastTestedAt { get; set; }
}

public class CreateDatabaseConnectionDto
{
    public string Name { get; set; } = string.Empty;
    public string Type { get; set; } = "SqlServer";
    public string Server { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int Port { get; set; } = 1433;
}

public class UpdateDatabaseConnectionDto
{
    public string Name { get; set; } = string.Empty;
    public string Server { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string? Password { get; set; }
    public int Port { get; set; }
    public bool IsActive { get; set; }
}

public class TestConnectionRequest
{
    public string Server { get; set; } = string.Empty;
    public string Database { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int Port { get; set; } = 1433;
    public string Type { get; set; } = "SqlServer";
}

public class TestConnectionResponse
{
    public bool IsSuccess { get; set; }
    public string Message { get; set; } = string.Empty;
}
