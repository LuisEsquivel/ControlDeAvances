
using System;
using System.Collections.Generic;

namespace ControlDeAvances.Interface.IGenericRepository
{
  
        public interface IGenericRepository<T> where T : class
        {
            IEnumerable<T> GetAll();
            T GetById(object id);
            IEnumerable<T> GetByValues(Func<T, bool> values);
            bool Exist(Func<T, bool> values);
            bool Create(T obj);
            bool Update(T obj, int id = 0);
            bool Delete(object id);
            bool Save();
        }

}
