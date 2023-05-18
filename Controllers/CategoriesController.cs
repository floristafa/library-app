using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JWTAuthentication.Auth;

[ApiController]
[Route("api/Categories")]
public class CategoriesController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IMapper _mapper;

    public CategoriesController(LibraryContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryViewModel>>> GetCategories()
    {
        var categories = await _context.Categories.ToListAsync();

        var categoryViewModels = _mapper.Map<List<CategoryViewModel>>(categories);

        foreach (var categoryViewModel in categoryViewModels)
        {
            categoryViewModel.BookCount = _context.BookCategories.Count(bc => bc.CategoryId == categoryViewModel.Id);
        }

        return Ok(categoryViewModels);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryViewModel>> GetCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        var categoryViewModel = _mapper.Map<CategoryViewModel>(category);
        categoryViewModel.BookCount = _context.BookCategories.Count(bc => bc.CategoryId == categoryViewModel.Id);

        return Ok(categoryViewModel);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<CategoryViewModel>> CreateCategory(CategoryViewModel categoryViewModel)
    {
        var category = _mapper.Map<Category>(categoryViewModel);
        category.CreatedAt = DateTime.Now;
        category.CreatedBy = User.Identity.Name;

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, _mapper.Map<CategoryViewModel>(category));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateCategory(int id, CategoryViewModel categoryViewModel)
    {
        if (id != categoryViewModel.Id)
        {
            return BadRequest();
        }

        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        _mapper.Map(categoryViewModel, category);
        category.CreatedAt = DateTime.Now;
        category.CreatedBy = User.Identity.Name;

        _context.Entry(category).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!CategoryExists(id))
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
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        _context.Categories.Remove(category);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool CategoryExists(int id)
    {
        return _context.Categories.Any(c => c.Id == id);
    }
}
