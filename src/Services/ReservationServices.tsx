import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { ReservationGet, ReservationPost } from "../Models/Reservation";
import { LaneGet } from "../Models/Lane";

const api = "http://localhost:5289/api/";

export const reservationGetAPI = async (id: number) => {
    try {
      const data = await axios.get<ReservationGet>(api + `reservation/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const reservationGetAllAPI = async (isExpired = false) => {
    try {
        const queryParams: Record<string,boolean> = {};
        if (isExpired) queryParams.isExpired = isExpired;
        const data = await axios.get<ReservationGet[]>(`${api}reservation`, { params: queryParams });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const reservationPostAPI = async (
    laneId: number,
    beginTime: string,
    endTime: string
  ) => {
    try {
      const data = await axios.post<ReservationGet>(api + `reservation/${laneId}`, {
        beginTime: beginTime,
        endTime: endTime
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const reservationUpdateAPI = async (
    id: number,
    beginTime: string,
    endTime: string
  ) => {
    try {
      const data = await axios.put<ReservationGet>(api + `reservation/${id}`, {
        beginTime: beginTime,
        endTime: endTime
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const reservationDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<ReservationGet>(api + `reservation/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const findAvailableLanes = async (
    alleyId: number,
    beginTime: string,
    endTime: string,
    reservationId: number | null
) => {
    try {
        const data = await axios.post<LaneGet[]>(api + `reservation/availablelanes/${alleyId}`, {
            beginTime: beginTime,
            endTime: endTime,
            reservationId: reservationId
          });
          return data;
    } catch(error) {
        handleError(error);
    }
};