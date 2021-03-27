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

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEntityFrameworkNpgsql().AddDbContext<ApplicationDbContext>(opt =>
                    opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));

            services.AddControllersWithViews();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddScoped<IRoomsController, RoomsController>();
            services.AddScoped<ISessionsController, SessionsController>();
            services.AddScoped<ISpeakersController, SpeakersController>();
            services.AddScoped<ITimeSlotsController, TimeSlotsController>();
            services.AddScoped<IVenuesController, VenuesController>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IServiceProvider services, ILogger<Startup> logger)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
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
                spa.Options.SourcePath = "ClientApp";

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
