import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { findAvailableLanes, reservationPostAPI } from '../../../Services/ReservationServices';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LaneGet } from '../../../Models/Lane';
import { AlleyGet } from '../../../Models/Alley';
import { alleyGetAPI } from '../../../Services/AlleyService';
import AvailableLanesList from '../../../Components/AvailableLanesList/AvailableLanesList';
import ErrorBoundary from '../../../Components/ErrorBoundry/ErrorBoundry';

type Props = {}

export type CreateReservationFormInputs = {
    beginTime: Date;
    endTime: Date;
}

const validation = Yup.object().shape({
    beginTime: Yup.date()
    .required('BeginTime jest wymagane')
    .test('beginTime-check', 'BeginTime musi mieć minuty ustawione na 00', (value) => {
      return value ? value.getMinutes() === 0 && value.getSeconds() === 0 && value.getMilliseconds() === 0 : true;
    }),
  endTime: Yup.date()
    .required('EndTime jest wymagane')
    .test('endTime-check', 'EndTime musi mieć minuty ustawione na 59 i sekundy na 00', (value, context) => {
      const beginTime = context.parent.beginTime;
      if (value && beginTime) {
        const diff = new Date(value).getTime() - new Date(beginTime).getTime();
        const diffInHours = diff / (1000 * 60 * 60);
        if (diffInHours > 24) {
          return false;
        }
      }
      return value ? value.getMinutes() === 59 && value.getSeconds() === 0 && value.getMilliseconds() === 0 : true;
    }),
});

const CreateReservationPage = (props: Props) => {
    let { alleyid } = useParams();
    const navigate = useNavigate();
    const [lanes, setLanes] = useState<LaneGet[]>([]);
    const [alley, setAlley] = useState<AlleyGet | null>(null);

    useEffect(() => {
        getAlley();
    }, []);
  
    const getAlley = () => {
      alleyGetAPI(Number(alleyid)).then((res) => {
          setAlley(res?.data!);
      });
    };

    

    const handleFindLanes = (e: CreateReservationFormInputs) => {
        findAvailableLanes(Number(alleyid), e.beginTime.toISOString(), e.endTime.toISOString(), null)
            .then((res) => {
                if(res && res.data) {
                    setLanes(res.data);
                }
            })
            .catch((e) => {
                toast.warning(e);
            });
    }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateReservationFormInputs>({ resolver: yupResolver(validation) });

  const formData = watch();
  return (
    <>
    {alley && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center">{alley.name}</h2>
          <p className="text-center text-gray-600">{alley.city}, {alley.address}</p>
          <p className="text-center text-gray-600">Opening Hours: {alley.openingTime} - {alley.closingTime}</p>
        </div>
      )}
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        
      <h2 className="text-2xl font-bold text-center mb-6">Reservation Time</h2>
      <form onSubmit={handleSubmit(handleFindLanes)}>
        <div className="mb-4">
          <label htmlFor="beginTime" className="block text-sm font-medium text-gray-700">
            Begin Time
          </label>
          <input
            id="beginTime"
            type="datetime-local"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("beginTime", { required: "Begin time is required"})}
          />
          {errors.beginTime && <p className="text-red-500 text-sm">{errors.beginTime.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            id="endTime"
            type="datetime-local"
            className="mt-2 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            {...register("endTime", { required: "End time is required"})}
          />
          {errors.endTime && <p className="text-red-500 text-sm">{errors.endTime.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Find available lanes
        </button>
      </form>
    </div>
    {lanes.length > 0 && (
        <AvailableLanesList lanes={lanes} formData={formData} />
      )}
    </>
  );
}

export default CreateReservationPage