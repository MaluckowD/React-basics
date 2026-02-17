import type { MovieType } from './types';

type Props = {
  movie: MovieType;
  isFavorite: boolean;
};

export const Movie = ({ movie, isFavorite }: Props) => {
  return (
    <div className="max-w-72">
      <h4>
        {movie.title}
        {isFavorite && '\u2B50'}
      </h4>
      {movie.year}
      <img src={movie.posterUrl} alt={`${movie.title} (${movie.year})`}></img>
      <div className="text-base">{movie.description}</div>
    </div>
  );
};
