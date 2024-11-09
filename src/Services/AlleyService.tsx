import axios from "axios";
import { AlleyGet, AlleyPost } from "../Models/Alley";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5289/api/";

export const alleyGetAPI = async (id: number) => {
    try {
      const data = await axios.get<AlleyGet>(api + `alley/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export const alleyGetAllAPI = async () => {
    try {
      const data = await axios.get<AlleyGet[]>(api + `alley`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export const alleyPostAPI = async (
    name: string,
    city: string,
    address: string,
    openingTime: string,
    closingTime: string
  ) => {
    try {
      const data = await axios.post<AlleyPost>(api + `alley`, {
        name: name,
        city: city,
        address: address,
        openingTime: openingTime,
        closingTime: closingTime
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

  export const alleyUpdateAPI = async (
    id: number,
    name: string,
    city: string,
    address: string,
    openingTime: string,
    closingTime: string
  ) => {
    try {
      const data = await axios.put<AlleyPost>(api + `alley/${id}`, {
        name: name,
        city: city,
        address: address,
        openingTime: openingTime,
        closingTime: closingTime
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const alleyDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<AlleyPost>(api + `alley/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};