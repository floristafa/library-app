using Microsoft.EntityFrameworkCore;
using JWTAuthentication.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;

// Add services to the container.

builder.Services.AddDbContext<LibraryContext>(option =>{
    option.UseSqlServer(builder.Configuration.GetConnectionString("DefaultSQLConnection"));
});


// Adding AutoMapper

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// For Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<LibraryContext>()
    .AddDefaultTokenProviders();

// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        // ValidAudience = configuration["JWT:ValidAudience"],
        // ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
    };
});

//builder.Services.AddControllersWithViews();
builder.Services.AddControllers(options => 

{options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
    //option.ReturnHttpNotAcceptable=true;
}).AddNewtonsoftJson().AddXmlDataContractSerializerFormatters();

    
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//add CORS
builder.Services.AddCors();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseSwagger();
    app.UseSwaggerUI(option =>
    {
        option.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Flori");
        option.RoutePrefix = string.Empty;
    });
    app.UseHsts();
    
    
}

//app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(builder =>{
    builder
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

// Define endpoints here, such as for controllers

// app.UseEndpoints(endpoints =>
//     {
//         endpoints.MapControllerRoute(
//             name: "default",
//             pattern: "{controller=Home}/{action=Index}/{id?}");
        
//     });
//     app.UseEndpoints(endpoints =>
//     // {
    //     endpoints.MapControllerRoute(
    //         name: "default",
    //         pattern: "{controller=Home}/{action=Index}/{id?}");
    //     endpoints.MapControllerRoute(
    //         name: "authors",
    //         pattern: "/api/Authors/{action=Index}/{id?}",
    //         defaults: new { controller = "Author" });
    // });

    // app.UseEndpoints(endpoints =>
    // {
    //     endpoints.MapControllerRoute(
    //         name: "default",
    //         pattern: "{controller=Home}/{action=Index}/{id?}");
    //     endpoints.MapControllerRoute(
    //         name: "categories",
    //         pattern: "categories/{action=Index}/{id?}",
    //         defaults: new { controller = "Category" });
    // });



    // app.UseEndpoints(endpoints =>
    // {
    //     endpoints.MapControllers();
    // });


// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("/index.html");

app.Run();





