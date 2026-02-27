import { createContext, useContext, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';

import { getMovies } from './get-movies';
import type { MovieType } from './movies/types';

export const MoviesContext = createContext<MovieType[]>([]);
export const MoviesDispatchContext = createContext<Dispatch<MoviesAction>>(
  () => {},
);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const [movies, dispatch] = useReducer(moviesReducer, getMovies());
  return (
    <MoviesContext.Provider value={movies}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  return useContext(MoviesContext);
};

export const useMoviesDispatch = () => {
  return useContext(MoviesDispatchContext);
};

type MoviesAction =
  | { type: 'ADDED_MOVIE'; value: MovieType }
  | { type: 'FAVORITE_TOGGLED'; value: number };

function moviesReducer(state: MovieType[], action: MoviesAction): MovieType[] {
  switch (action.type) {
    case 'ADDED_MOVIE':
      return [...state, action.value];
    case 'FAVORITE_TOGGLED':
      return state.map((movie) =>
        movie.id === action.value
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie,
      );
    default:
      throw new Error('Unknown action');
  }
}
