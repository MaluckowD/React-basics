import { AddMovieForm } from './add-movie-form';
import { Movies } from './movies';
import { MoviesProvider } from './movies-context';

export const MainPage = () => {
  return (
    <div>
      <MoviesProvider>
        <AddMovieForm />
        <Movies />
      </MoviesProvider>
    </div>
  );
};
