using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Role
    {
        public Role()
        {
            Usuarios = new HashSet<Usuario>();
        }

        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string IdUsuarioAlta { get; set; }
        public string IdUsuarioMod { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }

        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
