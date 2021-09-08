using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Knjizara_BE.Models
{
    [Table("Knjizara")]
    public class Knjizara
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(80)]
        public string Naziv { get; set; }

        [Column("Adresa")]
        public string Adresa { get; set; }

        public virtual List<Raf> Rafovi{ get; set; }

    }
}
