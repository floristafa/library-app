using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JWTAuthentication.Auth;
[Authorize]
[ApiController]
[Route("api/Authors")]
public class AuthorsController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IMapper _mapper;

    public AuthorsController(LibraryContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AuthorViewModel>>> GetAuthors()
    {
        var authors = await _context.Authors.ToListAsync();

        var authorViewModels = _mapper.Map<List<AuthorViewModel>>(authors);

        foreach (var authorViewModel in authorViewModels)
        {
            authorViewModel.BookCount = _context.Books.Count(b => b.AuthorId == authorViewModel.Id);
        }

        return Ok(authorViewModels);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AuthorViewModel>> GetAuthor(int id)
    {
        var author = await _context.Authors.FindAsync(id);

        if (author == null)
        {
            return NotFound();
        }

        var authorViewModel = _mapper.Map<AuthorViewModel>(author);
        authorViewModel.BookCount = _context.Books.Count(b => b.AuthorId == authorViewModel.Id);

        return Ok(authorViewModel);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<AuthorViewModel>> CreateAuthor(AuthorViewModel authorViewModel)
    {
        var author = _mapper.Map<Author>(authorViewModel);
        author.CreatedAt = DateTime.Now;
        author.CreatedBy = User.Identity.Name;

        _context.Authors.Add(author);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAuthor), new { id = author.Id }, _mapper.Map<AuthorViewModel>(author));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateAuthor(int id, AuthorViewModel authorViewModel)
    {
        if (id != authorViewModel.Id)
        {
            return BadRequest();
        }

        var author = await _context.Authors.FindAsync(id);

        if (author == null)
        {
            return NotFound();
        }

        _mapper.Map(authorViewModel, author);
        author.CreatedAt = DateTime.Now;
        author.CreatedBy = User.Identity.Name;

        _context.Entry(author).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AuthorExists(id))
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
    public async Task<IActionResult> DeleteAuthor(int id)
    {
        var author = await _context.Authors.FindAsync(id);

        if (author == null)
        {
            return NotFound();
        }

        _context.Authors.Remove(author);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AuthorExists(int id)
    {
        return _context.Authors.Any(a => a.Id == id);
    }
}
