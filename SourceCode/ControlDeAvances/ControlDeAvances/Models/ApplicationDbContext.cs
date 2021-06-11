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
        public virtual DbSet<Documentacion> Documentacions { get; set; }
        public virtual DbSet<Fase> Fases { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<Comentario>(entity =>
            {
                entity.Property(e => e.Descripcion).HasColumnType("text");

                entity.Property(e => e.FechaAlta).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.UsuarioCreador).HasColumnType("text");

                entity.HasOne(d => d.IdRelacionNavigation)
                    .WithMany(p => p.Comentarios)
                    .HasForeignKey(d => d.IdRelacion)
                    .HasConstraintName("FK_Comentarios_Documentacion");
            });

            modelBuilder.Entity<Documentacion>(entity =>
            {
                entity.ToTable("Documentacion");

                entity.Property(e => e.Descripcion)
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaCaptura).HasColumnType("datetime");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.Imagen).HasColumnType("text");

                entity.Property(e => e.RutaImagen).HasColumnType("text");

                entity.HasOne(d => d.IdFaseNavigation)
                    .WithMany(p => p.Documentacions)
                    .HasForeignKey(d => d.IdFase)
                    .HasConstraintName("FK_Documentacion_Fases");
            });

            modelBuilder.Entity<Fase>(entity =>
            {
                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasColumnType("text");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.IdUsuarioAlta).HasColumnType("text");

                entity.Property(e => e.IdUsuarioMod).HasColumnType("text");

                entity.Property(e => e.Nombre).HasColumnType("text");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.Property(e => e.FechaAlta)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaMod).HasColumnType("datetime");

                entity.Property(e => e.Nombre).HasColumnType("text");

                entity.Property(e => e.Password).HasColumnType("text");

                entity.Property(e => e.Usuario1)
                    .HasColumnType("text")
                    .HasColumnName("Usuario");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdRol)
                    .HasConstraintName("FK_Usuarios_Roles");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
