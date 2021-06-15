using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlDeAvances.Interface.IGenericRepository;
using ControlDeAvances.Repository;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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

            var IdComentarios = "Comentarios" + idRelacion;
            var html = "<div id='"+IdComentarios+"'>";
            foreach(var item in c)
            {
                var idComentario = "Comment" + item.Id;
                html += "<div id='"+idComentario+"'>" +item.UsuarioCreador + ": "+ item.Descripcion+ " <i class='fa fa-trash fa-2x' style='cursor:pointer; color:red;' onclick='Delete(" + item.Id+")'></i> </div>" + Environment.NewLine;
            }
            html += "</div>";
            return html;
        }


        [HttpPost]
        public string Create(Comentario c, long idRelacion)
        {
            try
            {
                c.IdRelacion = idRelacion;
                c.FechaAlta = DateTime.Now;

                if (repository.Create(c))
                {
                    var comments = GetComentarios(idRelacion.ToString());
                    return comments;
                }

                return "0";

            }
            catch (Exception ex)
            {
                return "Error Al Guardar Comentario" + ex.ToString();
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


        [HttpDelete]
        public string Delete(long id)
        {
            try
            {
                if (repository.Delete(id)) return "deleted";
                else return "No se pudo eliminar el comentario";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }


    }
}
