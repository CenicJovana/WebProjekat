using Microsoft.EntityFrameworkCore.Migrations;

namespace Knjizara_BE.Migrations
{
    public partial class V1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Knjizara",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: true),
                    Adresa = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjizara", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Raf",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BrojRedova = table.Column<int>(type: "int", nullable: false),
                    BrPolicaPoRedu = table.Column<int>(type: "int", nullable: false),
                    KnjizaraID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raf", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Raf_Knjizara_KnjizaraID",
                        column: x => x.KnjizaraID,
                        principalTable: "Knjizara",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Knjiga",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(name: "Naziv ", type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Autor = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    BrStrana = table.Column<int>(type: "int", nullable: false),
                    GodIzdavanja = table.Column<int>(type: "int", nullable: false),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    Red = table.Column<int>(type: "int", nullable: false),
                    PozUredu = table.Column<int>(type: "int", nullable: false),
                    RafID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Knjiga", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Knjiga_Raf_RafID",
                        column: x => x.RafID,
                        principalTable: "Raf",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Knjiga_RafID",
                table: "Knjiga",
                column: "RafID");

            migrationBuilder.CreateIndex(
                name: "IX_Raf_KnjizaraID",
                table: "Raf",
                column: "KnjizaraID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Knjiga");

            migrationBuilder.DropTable(
                name: "Raf");

            migrationBuilder.DropTable(
                name: "Knjizara");
        }
    }
}
