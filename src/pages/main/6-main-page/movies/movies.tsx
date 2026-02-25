import { useMovies } from '../movies-context';

import { Movie } from './movie';

export const Movies = () => {
  const { moviesById } = useMovies();

  const moviesArray = Object.values(moviesById);

  return (
    <div className="flex space-x-5">
      {moviesArray.map((item) => (
        <Movie key={item.id} movie={item} />
      ))}
    </div>
  );
};
