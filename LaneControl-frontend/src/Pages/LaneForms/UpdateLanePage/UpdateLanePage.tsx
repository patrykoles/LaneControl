import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { laneGetAPI, laneUpdateAPI } from '../../../Services/LaneServices';
import { LaneGet } from '../../../Models/Lane';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

type Props = {}

type UpdateLaneFormInputs = {
    laneNumber: number;
    highscore: number;
}

const validation = Yup.object().shape({
    laneNumber: Yup.number().required("Lane number is required!"),
    highscore: Yup.number().required("Highscore is required!")
});

const UpdateLanePage = (props: Props) => {
    const { alleyid, id } = useParams();

    const [lane, setLane] = useState<LaneGet | null>(null);

    useEffect(() => {
        getLane();
    }, []);

    const getLane = () => {
        laneGetAPI(Number(id)).then((res) => {
            setLane(res?.data!);
        });
    };

    const navigate = useNavigate();

  const handleLane = (e: UpdateLaneFormInputs) => {
    laneUpdateAPI(Number(id), e.laneNumber, e.highscore)
      .then((res) => {
        if (res) {
          toast.success("Lane updated successfully!");
          navigate(`/alleydetails/${alleyid}`);
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
    setValue,
  } = useForm<UpdateLaneFormInputs>({ resolver: yupResolver(validation) });

  useEffect(() => {
    if (lane) {
      setValue("laneNumber", lane.number);
      setValue("highscore", lane.highscore);
    }
  }, [lane, setValue]);

  const handleBackClick = () => {
    navigate(`/alleydetails/${alleyid}`); 
};

    return (
      <>
        <form className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit(handleLane)}>
  <h2 className="text-2xl font-bold text-center mb-6">Change Lane Info</h2>

  <div className="mb-4">
    <label htmlFor="number" className="block text-sm font-medium text-gray-700">Lane Number</label>
    <input
      type="number"
      id="number"
      className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register("laneNumber")}
    />
    {errors.laneNumber ? <p>{errors.laneNumber.message}</p> : ""}
  </div>

  <div className="mb-4">
    <label htmlFor="highscore" className="block text-sm font-medium text-gray-700">Highscore</label>
    <input
      type="number"
      id="highscore"
      className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...register("highscore")}
    />
    {errors.highscore ? <p>{errors.highscore.message}</p> : ""}
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
<div className="flex justify-center mt-4 my-5">
        <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
            <span>Cancel</span>
        </button>
        </div>
</>
    )
}

export default UpdateLanePage