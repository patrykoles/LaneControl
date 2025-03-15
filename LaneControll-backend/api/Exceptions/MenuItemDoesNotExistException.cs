using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Exceptions
{
    public class MenuItemDoesNotExistException : Exception
    {
        public MenuItemDoesNotExistException(string message)
        :base(message)
        {
            
        }
    }
}