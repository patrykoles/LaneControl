import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { MenuItemGet, MenuItemPost } from "../Models/MenuItem";

const api = "http://localhost:5289/api/";

export const menuItemGetAPI = async (id: number) => {
    try {
      const data = await axios.get<MenuItemGet>(api + `menuitem/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export const menuItemGetAllAPI = async (name = "", category = "") => {
    try {
        const queryParams: Record<string, string> = {};
        if (name) queryParams.name = name;
        if (category) queryParams.category = category;
        
        const data = await axios.get<MenuItemGet[]>(`${api}menuitem`, { params: queryParams });
        return data;
    } catch (error) {
        handleError(error);
    }
};

  export const menuItemPostAPI = async (
    name: string,
    description: string,
    category: string,
    currentPrice: number
  ) => {
    try {
      const data = await axios.post<MenuItemPost>(api + `menuitem`, {
        name: name,
        description: description,
        category: category,
        currentPrice: currentPrice
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export const menuItemUpdateAPI = async (
    id: number,
    name: string,
    description: string,
    category: string,
    currentPrice: number
  ) => {
    try {
      const data = await axios.put<MenuItemPost>(api + `menuitem/${id}`, {
        name: name,
        description: description,
        category: category,
        currentPrice: currentPrice
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const menuItemDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<MenuItemPost>(api + `menuitem/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};