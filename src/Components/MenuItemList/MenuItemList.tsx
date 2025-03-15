import React from 'react';
import { MenuItemGet } from '../../Models/MenuItem';
import MenuItemListItem from '../MenuItemListItem/MenuItemListItem';

type Props = {
  menuItems: MenuItemGet[];
};

const MenuItemList = ({ menuItems }: Props) => {
  // Grupowanie pozycji menu według kategorii
  const groupedItems = menuItems.reduce((groups, menuItem) => {
    const { category } = menuItem;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(menuItem);
    return groups;
  }, {} as Record<string, MenuItemGet[]>);

  return (
    <div>
      {Object.keys(groupedItems).map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-green-300 to-teal-500 py-3 px-6 rounded-lg shadow-md mb-4tracking-wide my-2">
            {category}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-2">
            {groupedItems[category].map((menuItem) => (
              <MenuItemListItem key={menuItem.id} menuItem={menuItem} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;
