using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ControlDeAvances.Interface.IGenericRepository;
using ControlDeAvances.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ControlDeAvances.Controllers
{
    public class DocumentacionController : Controller
    {
        private IGenericRepository<Documentacion> repository;
        private ComentariosController c;

        public DocumentacionController(ApplicationDbContext context)
        {
            this.repository = new GenericRepository<Documentacion>(context);
            this.c = new ComentariosController(context);
        }


        //public ActionResult Index()
        //{
        //    return View();
        //}


        [HttpPost]
        public string List(int idFase = 0)
        {

            //List<Documentacion> lst = new List<Documentacion>();
            object lst = null;

            try
            {
                lst = repository.GetByValues(x => x.IdFase == idFase).ToList().Select(
                        d => new
                        {
                            d.Id,
                            d.Descripcion,
                            d.RutaImagen,
                            Comentarios = c.GetComentarios(d.Id.ToString())
                        }
                     ).ToList();
            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }


            if (lst == null) return "0";

            return JsonConvert.SerializeObject(lst);

        }


        public string GetById(string id)
        {

            try
            {
                List<Documentacion> lst = new List<Documentacion>();
                Documentacion img = new Documentacion();
                img = repository.GetById(id);
                lst.Add(img);
                return JsonConvert.SerializeObject(lst);
            }
            catch (Exception ex)
            {
                return "Error :" + ex.ToString();
            }


        }


        public string Create(Documentacion i, IFormFile file)
        {
            try
            {
                string base64 = "";

                if (file != null && file.Length > 0)
                {
                    using MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    base64 = Convert.ToBase64String(ms.ToArray());
                    if (!base64.Contains("data:image/jpeg;base64,")) base64 = "data:image/jpeg;base64," + base64;
                }

                i.Imagen = base64;
                if (repository.Create(i)) return "Información Almacenada";
                else return "{}";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }



        public string Update(Documentacion i, IFormFile file)
        {
            try
            {
                string base64 = "";

                if (file != null && file.Length > 0)
                {
                    using MemoryStream ms = new MemoryStream();
                    file.CopyTo(ms);
                    base64 = Convert.ToBase64String(ms.ToArray());
                    if (!base64.Contains("data:image/jpeg;base64,")) base64 = "data:image/jpeg;base64," + base64;
                }

                i.Imagen = base64;
                i.FechaMod = DateTime.Now;
                if (repository.Update(i)) return "Información Almacenada";
                else return "{}";

            }
            catch (Exception ex)
            {
                return "Error " + ex.ToString();
            }
        }


    }
}
