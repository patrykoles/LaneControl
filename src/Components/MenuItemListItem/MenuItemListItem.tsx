import React from 'react'
import { MenuItemGet } from '../../Models/MenuItem'
import { menuItemDeleteAPI } from '../../Services/MenuItemServices';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/UseAuth';

type Props = {
    menuItem: MenuItemGet;
}

const MenuItemListItem = ({ menuItem }: Props) => {
  const {isAdmin} = useAuth();
    const deleteMenuItem = () => {
        menuItemDeleteAPI(menuItem.id).then((res) => {
            if (res?.status == 204) {
              toast.success("Menu item deleted!");
            }
        });
    }
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 flex flex-col justify-between">
          <div>
            {/* Nagłówek z nazwą i kategorią */}
            <h3 className="text-3xl font-extrabold text-gray-800 mb-2">
              {menuItem.name}
            </h3>
            {/* Zawijanie tekstu w opisie */}
            <p className="text-gray-600 mb-4 text-sm font-medium break-words">
              {menuItem.description}
            </p>
            {/* Kategoria z eleganckim tłem */}
            <span className="text-sm text-white bg-gradient-to-r from-green-500 to-teal-500 py-1 px-3 rounded-full font-semibold mb-4 inline-block">
              {menuItem.category}
            </span>
          </div>
    
          <div className="flex items-center justify-between mt-6">
            <span className="text-xl font-semibold text-gray-800">
              {menuItem.currentPrice.toFixed(2)} PLN
            </span>
            { isAdmin ? (
            <div className="space-x-2">
              {/* Link do edytowania pozycji */}
              <Link to={`/updatemenuitem/${menuItem.id}`}>
                <button className="bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition-colors">
                  Edit
                </button>
              </Link>
              {/* Formularz usuwania pozycji */}
              <form onSubmit={deleteMenuItem}>
                <button
                  type="submit"
                  className="bg-red-500 text-white py-2 px-5 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
            ) : "" }
          </div>
        </div>
      );
}

export default MenuItemListItem