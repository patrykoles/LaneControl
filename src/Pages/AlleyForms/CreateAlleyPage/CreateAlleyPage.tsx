import React, { useState } from 'react';
import * as Yup from "yup";
import { alleyPostAPI } from '../../../Services/AlleyService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {}

type CreateAlleyFormInputs = {
  name: string;
  city: string;
  address: string;
  openingTime: string;
  closingTime: string;
};

const validation = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  city: Yup.string().required("City is required!"),
  address: Yup.string().required("Address  is required!"),
  openingTime: Yup.string().required("Opening time is required!"),
  closingTime: Yup.string().required("Closing time is required!")
});

const CreateAlleyPage = (props: Props) => {
  const navigate = useNavigate();

  const handleAlley = (e: CreateAlleyFormInputs) => {
    alleyPostAPI(e.name, e.city, e.address, e.openingTime, e.closingTime)
      .then((res) => {
        if (res) {
          toast.success("Alley created successfully!");
          navigate("/home");
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
  } = useForm<CreateAlleyFormInputs>({ resolver: yupResolver(validation) });
  return (
    <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit(handleAlley)}>
      <h2 className="text-2xl font-bold text-center mb-6">Create New Alley</h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Alley Name</label>
        <input
          type="text"
          id="name"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("name")}
        />
        {errors.name ? <p>{errors.name.message}</p> : ""}
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("city")}
        />
        {errors.city ? <p>{errors.city.message}</p> : ""}
      </div>

      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("address")}
        />
        {errors.address ? <p>{errors.address.message}</p> : ""}
      </div>

      <div className="mb-4">
        <label htmlFor="openingTime" className="block text-sm font-medium text-gray-700">Opening Time</label>
        <input
          type="time"
          id="openingTime"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("openingTime")}
        />
        {errors.openingTime ? <p>{errors.openingTime.message}</p> : ""}
      </div>

      <div className="mb-6">
        <label htmlFor="closingTime" className="block text-sm font-medium text-gray-700">Closing Time</label>
        <input
          type="time"
          id="closingTime"
          className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register("closingTime")}
        />
        {errors.closingTime ? <p>{errors.closingTime.message}</p> : ""}
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

export default CreateAlleyPage