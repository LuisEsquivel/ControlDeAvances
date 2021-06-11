using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Comentario
    {
        public long Id { get; set; }
        public long? IdRelacion { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioCreador { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }

        public virtual Documentacion IdRelacionNavigation { get; set; }
    }
}
