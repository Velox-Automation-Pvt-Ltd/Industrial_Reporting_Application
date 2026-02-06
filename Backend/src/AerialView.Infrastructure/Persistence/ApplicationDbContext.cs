using AerialView.Domain.Entities;
using AerialView.Domain.Enums;
using Microsoft.EntityFrameworkCore;

namespace AerialView.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<UserPermission> UserPermissions { get; set; }
    public DbSet<DatabaseConnection> DatabaseConnections { get; set; }
    public DbSet<Report> Reports { get; set; }
    public DbSet<ReportColumn> ReportColumns { get; set; }
    public DbSet<ColorCondition> ColorConditions { get; set; }
    public DbSet<TextList> TextLists { get; set; }
    public DbSet<TextListItem> TextListItems { get; set; }
    public DbSet<AutoExportConfig> AutoExportConfigs { get; set; }
    public DbSet<AutoExportLog> AutoExportLogs { get; set; }
    public DbSet<EmailSetting> EmailSettings { get; set; }
    public DbSet<EmailContact> EmailContacts { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<SqlTable> SqlTables { get; set; }
    public DbSet<MenuSetting> MenuSettings { get; set; }
    public DbSet<ProjectSetting> ProjectSettings { get; set; }
    public DbSet<BatchPreview> BatchPreviews { get; set; }
    public DbSet<GraphicalPreview> GraphicalPreviews { get; set; }
    public DbSet<LiveChart> LiveCharts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User Configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Username).IsUnique();
            entity.HasIndex(e => e.Email).IsUnique();
            entity.Property(e => e.Username).IsRequired().HasMaxLength(50);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
            entity.Property(e => e.PasswordHash).IsRequired();
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // UserPermission Configuration
        modelBuilder.Entity<UserPermission>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.User)
                .WithMany(u => u.Permissions)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // DatabaseConnection Configuration
        modelBuilder.Entity<DatabaseConnection>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // Report Configuration
        modelBuilder.Entity<Report>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.HasOne(e => e.DatabaseConnection)
                .WithMany(d => d.Reports)
                .HasForeignKey(e => e.DatabaseConnectionId)
                .OnDelete(DeleteBehavior.Restrict);
            entity.HasQueryFilter(e => !e.IsDeleted);
        });

        // ReportColumn Configuration
        modelBuilder.Entity<ReportColumn>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Report)
                .WithMany(r => r.Columns)
                .HasForeignKey(e => e.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
            entity.HasOne(e => e.ColorCondition)
                .WithMany(c => c.ReportColumns)
                .HasForeignKey(e => e.ColorConditionId)
                .OnDelete(DeleteBehavior.SetNull);
            entity.HasOne(e => e.TextList)
                .WithMany(t => t.ReportColumns)
                .HasForeignKey(e => e.TextListId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // ColorCondition Configuration
        modelBuilder.Entity<ColorCondition>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        });

        // TextList Configuration
        modelBuilder.Entity<TextList>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
        });

        // TextListItem Configuration
        modelBuilder.Entity<TextListItem>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.TextList)
                .WithMany(t => t.Items)
                .HasForeignKey(e => e.TextListId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // AutoExportConfig Configuration
        modelBuilder.Entity<AutoExportConfig>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Report)
                .WithMany(r => r.AutoExportConfigs)
                .HasForeignKey(e => e.ReportId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // AutoExportLog Configuration
        modelBuilder.Entity<AutoExportLog>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.AutoExportConfig)
                .WithMany(c => c.Logs)
                .HasForeignKey(e => e.AutoExportConfigId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // MenuSetting Configuration
        modelBuilder.Entity<MenuSetting>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Parent)
                .WithMany(m => m.Children)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        // Seed default admin user
        var adminUser = new User
        {
            Id = 1,
            Username = "admin",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin@321"),
            Email = "admin@aerialview.com",
            FullName = "Administrator",
            Role = UserRole.Admin,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        modelBuilder.Entity<User>().HasData(adminUser);
    }
}
