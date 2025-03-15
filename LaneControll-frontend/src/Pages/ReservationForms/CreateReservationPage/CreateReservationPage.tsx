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

export const toISOStringWithoutTimezone = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('.')[0]; // Remove milliseconds
};

const validation = Yup.object().shape({
    beginTime: Yup.date()
    .required('BeginTime jest wymagane')
    .test('beginTime-check', 'Begin time must have minutes at 00', (value) => {
      return value ? value.getMinutes() === 0 && value.getSeconds() === 0 && value.getMilliseconds() === 0 : true;
    }),
  endTime: Yup.date()
    .required('EndTime jest wymagane')
    .test('endTime-check', 'End time must have minutes at 59 and be at most 1 day away from beginTime', (value, context) => {
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

    const handleReservation = (e: React.FormEvent, beginTime: Date, endTime: Date, laneId: number) => {
      e.preventDefault();
      const beginTimeISO = toISOStringWithoutTimezone(beginTime);
      const endTimeISO = toISOStringWithoutTimezone(endTime);
      reservationPostAPI(laneId, beginTimeISO, endTimeISO)
        .then((res) => {
          if (res) {
            toast.success("Reservation created successfully!");
            navigate(`/reservations`);
          }
        })
        .catch((e) => {
          toast.warning(e);
        });
      };

    const handleFindLanes = (e: CreateReservationFormInputs) => {
        const beginTimeISO = toISOStringWithoutTimezone(e.beginTime);
        const endTimeISO = toISOStringWithoutTimezone(e.endTime);
        findAvailableLanes(Number(alleyid), beginTimeISO, endTimeISO, null)
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

  const handleBackClick = () => {
    navigate(`/alleydetails/${alleyid}`);  // Goes back to the previous page
};
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
    <div className="flex justify-center mt-4 my-5">
        <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
            <span>Cancel</span>
        </button>
        </div>
    {lanes.length > 0 ? (
        <AvailableLanesList lanes={lanes} formData={formData} handleReservation={handleReservation} reservationId={null}/>
      ) : (<div className="flex justify-center mb-6">
      <p className="text-gray-700 text-lg mb-6 py-6 px-20">No lines available at this time</p></div>
      )}
    </>
  );
}

export default CreateReservationPage