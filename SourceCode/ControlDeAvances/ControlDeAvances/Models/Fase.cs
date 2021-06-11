using System;
using System.Collections.Generic;

#nullable disable

namespace ControlDeAvances
{
    public partial class Fase
    {
        public Fase()
        {
            Documentacions = new HashSet<Documentacion>();
        }

        public long Id { get; set; }
        public string Nombre { get; set; }
        public DateTime? FechaAlta { get; set; }
        public DateTime? FechaMod { get; set; }

        public virtual ICollection<Documentacion> Documentacions { get; set; }
    }
}
