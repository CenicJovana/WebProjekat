using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Knjizara_BE.Models
{
    [Table("Raf")]
    public class Raf
    {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Naziv")]
        public string Naziv { get; set; }

        [Column("BrojRedova")]
        public int BrojRedova { get; set; }

        [Column("BrPolicaPoRedu")]
        public int BrPolicaPoRedu { get; set; }

        public virtual List<Knjiga> Knjige { get; set; }

        [JsonIgnore]
        public Knjizara Knjizara{ get; set; }
    }
}
