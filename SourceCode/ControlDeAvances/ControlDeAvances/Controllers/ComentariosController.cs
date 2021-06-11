using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlDeAvances.Interface.IGenericRepository;
using ControlDeAvances.Repository;
using Microsoft.AspNetCore.Mvc;

namespace ControlDeAvances.Controllers
{
    public class ComentariosController : Controller
    {

        private IGenericRepository<Comentario> repository;


        public ComentariosController(ApplicationDbContext context)
        {
            this.repository = new GenericRepository<Comentario>(context);
        }


        public IActionResult Index()
        {
            return View();
        }


        public IEnumerable<Comentario> GetComentarios(string idRelacion)
        {
            return repository.GetByValues(x => x.IdRelacion.ToString() == idRelacion);     
        }


        public string Create(Comentario c, Guid idRelacion)
        {
            try
            {
                c.IdRelacion = idRelacion;

                if (repository.Create(c))
                {
                    return "Información Almacenada";
                }


                return "No se pudo guardar el comentario";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }

        public string Update(Comentario c)
        {
            try
            {
                var comment = repository.GetById(c.Id);

                comment.Descripcion = c.Descripcion;
                comment.FechaMod = DateTime.Now;

                if (repository.Update(comment)) return "Información Almacenada";
                else return "No se pudo actualizar el comentario";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }

        public string Delete(string id)
        {
            try
            {
                if (repository.Delete(id)) return "Comentario Eliminado";
                else return "No se pudo eliminar el comentario";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }


    }
}
