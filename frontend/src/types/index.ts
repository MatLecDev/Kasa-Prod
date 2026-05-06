export interface User{
    id?: number;
    name: string;
    email?: string;
    picture?: string;
    role?: "owner" | "client" | "admin";
}

export interface Property{
    id: string;
    slug?: string;
    title: string;
    description: string;
    cover: string;
    location: string;
    price_per_night: number;
    rating_avg?: number;
    rating_count?:number;
    host_id?: number;
    host: User
    pictures?: [
        string
    ];
    equipments?: [
        string
    ]
    tags?: [
        string
    ]
}

export type Properties = Property[];



export interface ApiError{
    error: string;
}


