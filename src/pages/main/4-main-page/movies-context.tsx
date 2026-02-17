import { createContext, ReactNode, useContext, useReducer} from "react";
import { MovieType } from "./movies/types";
import { getMovies } from "./get-movies";
import type { Dispatch } from 'react';

export const MoviesContext = createContext<MovieType[]>([]);
export const MoviesDispatchContext = createContext<Dispatch<MoviesAction>>(() => {});

export const MoviesProvider = ({children}: {children: ReactNode}) => {
  const [movies, dispatch] = useReducer(moviesReducer, getMovies());
  return (
    <MoviesContext.Provider value={movies}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  )
};

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const useMoviesDispatch = () => {
  return useContext(MoviesDispatchContext);
};

type MoviesAction =
  | { type: "added"; value: MovieType }
  | { type: "favoriteToggled"; value: number }

function moviesReducer(state: MovieType[], action: MoviesAction): MovieType[] {
  console.log("ACTION:", action);

  switch (action.type) {
    case "added":
      return [...state, action.value];
    case "favoriteToggled":
      return state.map((movie) =>
        movie.id === action.value
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie
      );
    default:
      throw new Error("Unknown action");
  }
}
