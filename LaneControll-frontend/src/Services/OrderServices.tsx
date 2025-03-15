import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { OrderGet, OrderItemPost } from "../Models/Order";

const api = "http://localhost:5289/api/";

export const orderGetAPI = async (id: number) => {
    try {
      const data = await axios.get<OrderGet>(api + `order/${id}`);
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const orderGetAllAPI = async (reservationId: number) => {
    try {
        const queryParams: Record<string,number> = {};
        if (reservationId) queryParams.reservationId = reservationId;
        const data = await axios.get<OrderGet[]>(`${api}order`, { params: queryParams });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const orderPostAPI = async (
    reservationId: number,
    orderItems: OrderItemPost[]
  ) => {
    try {
      const data = await axios.post<OrderGet>(api + `order/${reservationId}`, {
        orderItemRequests: orderItems
      });
      return data;
    } catch (error) {
      handleError(error);
    }
  };

export const orderDeleteAPI = async (id: number) => {
  try {
    const data = await axios.delete<OrderGet>(api + `order/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};