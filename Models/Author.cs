using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
public class Author
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    public string Bio { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatedBy { get; set; }

    public ICollection<Book>? Books { get; set; }
}