using AutoMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Author, AuthorViewModel>();
        CreateMap<AuthorViewModel, Author>();

        CreateMap<Book, BookViewModel>();
        CreateMap<BookViewModel, Book>();

        CreateMap<Book, Author>();
        CreateMap<Author, Book>();

        CreateMap<Book, AuthorViewModel>();
        CreateMap<AuthorViewModel, Book>();

        CreateMap<Book, Category>();
        CreateMap<Category, Book>();

        CreateMap<Book, CategoryViewModel>();
        CreateMap<CategoryViewModel, Book>();

        

        CreateMap<Category, CategoryViewModel>();
        CreateMap<CategoryViewModel, Category>();

        CreateMap<Author, AuthorReportViewModel>();
        CreateMap<AuthorReportViewModel, Author>();
        //CreateMap<AuthorViewModel, Author>();
    }
}
