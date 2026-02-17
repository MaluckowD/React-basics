import { favorites } from './favorites';
import { Movie } from './movie';
import type { MovieType } from './types';

export const Movies = ({ movies }: { movies: MovieType[] }) => {
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
