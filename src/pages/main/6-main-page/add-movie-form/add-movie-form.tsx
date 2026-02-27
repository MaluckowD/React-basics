import type { FormEventHandler } from 'react';
import { useEffect, useReducer, useRef } from 'react';

import { Button, Loading, NotificationPortal } from '@/components';
import { INITIAL_MOVIE_FORM_STATE } from '@/constants/initial-movie-form-state';

import { useMovies, useMoviesDispatch } from '../movies-context';

import { addMovieFormReducer } from './add-movie-form-reducer';
import {
  DescriptionField,
  PosterUrlField,
  TitleField,
  YearField,
} from './form-fields';

export const AddMovieForm = () => {
  const { isLoading } = useMovies();
  const [state, formDispatch] = useReducer(
    addMovieFormReducer,
    INITIAL_MOVIE_FORM_STATE,
  );

  useEffect(() => {
    if (state.isShowForm) {
      titleFieldRef.current?.focus();
    }
  }, [state.isShowForm]);

  const titleFieldRef = useRef<HTMLInputElement>(null);

  const moviesDispatch = useMoviesDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Math.round(Math.random() * 10000000),
      title: state.title,
      year: Number(state.year),
      posterUrl: state.posterUrl,
      description: state.description,
      isFavorite: false,
    };
    moviesDispatch({
      type: 'ADDED_MOVIE',
      value: newMovie,
    });
    formDispatch({
      type: 'SUBMIT_FORM',
      notification: `Фильм "${state.title}" добавлен!`,
    });
  };

  useEffect(() => {
    if (!state.notification) {
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
  }, [state.notification]);

  const onCancel = () => formDispatch({ type: 'CLOSE_FORM' });
  const onAddMovieClick = () => formDispatch({ type: 'OPEN_FORM' });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {state.isShowForm && (
        <form
          aria-label="Форма добавления фильма"
          className="max-w-sm my-5"
          onSubmit={(e) => onSubmit(e)}
        >
          <TitleField
            onChange={(e) =>
              formDispatch({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'title',
              })
            }
            value={state.title}
            ref={titleFieldRef}
          />
          <YearField
            onChange={(e) =>
              formDispatch({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'year',
              })
            }
            value={state.year}
          />
          <PosterUrlField
            onChange={(e) =>
              formDispatch({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'posterUrl',
              })
            }
            value={state.posterUrl}
          />
          <DescriptionField
            onChange={(e) =>
              formDispatch({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'description',
              })
            }
            value={state.description}
          />
          <div className="flex my-5 gap-x-4">
            <Button onClick={onCancel}>Отмена</Button>
            <Button>Добавить</Button>
          </div>
        </form>
      )}
      <div className="flex my-5 gap-x-4">
        {!state.isShowForm && (
          <Button type="button" onClick={onAddMovieClick}>
            Добавить фильм
          </Button>
        )}
      </div>
      {state.notification && (
        <NotificationPortal children={state.notification} />
      )}
    </div>
  );
};
