import { createContext, useContext, useEffect } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { useImmerReducer } from 'use-immer';

import type { MovieType } from './movies/types';
import { useData } from './use-data';

type MoviesState = {
  moviesById: Record<number, MovieType>;
  isLoading: boolean;
};
export const MoviesContext = createContext<MoviesState>({
  moviesById: {},
  isLoading: true,
});
export const MoviesDispatchContext = createContext<Dispatch<MoviesAction>>(
  () => {},
);

export const MoviesProvider = ({ children }: { children: ReactNode }) => {
  const { moviesData } = useData();
  const [state, dispatch] = useImmerReducer(moviesReducer, {
    moviesById: {},
    isLoading: true,
  });

  useEffect(() => {
    if (!moviesData) {
      dispatch({ type: 'loadingStarted' });
      return;
    }

    dispatch({ type: 'moviesLoaded', value: moviesData });
  }, [moviesData, dispatch]);
  return (
    <MoviesContext.Provider value={state}>
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
  | { type: 'loadingStarted' }
  | { type: 'moviesLoaded'; value: MovieType[] }
  | { type: 'added'; value: MovieType }
  | { type: 'favoriteToggled'; value: number };

function moviesReducer(draft: MoviesState, action: MoviesAction) {
  switch (action.type) {
    case 'loadingStarted':
      draft.isLoading = true;
      break;

    case 'moviesLoaded':
      draft.isLoading = false;
      draft.moviesById = {};
      action.value.forEach((movie) => {
        draft.moviesById[movie.id] = movie;
      });
      break;

    case 'added':
      draft.moviesById[action.value.id] = action.value;
      break;

    case 'favoriteToggled':
      if (draft.moviesById[action.value]) {
        draft.moviesById[action.value].isFavorite =
          !draft.moviesById[action.value].isFavorite;
      }
      break;

    default:
      throw new Error('Unknown action');
  }
}
