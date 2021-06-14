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


        public string GetComentarios(string idRelacion)
        {
            var c = repository.GetByValues(x => x.IdRelacion.ToString() == idRelacion);
            var json = "";
            foreach(var item in c)
            {
                var idComentario = "Comment" + item.Id;
                json += "<div id='"+idComentario+"'>" +item.UsuarioCreador + ": "+ item.Descripcion+" <button class='btn btn-sm btn-danger' style='cursor:pointer;' onclick='Delete('"+item.Id+"')'>Eliminar</button> </div>" + Environment.NewLine;
            }

            return json;
        }


        public string Create(Comentario c, long idRelacion)
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
