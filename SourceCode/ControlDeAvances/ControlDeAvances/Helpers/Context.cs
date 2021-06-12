using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlDeAvances.Helpers
{
    public class Context
    {

        private readonly string connectionstring = "Server=192.168.210.100; Initial Catalog=ControlDeAvances; User ID=sa; Password=ray2010?";

        public ApplicationDbContext DbContext()
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();
            optionsBuilder.UseSqlServer(connectionstring);
            ApplicationDbContext dbContext = new ApplicationDbContext(optionsBuilder.Options);
            return dbContext;
        }

    }
}
