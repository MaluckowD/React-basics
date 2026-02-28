import { createContext, useContext, useEffect } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';

import type { MovieType } from './movies/types';
import { useData } from './use-data';

type MoviesState = {
  moviesById: Record<number, MovieType>;
};

type MoviesContextValue = {
  moviesById: Record<number, MovieType>;
  loading: boolean;
};

export const MoviesContext = createContext<MoviesContextValue>({
  moviesById: {},
  loading: true,
});

export const MoviesDispatchContext = createContext<Dispatch<MoviesAction>>(
  () => {},
);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useData<MovieType[]>(`/api/movies`);
  const [state, dispatch] = useImmerReducer(moviesReducer, { moviesById: {} });

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_MOVIES', value: data });
    }
  }, [data, dispatch]);
  return (
    <MoviesContext.Provider value={{ ...state, loading }}>
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
  | { type: 'SET_MOVIES'; value: MovieType[] }
  | { type: 'ADDED_MOVIE'; value: MovieType }
  | { type: 'FAVORITE_TOGGLED'; value: number };

function moviesReducer(state: MoviesState, action: MoviesAction) {
  switch (action.type) {
    case 'SET_MOVIES':
      state.moviesById = {};
      action.value.forEach((movie) => {
        state.moviesById[movie.id] = movie;
      });
      break;

    case 'ADDED_MOVIE':
      state.moviesById[action.value.id] = action.value;
      break;

    case 'FAVORITE_TOGGLED':
      if (state.moviesById[action.value]) {
        state.moviesById[action.value].isFavorite =
          !state.moviesById[action.value].isFavorite;
      }
      break;

    default:
      throw new Error('Unknown action');
  }
}
