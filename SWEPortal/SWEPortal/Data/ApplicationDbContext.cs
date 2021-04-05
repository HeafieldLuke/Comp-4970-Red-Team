using Microsoft.EntityFrameworkCore;
using SWEBackend.Models;

namespace SWEBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Room> Rooms { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Speaker> Speakers { get; set; }
        public DbSet<SWEFile> SWEFiles { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<Venue> Venues { get; set; }
        public DbSet<SessionCount> SessionCounts { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Room>().ToTable("Rooms");
            builder.Entity<Session>().ToTable("Sessions");
            builder.Entity<Speaker>().ToTable("Speakers");
            builder.Entity<SWEFile>().ToTable("SWEFile");
            builder.Entity<TimeSlot>().ToTable("TimeSlots");
            builder.Entity<Venue>().ToTable("Venues");
            builder.Entity<SessionCount>().ToTable("SessionCounts");
        }
    }
}