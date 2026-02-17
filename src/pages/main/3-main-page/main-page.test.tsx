import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as addMovieFormModule from './add-movie-form/add-movie-form';
import * as getMoviesModule from './get-movies';
import { MainPage } from './main-page';
import * as moviesModule from './movies/movies';

describe('1.5 Updating Arrays in State | Sharing State Between Components', () => {
  it('1.5 Updating Arrays in State | Sharing State Between Components', async () => {
    // Проверяем отображение кнопки, формы и отбивки после "добавления"

    const user = userEvent.setup();

    const originalGetMovies = getMoviesModule.getMovies;

    const getMoviesWithSpy = vi.spyOn(getMoviesModule, 'getMovies');
    const AddMovieFormWithSpy = vi.spyOn(addMovieFormModule, 'AddMovieForm');
    const MoviesWithSpy = vi.spyOn(moviesModule, 'Movies');

    render(<MainPage />);

    // Проверим, что getMovies была вызвана для получения начального массива фильмов
    expect(getMoviesWithSpy).toHaveBeenCalledTimes(1);

    // Компонент AddMovieForm был вызван с пропсом onSubmit
    expect(AddMovieFormWithSpy).toHaveBeenCalledWith(
      { onSubmit: expect.any(Function) },
      {},
    );

    // Компонент Movies был вызван с пропсом movies, в котором был массив с фильмами из функции getMovies
    expect(MoviesWithSpy).toHaveBeenCalledWith(
      { movies: originalGetMovies() },
      {},
    );

    const title = 'Довод';
    const year = 2020;
    const posterUrl =
      'https://image.openmoviedb.com/kinopoisk-images/4303601/b35131e0-041b-4ebc-af90-7104f2f75821/x1000';
    const description =
      'Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана';

    // Изначально форма не показывается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Чтобы не проверять все данные всех фильмов, просто проверим, что на экране 3 картинки-постера
    expect(screen.getAllByRole('img')).toHaveLength(3);

    // Нажимаем кнопку "Добавить фильм"
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Форма отображается
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Кнопка "Добавить фильм" не отображается
    expect(screen.queryByRole('button', { name: 'Добавить фильм' })).toBeNull();

    // Заполним форму
    await user.type(
      screen.getByRole('textbox', { name: 'Название фильма' }),
      title,
    );
    await user.type(screen.getByRole('textbox', { name: 'Год' }), String(year));
    await user.type(
      screen.getByRole('textbox', { name: 'URL постера' }),
      posterUrl,
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Описание' }),
      description,
    );

    // Отправляем
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    // Нотификация отображается
    expect(screen.getByText('Фильм "Довод" добавлен!')).toBeVisible();

    // Форма не отображается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Кнопка "Добавить фильм" снова отображается
    expect(
      screen.getByRole('button', { name: 'Добавить фильм' }),
    ).toBeVisible();

    // Чтобы не проверять все данные всех фильмов, просто проверим, что на экране теперь 4 картинки-постера
    expect(screen.getAllByRole('img')).toHaveLength(4);

    // А только что добавленный новый фильм проверим полностью
    expect(
      screen.getByRole('heading', { name: title, level: 4 }),
    ).toBeVisible();
    expect(screen.getByAltText(`${title} (${year})`)).toHaveAttribute(
      'src',
      posterUrl,
    );
    expect(screen.getByText(description)).toBeVisible();
  });
});
