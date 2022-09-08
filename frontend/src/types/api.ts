export type RaceData = {
    name: string;
    id: number;
    order: number;
    start: number;
};

export type RaceDetailData = {
    name: string;
    description: string;
    order: number;
    isFinished: boolean;
    member: {
        order: number;
        result: number;
        horse: HorseData;
        odds: number;
        popularity: number;
    }[];
    result: {
        horse: HorseData;
        order: number;
        return: number;
    };
    stert: number;
    voteBegin: number;
    voteEnd: number;
};

export type HorseData = {
    name: string;
    id: number;
};

export type HorseDetailData = {
    name: string;
    owner: string;
    wins: number;
    matches: number;
    next: RaceData | null;
    history: {
        race: RaceData;
        result: number;
        popularity: number;
    }[];
};
