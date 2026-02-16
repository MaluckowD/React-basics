import { favorites } from './favorites';
import { getFirstMovie, getSecondMovie, getThirdMovie } from './getters';
import { Movie } from './movie';

export const Movies = () => {
  const firstMovie = getFirstMovie();
  const secondMovie = getSecondMovie();
  const thirdMovie = getThirdMovie();
  return (
    <div className="flex space-x-5">
      <Movie movie={firstMovie} isFavorite={favorites.has(firstMovie.id)} />
      <Movie movie={secondMovie} isFavorite={favorites.has(secondMovie.id)} />
      <Movie movie={thirdMovie} isFavorite={favorites.has(thirdMovie.id)} />
    </div>
  );
};
