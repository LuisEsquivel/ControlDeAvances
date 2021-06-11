using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Usuario
    {
        public Guid Id { get; set; }
        public Guid? IdRol { get; set; }
        public Guid? IdUsuarioMod { get; set; }
        public string Nombre { get; set; }
        public string Usuario1 { get; set; }
        public string Password { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }

        public virtual Role IdRolNavigation { get; set; }
    }
}
