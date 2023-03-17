using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "agendaItems",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(36)", unicode: false, maxLength: 36, nullable: false),
                    clientId = table.Column<string>(type: "varchar(36)", unicode: false, maxLength: 36, nullable: true),
                    practitionerId = table.Column<string>(type: "varchar(36)", unicode: false, maxLength: 36, nullable: true),
                    date = table.Column<DateTime>(type: "date", nullable: true),
                    startTime = table.Column<TimeSpan>(type: "time", nullable: true),
                    endTime = table.Column<TimeSpan>(type: "time", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__agendaIt__3213E83F62F51800", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "clients",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(36)", unicode: false, maxLength: 36, nullable: false),
                    displayName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__clients__3213E83F933DD04C", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "practitioners",
                columns: table => new
                {
                    id = table.Column<string>(type: "varchar(36)", unicode: false, maxLength: 36, nullable: false),
                    displayName = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    discipline = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__practiti__3213E83F2398A017", x => x.id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agendaItems");

            migrationBuilder.DropTable(
                name: "clients");

            migrationBuilder.DropTable(
                name: "practitioners");
        }
    }
}
