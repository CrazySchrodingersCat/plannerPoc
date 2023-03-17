using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

public partial class PlannerDbContext : DbContext
{
    public PlannerDbContext()
    {
    }

    public PlannerDbContext(DbContextOptions<PlannerDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AgendaItem> AgendaItems { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Practitioner> Practitioners { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=PC5CD147GHVM; Database=PlannerDb;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AgendaItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__agendaIt__3213E83F62F51800");

            entity.ToTable("agendaItems");

            entity.Property(e => e.Id)
                .HasMaxLength(36)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.ClientId)
                .HasMaxLength(36)
                .IsUnicode(false)
                .HasColumnName("clientId");
            entity.Property(e => e.Date)
                .HasColumnType("date")
                .HasColumnName("date");
            entity.Property(e => e.EndTime).HasColumnName("endTime");
            entity.Property(e => e.PractitionerId)
                .HasMaxLength(36)
                .IsUnicode(false)
                .HasColumnName("practitionerId");
            entity.Property(e => e.StartTime).HasColumnName("startTime");
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__clients__3213E83F933DD04C");

            entity.ToTable("clients");

            entity.Property(e => e.Id)
                .HasMaxLength(36)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("displayName");
        });

        modelBuilder.Entity<Practitioner>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__practiti__3213E83F2398A017");

            entity.ToTable("practitioners");

            entity.Property(e => e.Id)
                .HasMaxLength(36)
                .IsUnicode(false)
                .HasColumnName("id");
            entity.Property(e => e.Discipline)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("discipline");
            entity.Property(e => e.DisplayName)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("displayName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
