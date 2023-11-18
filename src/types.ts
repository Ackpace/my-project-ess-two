export interface VideoType {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TVObjectType {
    backdrop_path: string,
    first_air_date: string,
    genre_ids: [],
    id: number,
    name: string,
    origin_country: [],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    vote_average: number,
    vote_count: number,
    genres: { id: number, name: string }[],
    tagline: string,
}

export interface TVWithRateType {
    contentData: TVObjectType,
    rating: string
}
 
export interface MovieObjectType {
    backdrop_path: string,
    poster_path: string,
    title: string,
    release_date: string,
    genres: { id: number, name: string }[],
    runtime: number,
    vote_average: number,
    overview: string,
    tagline: string,
    id: number
}

export interface MovieWithRateType {
    contentData: MovieObjectType,
    rating: string
}

export enum PlatformTypes {
    tv,
    movie
}

export type DataType = {
    page: number;
    results: Array<VideoType>;
    total_pages: number;
    total_results: number;
}

export interface GenreType {
    id: number,
    name: string
}