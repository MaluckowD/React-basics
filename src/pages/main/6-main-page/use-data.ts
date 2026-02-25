import { useEffect, useState } from 'react';

export const useData = () => {
  const [moviesData, setMoviesData] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`/api/movies`);
        const data = await response.json();
        setMoviesData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  return {
    moviesData,
  };
};
