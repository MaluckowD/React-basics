import type { FormEventHandler } from 'react';
import { useState } from 'react';

import { Button } from '@/components';

import type { MovieType } from '../movies/types';

import {
  DescriptionField,
  PosterUrlField,
  TitleField,
  YearField,
} from './form-fields';

export const AddMovieForm = (props: {
  onSubmit: (movie: MovieType) => void;
}) => {
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Math.round(Math.random() * 10000000),
      title,
      year: Number(year),
      posterUrl,
      description,
    };
    props.onSubmit(newMovie);
    setNotification(`Фильм "${title}" добавлен!`);
    setShowForm(false);
    setTitle('');
    setDescription('');
    setYear('');
    setPosterUrl('');
    setDescription('');
  };

  const onAddMovieClick = () => {
    setNotification('');
    setShowForm(true);
  };

  return (
    <div>
      {showForm && (
        <form
          aria-label="Форма добавления фильма"
          className="max-w-sm my-5"
          onSubmit={(e) => onSubmit(e)}
        >
          <TitleField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <YearField onChange={(e) => setYear(e.target.value)} value={year} />
          <PosterUrlField
            onChange={(e) => setPosterUrl(e.target.value)}
            value={posterUrl}
          />
          <DescriptionField
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <Button>Добавить</Button>
        </form>
      )}
      <div className="flex my-5 gap-x-4">
        {!showForm && (
          <Button type="button" onClick={onAddMovieClick}>
            Добавить фильм
          </Button>
        )}
        <div className="text-base">{notification}</div>
      </div>
    </div>
  );
};
