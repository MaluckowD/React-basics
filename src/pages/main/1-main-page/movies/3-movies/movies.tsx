import { favorites } from './favorites';
import { getMovies } from './get-movies';
import { Movie } from './movie';

export const Movies = () => {
  const movies = getMovies();
  return (
    <div className="flex space-x-5">
      {movies.map((item) => {
        return (
          <Movie
            key={item.id}
            movie={item}
            isFavorite={favorites.has(item.id)}
          />
        );
      })}
    </div>
  );
};
