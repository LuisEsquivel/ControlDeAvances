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
    public class FasesController : Controller
    {
        private IGenericRepository<Fase> repository;
 

        public FasesController(ApplicationDbContext context)
        {
            this.repository = new GenericRepository<Fase>(context);
        }


        public ActionResult Index()
        {
            return View();
        }



    }
}
