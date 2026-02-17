import { useState } from 'react';
import { AddMovieForm } from './add-movie-form';
import { Movies } from './movies';
import { getMovies } from './get-movies';
import { MovieType } from './movies/types';

export const MainPage = () => {
  const [movies, setMovies] = useState<MovieType[]>(()=> getMovies());

  const onSubmit = (movie: MovieType) => {
    setMovies((prev) => ([ ...prev, movie ]))
  }

  return (
    <div>
      <AddMovieForm onSubmit = {onSubmit}/>
      <Movies movies = {movies}/>
    </div>
  );
};
