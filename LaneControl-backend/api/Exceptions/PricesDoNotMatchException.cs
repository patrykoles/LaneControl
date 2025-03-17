using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Exceptions
{
    public class PricesDoNotMatchException : Exception
    {
        public PricesDoNotMatchException(string message)
        :base(message)
        {
            
        }
    }
}