import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup";
import { findAvailableLanes, reservationGetAPI, reservationPostAPI, reservationUpdateAPI } from '../../../Services/ReservationServices';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LaneGet } from '../../../Models/Lane';
import { AlleyGet } from '../../../Models/Alley';
import { alleyGetAPI } from '../../../Services/AlleyService';
import AvailableLanesList from '../../../Components/AvailableLanesList/AvailableLanesList';
import ErrorBoundary from '../../../Components/ErrorBoundry/ErrorBoundry';
import { ReservationGet } from '../../../Models/Reservation';

type Props = {}

export type UpdateReservationFormInputs = {
    beginTime: string;
    endTime: string;
}

export const toISOStringWithoutTimezone = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split('.')[0]; // Remove milliseconds
};

const validation = Yup.object().shape({
    beginTime: Yup.string()
      .required('BeginTime jest wymagane')
      .test('beginTime-check', 'Begin time must have minutes at 00', (value) => {
        if (value) {
          // Parsowanie stringa na obiekt Date
          const date = new Date(value);
          return date.getMinutes() === 0 && date.getSeconds() === 0 && date.getMilliseconds() === 0;
        }
        return true; // Jeśli value jest undefined, walidacja przechodzi
      }),
    
    endTime: Yup.string()
      .required('EndTime jest wymagane')
      .test('endTime-check', 'End time must have minutes at 59 and be at most 1 day away from beginTime', (value, context) => {
        const beginTime = context.parent.beginTime;
        if (value && beginTime) {
          const beginDate = new Date(beginTime);
          const endDate = new Date(value);
  
          // Sprawdzanie różnicy czasu
          const diff = endDate.getTime() - beginDate.getTime();
          const diffInHours = diff / (1000 * 60 * 60);
          if (diffInHours > 24) {
            return false;
          }
  
          // Sprawdzanie minut i sekund
          return endDate.getMinutes() === 59 && endDate.getSeconds() === 0 && endDate.getMilliseconds() === 0;
        }
        return true;
      }),
  });

const UpdateReservationPage = (props: Props) => {
    let { alleyid, id } = useParams();
    const navigate = useNavigate();
    const [lanes, setLanes] = useState<LaneGet[]>([]);
    const [alley, setAlley] = useState<AlleyGet | null>(null);
    const [reservation, setReservation] = useState<ReservationGet | null>(null);

    useEffect(() => {
        getReservation();
    }, []);
  
    const getReservation = () => {
      reservationGetAPI(Number(id)).then((res) => {
          setReservation(res?.data!);
      });
    };

    useEffect(() => {
        getAlley();
    }, []);
  
    const getAlley = () => {
      alleyGetAPI(Number(alleyid)).then((res) => {
          setAlley(res?.data!);
      });
    };

    

    const handleFindLanes = (e: UpdateReservationFormInputs) => {
        const beginTimeISO = toISOStringWithoutTimezone( new Date(e.beginTime));
        const endTimeISO = toISOStringWithoutTimezone( new Date(e.endTime));
        findAvailableLanes(Number(reservation?.alleyId), beginTimeISO, endTimeISO, Number(reservation?.id))
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
    setValue,
  } = useForm<UpdateReservationFormInputs>({ resolver: yupResolver(validation) });

  useEffect(() => {
    if (reservation) {
      setValue("beginTime", toISOStringWithoutTimezone(new Date(reservation.beginTime))); // '2024-11-15T10:00'
      setValue("endTime", toISOStringWithoutTimezone(new Date(reservation.endTime))); // '2024-11-15T11:00'
      handleFindLanes({
        beginTime: toISOStringWithoutTimezone(new Date(reservation.beginTime)),
        endTime: toISOStringWithoutTimezone(new Date(reservation.endTime)),
    })
    }
  }, [reservation, setValue]);

  const formData = watch();

  const handleReservation = (e: React.FormEvent, beginTime: Date, endTime: Date, reservationId: number) => {
    e.preventDefault();
    const beginTimeISO = toISOStringWithoutTimezone(beginTime);
    const endTimeISO = toISOStringWithoutTimezone(endTime);
    reservationUpdateAPI(reservationId, beginTimeISO, endTimeISO)
      .then((res) => {
        if (res) {
          toast.success("Reservation updated successfully!");
          navigate(`/reservations`);
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
    };

    const resolvedReservationId = reservation?.id ?? null;
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
    {lanes.length > 0 ? (
        <AvailableLanesList
        lanes={lanes}
        formData={{
            beginTime: new Date(formData.beginTime),
            endTime: new Date(formData.endTime),
        }}
        handleReservation={handleReservation}
        reservationId={resolvedReservationId}
    />
      ) : (<div className="flex justify-center mb-6">
      <p className="text-gray-700 text-lg mb-6 py-6 px-20">No lines available at this time</p></div>
      )}
    </>
  );
}

export default UpdateReservationPage