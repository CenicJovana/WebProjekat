using Microsoft.EntityFrameworkCore;

namespace Knjizara_BE.Models
{
    public class KnjizaraContext : DbContext
    {
        public DbSet<Knjizara> Knjizare { get; set; }
        public DbSet<Raf> Rafovi { get; set; }

        public DbSet<Knjiga> Knjige { get; set; }

        public KnjizaraContext(DbContextOptions options) : base(options)
        {

        }
    }
}
