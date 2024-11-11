import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { menuItemPostAPI } from '../../../Services/MenuItemServices';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {}

type CreateMenuItemFormInputs = {
    name: string;
    description: string;
    category: string;
    currentPrice: number;
  };
  
  const validation = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    description: Yup.string().required("Description is required!"),
    category: Yup.string().required("Category is required!"),
    currentPrice: Yup.number().required("Price is required!")
  });

const CreateMenuItemPage = (props: Props) => {
    const navigate = useNavigate();

  const handleMenuItem = (e: CreateMenuItemFormInputs) => {
    menuItemPostAPI(e.name, e.description, e.category, e.currentPrice)
      .then((res) => {
        if (res) {
          toast.success("Menu item created successfully!");
          navigate("/menu");
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMenuItemFormInputs>({ resolver: yupResolver(validation) });
    return (
        <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit(handleMenuItem)}>
          <h2 className="text-2xl font-bold text-center mb-6">Create New Menu Item</h2>
    
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Item Name</label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
    
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
    
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select category</option>
              <option value="Addons">Addons</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Courses">Main Courses</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks">Drinks</option>
              <option value="Alcoholic Drinks">Alcoholic Drinks</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
          </div>
    
          <div className="mb-6">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (PLN)</label>
            <input
              type="number"
              step="0.01"
              id="price"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("currentPrice", { required: "Price is required", min: 0.01 })}
            />
            {errors.currentPrice && <p className="text-red-500 text-sm">{errors.currentPrice.message}</p>}
          </div>
    
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      );
}

export default CreateMenuItemPage