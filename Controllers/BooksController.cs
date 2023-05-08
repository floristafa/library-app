using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IMapper _mapper;

    public BooksController(LibraryContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookViewModel>>> GetBooks()
    {
        var books = await _context.Books
            .Include(b => b.Author)
            .Include(b => b.Categories)
            .ToListAsync();

        var bookViewModels = _mapper.Map<List<BookViewModel>>(books);

        return Ok(bookViewModels);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookViewModel>> GetBook(int id)
    {
        var book = await _context.Books
            .Include(b => b.Author)
            .Include(b => b.Categories)
            .FirstOrDefaultAsync(b => b.Id == id);

        if (book == null)
        {
            return NotFound();
        }

        var bookViewModel = _mapper.Map<BookViewModel>(book);

        return Ok(bookViewModel);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<BookViewModel>> CreateBook(BookViewModel bookViewModel)
    {
        
        var book = _mapper.Map<Book>(bookViewModel);
        book.CreatedAt = DateTime.Now;
        book.CreatedBy = User.Identity.Name ?? "Unknown";

        _context.Books.Add(book);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBook), new { id = book.Id }, _mapper.Map<BookViewModel>(book));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateBook(int id, BookViewModel bookViewModel)
    {
        if (id != bookViewModel.Id)
        {
            return BadRequest();
        }

        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        _mapper.Map(bookViewModel, book);
        book.CreatedAt = DateTime.Now;
        book.CreatedBy = User.Identity.Name ?? "Unknown";

        _context.Entry(book).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!BookExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteBook(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookExists(int id)
    {
        return _context.Books.Any(b => b.Id == id);
    }
}
