import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { LaneGet, LanePost } from "../Models/Lane";

const api = "http://localhost:5289/api/";

export const laneGetAPI = async (id: number) => {
    try {
      const data = await axios.get<LaneGet>(api + `lane/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const laneGetAllAPI = async (alleyId: number) => {
    try {
        const queryParams: Record<string,number> = {};
        if (alleyId) queryParams.alleyId = alleyId;
        const data = await axios.get<LaneGet[]>(`${api}lane`, { params: queryParams });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const lanePostAPI = async (
    alleyId: number,
    laneNumber: number,
    highscore: number
  ) => {
    try {
      const data = await axios.post<LanePost>(api + `lane/${alleyId}`, {
        number: laneNumber,
        highscore: highscore
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const laneUpdateAPI = async (
    id: number,
    laneNumber: number,
    highscore: number
  ) => {
    try {
      const data = await axios.put<LanePost>(api + `lane/${id}`, {
        number: laneNumber,
        highscore: highscore
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const laneDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<LanePost>(api + `lane/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};