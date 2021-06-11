using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Comentario
    {
        public long Id { get; set; }
        public Guid? IdRelacion { get; set; }
        public string Descripcion { get; set; }
        public Guid? IdUsuarioAlta { get; set; }
        public Guid? IdUsuarioMod { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }
        public string UsuarioCreador { get; set; }

        public virtual Documentacion IdRelacionNavigation { get; set; }
    }
}
