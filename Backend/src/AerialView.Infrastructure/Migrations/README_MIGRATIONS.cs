using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AerialView.Infrastructure.Migrations
{
    /// <summary>
    /// Initial database migration
    /// </summary>
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // This migration will be auto-generated when running:
            // dotnet ef migrations add InitialCreate --project AerialView.Infrastructure --startup-project AerialView.API
            // 
            // To update the database, run:
            // dotnet ef database update --project AerialView.Infrastructure --startup-project AerialView.API
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Rollback logic
        }
    }
}
