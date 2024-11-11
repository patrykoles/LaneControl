import React, { useEffect, useState } from 'react'
import { menuItemGetAllAPI } from '../../Services/MenuItemServices';
import { MenuItemGet } from '../../Models/MenuItem';
import MenuItemList from '../MenuItemList/MenuItemList';
import { Link } from 'react-router-dom';

type Props = {}

const MenuItem = (props: Props) => {
    const [menuItems, setMenuItems] = useState<MenuItemGet[] | null>(null);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        getMenuItems();
      }, []);

    const handleSearch = () => {
        getMenuItems();
    };

    const getMenuItems = () => {
        menuItemGetAllAPI(name, category).then((res) => {
            setMenuItems(res?.data!);
        });
    };

  const handleKeyDown = (e: any) => {
      if (e.key === 'Enter') {
          handleSearch();
      }
  };
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col md:flex-row gap-4">
            <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
            <input 
                type="text" 
                placeholder="Category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                onKeyDown={handleKeyDown} 
                className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
        </div>
        {menuItems ? (
          <>
          <MenuItemList menuItems={menuItems!} />
          <div className="flex justify-center mt-4 my-5">
            <Link to={`/addmenuitem`}>
              <button className="bg-white text-blue-500 border-2 border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white hover:border-blue-600">Add New Menu Item</button>
            </Link>
          </div> 
          </>
        ) : ""}
    </div>
  )
}

export default MenuItem