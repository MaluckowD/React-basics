import { Button } from '@/components';

import { useMoviesDispatch } from '../movies-context';

import type { MovieType } from './types';

type Props = {
  movie: MovieType;
};

export const Movie = ({ movie }: Props) => {
  const dispatch = useMoviesDispatch();
  const favoriteToggle = () => {
    dispatch({
      type: 'favoriteToggled',
      value: movie.id,
    });
  };
  return (
    <div className="max-w-72">
      <h4>
        {movie.title}
        {movie.isFavorite && '\u2B50'}
      </h4>
      {movie.year}
      <img src={movie.posterUrl} alt={`${movie.title} (${movie.year})`}></img>
      <Button onClick={favoriteToggle} type="button">
        {movie.isFavorite ? 'Удалить из избранного' : ' Добавить в избранное'}
      </Button>
      <div className="text-base">{movie.description}</div>
    </div>
  );
};
