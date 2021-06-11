using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ControlDeAvances
{
    public partial class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Comentario> Comentarios { get; set; }
        public virtual DbSet<Fase> Fases { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Comentario>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Descripcion).HasColumnType("text");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.IdRelacion).HasColumnType("text");
            });

            modelBuilder.Entity<Fase>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasColumnType("text");
            });



            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.IdUsuarioAlta).HasColumnType("text");

                entity.Property(e => e.IdUsuarioMod).HasColumnType("text");

                entity.Property(e => e.Nombre).HasColumnType("text");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.Id).HasDefaultValueSql("(newid())");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasColumnType("text");

                entity.Property(e => e.Password).HasColumnType("text");

                entity.Property(e => e.Usuario1)
                    .HasColumnType("text")
                    .HasColumnName("Usuario");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
