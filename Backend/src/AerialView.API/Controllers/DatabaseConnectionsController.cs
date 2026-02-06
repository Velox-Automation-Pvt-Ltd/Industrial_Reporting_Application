using AerialView.Application.DTOs;
using AerialView.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace AerialView.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class DatabaseConnectionsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<DatabaseConnectionsController> _logger;

    public DatabaseConnectionsController(ApplicationDbContext context, ILogger<DatabaseConnectionsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<DatabaseConnectionDto>>> GetAllConnections()
    {
        try
        {
            var connections = await _context.DatabaseConnections
                .Where(c => !c.IsDeleted)
                .Select(c => new DatabaseConnectionDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Type = c.Type.ToString(),
                    Server = c.Server,
                    Database = c.Database,
                    Username = c.Username,
                    Port = c.Port,
                    IsActive = c.IsActive,
                    LastTestedAt = c.LastTestedAt
                })
                .ToListAsync();

            return Ok(connections);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving database connections");
            return StatusCode(500, new { message = "An error occurred while retrieving connections" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DatabaseConnectionDto>> GetConnection(int id)
    {
        try
        {
            var connection = await _context.DatabaseConnections
                .Where(c => c.Id == id && !c.IsDeleted)
                .Select(c => new DatabaseConnectionDto
                {
                    Id = c.Id,
                    Name = c.Name,
                    Type = c.Type.ToString(),
                    Server = c.Server,
                    Database = c.Database,
                    Username = c.Username,
                    Port = c.Port,
                    IsActive = c.IsActive,
                    LastTestedAt = c.LastTestedAt
                })
                .FirstOrDefaultAsync();

            if (connection == null)
            {
                return NotFound(new { message = "Connection not found" });
            }

            return Ok(connection);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving connection {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the connection" });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<DatabaseConnectionDto>> CreateConnection([FromBody] CreateDatabaseConnectionDto dto)
    {
        try
        {
            var connectionString = BuildConnectionString(dto);

            var connection = new Domain.Entities.DatabaseConnection
            {
                Name = dto.Name,
                Type = Enum.Parse<Domain.Enums.DatabaseType>(dto.Type),
                Server = dto.Server,
                Database = dto.Database,
                Username = dto.Username,
                Password = dto.Password, // In production, encrypt this
                Port = dto.Port,
                ConnectionString = connectionString,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.DatabaseConnections.Add(connection);
            await _context.SaveChangesAsync();

            var connectionDto = new DatabaseConnectionDto
            {
                Id = connection.Id,
                Name = connection.Name,
                Type = connection.Type.ToString(),
                Server = connection.Server,
                Database = connection.Database,
                Username = connection.Username,
                Port = connection.Port,
                IsActive = connection.IsActive
            };

            return CreatedAtAction(nameof(GetConnection), new { id = connection.Id }, connectionDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating database connection");
            return StatusCode(500, new { message = "An error occurred while creating the connection" });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("test")]
    public async Task<ActionResult<TestConnectionResponse>> TestConnection([FromBody] TestConnectionRequest request)
    {
        try
        {
            var connectionString = BuildConnectionString(request);

            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            await connection.CloseAsync();

            return Ok(new TestConnectionResponse
            {
                IsSuccess = true,
                Message = "Connection successful"
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Connection test failed");
            return Ok(new TestConnectionResponse
            {
                IsSuccess = false,
                Message = $"Connection failed: {ex.Message}"
            });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateConnection(int id, [FromBody] UpdateDatabaseConnectionDto dto)
    {
        try
        {
            var connection = await _context.DatabaseConnections.FindAsync(id);
            if (connection == null || connection.IsDeleted)
            {
                return NotFound(new { message = "Connection not found" });
            }

            connection.Name = dto.Name;
            connection.Server = dto.Server;
            connection.Database = dto.Database;
            connection.Username = dto.Username;
            if (!string.IsNullOrEmpty(dto.Password))
            {
                connection.Password = dto.Password;
            }
            connection.Port = dto.Port;
            connection.IsActive = dto.IsActive;
            connection.UpdatedAt = DateTime.UtcNow;

            connection.ConnectionString = BuildConnectionString(connection);

            await _context.SaveChangesAsync();

            return Ok(new { message = "Connection updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating connection {Id}", id);
            return StatusCode(500, new { message = "An error occurred while updating the connection" });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteConnection(int id)
    {
        try
        {
            var connection = await _context.DatabaseConnections.FindAsync(id);
            if (connection == null || connection.IsDeleted)
            {
                return NotFound(new { message = "Connection not found" });
            }

            connection.IsDeleted = true;
            connection.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Connection deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting connection {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the connection" });
        }
    }

    private string BuildConnectionString(dynamic dto)
    {
        return $"Server={dto.Server},{dto.Port};Database={dto.Database};User Id={dto.Username};Password={dto.Password};TrustServerCertificate=True";
    }

    private string BuildConnectionString(Domain.Entities.DatabaseConnection connection)
    {
        return $"Server={connection.Server},{connection.Port};Database={connection.Database};User Id={connection.Username};Password={connection.Password};TrustServerCertificate=True";
    }
}
