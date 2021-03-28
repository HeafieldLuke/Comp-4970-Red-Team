using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SWEBackend.Data;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Logging;
using SWEBackend.Controllers.Rooms;
using SWEBackend.Controllers.Sessions;
using SWEBackend.Controllers.Speakers;
using SWEBackend.Controllers.TimeSlots;
using SWEBackend.Controllers.Venues;

namespace SWEBackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
            => Configuration = configuration;

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            if (!string.IsNullOrWhiteSpace(Configuration.GetConnectionString("DefaultConnection")))
                services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDbContext>(opt =>
                        opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
            else
                services.AddDbContext<ApplicationDbContext>(opt =>
                        opt.UseSqlite(Configuration.GetSection("sqllitedb")?.Value ?? "Data Source=sweportal.db;"), ServiceLifetime.Transient);
            
            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = $"{Configuration.GetSection("ClientAppPath").Value}/build";
            });

            services.AddScoped<IRoomsController, RoomsController>();
            services.AddScoped<ISessionsController, SessionsController>();
            services.AddScoped<ISpeakersController, SpeakersController>();
            services.AddScoped<ITimeSlotsController, TimeSlotsController>();
            services.AddScoped<IVenuesController, VenuesController>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = Configuration.GetSection("ClientAppPath").Value;

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            UpdateDatabase(services);

            logger.Log(LogLevel.Information, "Application Initialized");
        }

        private static void UpdateDatabase(IServiceProvider provider)
        {
            var context = provider.GetService<ApplicationDbContext>();
            context?.Database.Migrate();
        }
    }
}
