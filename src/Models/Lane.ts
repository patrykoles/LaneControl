export type LanePost = {
    number: number;
    highscore: number;
}

export type LaneGet = {
    id: number;
    number: number;
    highscore: number;
    alleyId: number;
}

export type LaneUpdate = {
    number: number;
    highscore: number;
}