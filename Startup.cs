using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using JWTAuthentication.Auth;


namespace library_app
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Add services here, such as database context and authentication
            services.AddSwaggerGen();
            services.AddDbContext<LibraryContext>(option =>{
        option.UseSqlServer(Configuration.GetConnectionString("DefaultSQLConnection"));
});
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {  

            app.UseSwagger();
            app.UseSwaggerUI(option =>
            {
                option.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Flori");
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();

            app.UseRouting();
            

            // Define endpoints here, such as for controllers
            app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllerRoute(
                        name: "books",
                        pattern: "api/Books/{action=Index}/{id?}",
                        defaults: new { controller = "Books" });
                });
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllerRoute(
                        name: "authors",
                        pattern: "api/Authors/{action=Index}/{id?}",
                        defaults: new { controller = "Author" });
                });

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllerRoute(
                        name: "categories",
                        pattern: "categories/{action=Index}/{id?}",
                        defaults: new { controller = "Category" });
                });

                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllerRoute(
                        name: "users",
                        pattern: "users/{action=Index}/{id?}",
                        defaults: new { controller = "User" });
                });


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}


