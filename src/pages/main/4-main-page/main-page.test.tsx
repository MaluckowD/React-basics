import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as addMovieFormModule from './add-movie-form/add-movie-form';
import { getMovies } from './get-movies';
import { MainPage } from './main-page';
import * as moviesModule from './movies/movies';
import * as moviesContextModule from './movies-context';

describe('1.6 Scaling Up with Reducer and Context', () => {
  it('1.6 Scaling Up with Reducer and Context', async () => {
    // Проверяем добавление нового фильма и работу тогла избранного

    const user = userEvent.setup();

    // Вешаем шпионов на компоненты
    const MoviesProviderWithSpy = vi.spyOn(
      moviesContextModule,
      'MoviesProvider',
    );
    const AddMovieFormWithSpy = vi.spyOn(addMovieFormModule, 'AddMovieForm');
    const MoviesWithSpy = vi.spyOn(moviesModule, 'Movies');

    // Вешаем шпиона на хук получения фильмов из контекста
    const useMoviesWithSpy = vi.spyOn(moviesContextModule, 'useMovies');

    render(<MainPage />);

    // Проверим, что MoviesProvider использовался
    expect(MoviesProviderWithSpy).toHaveBeenCalledTimes(1);

    //  AddMovieForm и Movies использовались без пропсов
    expect(AddMovieFormWithSpy).toHaveBeenCalledWith({}, {});
    expect(MoviesWithSpy).toHaveBeenCalledWith({}, {});

    // Проверим, что useMovies вызывался 1 раз и вернул правильные данные
    // Значит фильмы забирали из контекста для отображения
    expect(useMoviesWithSpy).toHaveReturnedTimes(1);
    expect(useMoviesWithSpy).toHaveNthReturnedWith(
      1,
      getMovies().map((movie) => ({ ...movie, isFavorite: false })),
    );

    // Чтобы не проверять все данные всех фильмов, просто проверим, что на экране 3 картинки-постера
    expect(screen.getAllByRole('img')).toHaveLength(3);

    // Теперь добавим фильм
    const title = 'Довод';
    const year = 2020;
    const posterUrl =
      'https://image.openmoviedb.com/kinopoisk-images/4303601/b35131e0-041b-4ebc-af90-7104f2f75821/x1000';
    const description =
      'Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана';

    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));
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
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    // Нотификация после добавления отображается
    expect(screen.getByText('Фильм "Довод" добавлен!')).toBeVisible();

    // Форма не отображается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Чтобы не проверять все данные всех фильмов, просто проверим, что на экране 4 картинки
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

    // Проверим добавление и удаление из избранного первого фильма

    // На экране пока нет никакой кнопки "Удалить из избранного", так как никакой из 4-ёх фильмов не в избранном
    expect(
      screen.queryByRole('button', { name: 'Удалить из избранного' }),
    ).toBeNull();

    // Тайтл первого фильма без звездочки избранного
    expect(screen.getByRole('heading', { name: 'Интерстеллар' })).toBeVisible();

    // Интерстеллар - это первый фильм, поэтому просто нажмем на первую кнопку "Добавить в избранное"
    await user.click(
      screen.getAllByRole('button', { name: 'Добавить в избранное' })[0],
    );

    // Теперь на странице есть кнопка "Удалить из избранного".
    // Чтобы не накручивать сложности и не проверять её внутри "карточки", проверим, что кнопка просто есть на экране
    expect(
      screen.getByRole('button', { name: 'Удалить из избранного' }),
    ).toBeVisible();

    // Тайтл первого фильма теперь имеет звездочку избранного справа от названия
    expect(
      screen.getByRole('heading', { name: 'Интерстеллар⭐' }),
    ).toBeVisible();

    // Нажимаем на "Удалить из избранного"
    await user.click(
      screen.getByRole('button', { name: 'Удалить из избранного' }),
    );

    // Тайтл опять без звездочки
    expect(screen.getByRole('heading', { name: 'Интерстеллар' })).toBeVisible();

    // Кнопки "Удалить из избранного" нет
    expect(
      screen.queryByRole('button', { name: 'Удалить из избранного' }),
    ).toBeNull();

    // На экране 4 кнопки "Добавить в избранное"
    expect(
      screen.getAllByRole('button', { name: 'Добавить в избранное' }),
    ).toHaveLength(4);
  });
});
