import { getMovie } from './get-movie';

export const Movie = () => {
  const movie = getMovie();

  return (
    <div>
      <h4>{movie.title}</h4>
      {movie.year}
      <img
        src={movie.posterUrl}
        alt={`${movie.title} (${movie.year})`}
        style={{ width: '300px' }}
      ></img>
      <div>{movie.description}</div>
    </div>
  );
};
