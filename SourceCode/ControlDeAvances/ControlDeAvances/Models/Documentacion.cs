using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Documentacion
    {
        public Documentacion()
        {
            Comentarios = new HashSet<Comentario>();
        }

        public long Id { get; set; }
        public long? IdFase { get; set; }
        public Guid? IdUsuarioAlta { get; set; }
        public Guid? IdUsuarioMod { get; set; }
        public string Descripcion { get; set; }
        public string RutaImagen { get; set; }
        public string Imagen { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }
        public DateTime? FechaCaptura { get; set; }

        public virtual Fase IdFaseNavigation { get; set; }
        public virtual ICollection<Comentario> Comentarios { get; set; }
    }
}
