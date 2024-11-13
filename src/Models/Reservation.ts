export type ReservationPost = {
    beginTime: string;
    endTime: string;

}

export type ReservationGet = {
    id: number;
    beginTime: string;
    endTime: string;
    laneNumber: number;
    alleyName: string;
    alleyCity: string;
    alleyAddress: string;
    laneId: number;
    
}

export type ReservationUpdate = {
    beginTime: string;
    endTime: string;
}

export type FindLanes = {
    beginTime: string;
    endTime: string;
    reservationId: number;
}