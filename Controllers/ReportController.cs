using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JWTAuthentication.Auth;

[Authorize]
[ApiController]
[Route("api/Report")]
public class ReportController : ControllerBase

{
    private readonly LibraryContext _context;
    private readonly IMapper _mapper;

    public ReportController(LibraryContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult Report()
    {
        var authors = _context.Authors
            .Include(a => a.Books)
            .ToList();

        var authorReports = authors.Select(a => new AuthorReportViewModel
        {
            AuthorName = a.Name,
            BookCount = a.Books.Count
        }).OrderByDescending(a => a.BookCount).ToList();

        return Ok(authorReports);
    }
}
