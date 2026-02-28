import type { FormEventHandler } from 'react';
import { useEffect, useReducer, useRef } from 'react';

import { Button, NotificationPortal } from '@/components';
import { INITIAL_MOVIE_FORM_STATE } from '@/constants/initial-movie-form-state';

import { useMoviesDispatch } from '../movies-context';

import type { addMovieFormState } from './add-movie-form-reducer';
import { addMovieFormReducer } from './add-movie-form-reducer';
import {
  DescriptionField,
  PosterUrlField,
  TitleField,
  YearField,
} from './form-fields';

export const AddMovieForm = () => {
  const [
    { isShowForm, notification, year, title, posterUrl, description },
    formDispatch,
  ] = useReducer(addMovieFormReducer, INITIAL_MOVIE_FORM_STATE);

  useEffect(() => {
    if (isShowForm) {
      titleFieldRef.current?.focus();
    }
  }, [isShowForm]);

  const titleFieldRef = useRef<HTMLInputElement>(null);

  const moviesDispatch = useMoviesDispatch();

  const handleFieldChange =
    (field: keyof Omit<addMovieFormState, 'isShowForm'>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      formDispatch({
        type: 'UPDATE_FIELD',
        field,
        value: e.target.value,
      });
    };

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Math.round(Math.random() * 10000000),
      title,
      year: Number(year),
      posterUrl,
      description,
      isFavorite: false,
    };
    moviesDispatch({
      type: 'ADDED_MOVIE',
      value: newMovie,
    });
    formDispatch({
      type: 'SUBMIT_FORM',
      notification: `Фильм "${title}" добавлен!`,
    });
  };

  useEffect(() => {
    if (!notification) {
      return;
    }
    const id = setTimeout(() => {
      formDispatch({
        type: 'UPDATE_FIELD',
        value: '',
        field: 'notification',
      });
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [notification]);

  const onCancel = () => formDispatch({ type: 'CLOSE_FORM' });
  const onAddMovieClick = () => formDispatch({ type: 'OPEN_FORM' });

  return (
    <div>
      {isShowForm && (
        <form
          aria-label="Форма добавления фильма"
          className="max-w-sm my-5"
          onSubmit={onSubmit}
        >
          <TitleField
            onChange={handleFieldChange('title')}
            value={title}
            ref={titleFieldRef}
          />
          <YearField onChange={handleFieldChange('year')} value={year} />
          <PosterUrlField
            onChange={handleFieldChange('posterUrl')}
            value={posterUrl}
          />
          <DescriptionField
            onChange={handleFieldChange('description')}
            value={description}
          />
          <div className="flex my-5 gap-x-4">
            <Button onClick={onCancel}>Отмена</Button>
            <Button>Добавить</Button>
          </div>
        </form>
      )}
      <div className="flex my-5 gap-x-4">
        {!isShowForm && (
          <Button type="button" onClick={onAddMovieClick}>
            Добавить фильм
          </Button>
        )}
      </div>
      {notification && <NotificationPortal>{notification}</NotificationPortal>}
    </div>
  );
};
