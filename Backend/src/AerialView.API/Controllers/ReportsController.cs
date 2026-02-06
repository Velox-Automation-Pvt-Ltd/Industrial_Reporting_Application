using AerialView.Application.DTOs;
using AerialView.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AerialView.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<ReportsController> _logger;

    public ReportsController(ApplicationDbContext context, ILogger<ReportsController> logger)
    {
        _context = context;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ReportDto>>> GetAllReports()
    {
        try
        {
            var reports = await _context.Reports
                .Include(r => r.DatabaseConnection)
                .Include(r => r.Columns)
                .Where(r => !r.IsDeleted)
                .Select(r => new ReportDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    DatabaseConnectionId = r.DatabaseConnectionId,
                    DatabaseConnectionName = r.DatabaseConnection.Name,
                    TableName = r.TableName,
                    SqlQuery = r.SqlQuery,
                    Type = r.Type.ToString(),
                    RefreshInterval = r.RefreshInterval,
                    IsActive = r.IsActive,
                    DisplayOrder = r.DisplayOrder,
                    Columns = r.Columns.Select(c => new ReportColumnDto
                    {
                        Id = c.Id,
                        ColumnName = c.ColumnName,
                        DisplayName = c.DisplayName,
                        IsVisible = c.IsVisible,
                        DisplayOrder = c.DisplayOrder,
                        DecimalPlaces = c.DecimalPlaces,
                        DataType = c.DataType,
                        Width = c.Width
                    }).ToList()
                })
                .ToListAsync();

            return Ok(reports);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving reports");
            return StatusCode(500, new { message = "An error occurred while retrieving reports" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ReportDto>> GetReport(int id)
    {
        try
        {
            var report = await _context.Reports
                .Include(r => r.DatabaseConnection)
                .Include(r => r.Columns)
                .Where(r => r.Id == id && !r.IsDeleted)
                .Select(r => new ReportDto
                {
                    Id = r.Id,
                    Name = r.Name,
                    Description = r.Description,
                    DatabaseConnectionId = r.DatabaseConnectionId,
                    DatabaseConnectionName = r.DatabaseConnection.Name,
                    TableName = r.TableName,
                    SqlQuery = r.SqlQuery,
                    Type = r.Type.ToString(),
                    RefreshInterval = r.RefreshInterval,
                    IsActive = r.IsActive,
                    DisplayOrder = r.DisplayOrder,
                    Columns = r.Columns.Select(c => new ReportColumnDto
                    {
                        Id = c.Id,
                        ColumnName = c.ColumnName,
                        DisplayName = c.DisplayName,
                        IsVisible = c.IsVisible,
                        DisplayOrder = c.DisplayOrder,
                        DecimalPlaces = c.DecimalPlaces,
                        DataType = c.DataType,
                        Width = c.Width
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (report == null)
            {
                return NotFound(new { message = "Report not found" });
            }

            return Ok(report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving report {Id}", id);
            return StatusCode(500, new { message = "An error occurred while retrieving the report" });
        }
    }

    [Authorize(Roles = "Admin,User")]
    [HttpPost]
    public async Task<ActionResult<ReportDto>> CreateReport([FromBody] CreateReportDto dto)
    {
        try
        {
            var report = new Domain.Entities.Report
            {
                Name = dto.Name,
                Description = dto.Description,
                DatabaseConnectionId = dto.DatabaseConnectionId,
                TableName = dto.TableName,
                SqlQuery = dto.SqlQuery,
                Type = Enum.Parse<Domain.Enums.ReportType>(dto.Type),
                RefreshInterval = dto.RefreshInterval,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            var reportDto = new ReportDto
            {
                Id = report.Id,
                Name = report.Name,
                Description = report.Description,
                DatabaseConnectionId = report.DatabaseConnectionId,
                TableName = report.TableName,
                SqlQuery = report.SqlQuery,
                Type = report.Type.ToString(),
                RefreshInterval = report.RefreshInterval,
                IsActive = report.IsActive,
                DisplayOrder = report.DisplayOrder
            };

            return CreatedAtAction(nameof(GetReport), new { id = report.Id }, reportDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating report");
            return StatusCode(500, new { message = "An error occurred while creating the report" });
        }
    }

    [Authorize(Roles = "Admin,User")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateReport(int id, [FromBody] UpdateReportDto dto)
    {
        try
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null || report.IsDeleted)
            {
                return NotFound(new { message = "Report not found" });
            }

            report.Name = dto.Name;
            report.Description = dto.Description;
            report.SqlQuery = dto.SqlQuery;
            report.RefreshInterval = dto.RefreshInterval;
            report.IsActive = dto.IsActive;
            report.DisplayOrder = dto.DisplayOrder;
            report.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Report updated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating report {Id}", id);
            return StatusCode(500, new { message = "An error occurred while updating the report" });
        }
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteReport(int id)
    {
        try
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null || report.IsDeleted)
            {
                return NotFound(new { message = "Report not found" });
            }

            report.IsDeleted = true;
            report.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Report deleted successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting report {Id}", id);
            return StatusCode(500, new { message = "An error occurred while deleting the report" });
        }
    }
}
