import { useEffect, useState } from 'react';

export const useData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [url]);

  return {
    data,
    loading,
  };
};
