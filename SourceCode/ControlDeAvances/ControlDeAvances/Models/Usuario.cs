using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Usuario
    {
        public long Id { get; set; }
        public long? IdRol { get; set; }
        public long? IdUsuarioMod { get; set; }
        public string Nombre { get; set; }
        public string Usuario1 { get; set; }
        public string Password { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }

        public virtual Role IdRolNavigation { get; set; }
    }
}
