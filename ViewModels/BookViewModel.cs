public class BookViewModel
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CreatedBy { get; set; }

    public int AuthorId { get; set; }
    public AuthorViewModel Author { get; set; }

    public ICollection<CategoryViewModel> Categories { get; set; }
}