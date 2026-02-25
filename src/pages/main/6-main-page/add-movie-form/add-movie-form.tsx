import type { FormEventHandler } from 'react';
import { useEffect, useReducer, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button, Loading, Notification } from '@/components';

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
  const [state, dispatchMovieForm] = useReducer(addMovieFormReducer, {
    isShowForm: false,
    notification: '',
    title: '',
    year: '',
    posterUrl: '',
    description: '',
  });

  useEffect(() => {
    if (state.isShowForm) {
      titleFieldRef.current?.focus();
    }
  }, [state.isShowForm]);

  const titleFieldRef = useRef<HTMLInputElement>(null);

  const dispatch = useMoviesDispatch();

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
    dispatch({
      type: 'added',
      value: newMovie,
    });
    dispatchMovieForm({
      type: 'SUBMIT_FORM',
      notification: `Фильм "${state.title}" добавлен!`,
    });
  };

  useEffect(() => {
    if (!state.notification) {
      return;
    }
    const id = setTimeout(() => {
      dispatchMovieForm({
        type: 'UPDATE_FIELD',
        value: '',
        field: 'notification',
      });
    }, 3000);

    return () => {
      clearTimeout(id);
    };
  }, [state.notification]);

  const onCancel = () => dispatchMovieForm({ type: 'CLOSE_FORM' });
  const onAddMovieClick = () => dispatchMovieForm({ type: 'OPEN_FORM' });

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
              dispatchMovieForm({
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
              dispatchMovieForm({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'year',
              })
            }
            value={state.year}
          />
          <PosterUrlField
            onChange={(e) =>
              dispatchMovieForm({
                type: 'UPDATE_FIELD',
                value: e.target.value,
                field: 'posterUrl',
              })
            }
            value={state.posterUrl}
          />
          <DescriptionField
            onChange={(e) =>
              dispatchMovieForm({
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
      {state.notification &&
        createPortal(
          <Notification>{state.notification}</Notification>,
          document.body,
        )}
    </div>
  );
};
