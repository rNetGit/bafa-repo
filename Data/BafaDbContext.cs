using BafaMobile.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BafaMobile.Data;

//
public class BafaDbContext : IdentityDbContext<AppUser>
{
    public BafaDbContext(DbContextOptions<BafaDbContext> options) : base(options) { }

    public DbSet<MembershipModel> Memberships { get; set; } = default!;

    public DbSet<EventRecord> Events { get; set; } = default!;
    public DbSet<EventRegistration> EventRegistrations { get; set; } = default!;
    public DbSet<PaymentIntent> PaymentIntents { get; set; } = default!;
    public DbSet<BoardMember> BoardMembers { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PaymentIntent>()
            .HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<BoardMember>()
            .HasIndex(b => new { b.Year, b.Role, b.IsAdvisor })
            .IsUnique();
    }
}
