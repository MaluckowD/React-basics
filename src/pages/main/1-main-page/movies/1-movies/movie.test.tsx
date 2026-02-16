import { render, screen } from '@testing-library/react';

import * as getMovieModule from './get-movie';
import { Movie } from './movie';

describe('1.1 JSX', () => {
  it('1.1.1 Writing Markup with JSX', () => {
    render(<Movie />);

    // h4 для названия фильма
    expect(
      screen.getByRole('heading', { name: 'Интерстеллар', level: 4 }),
    ).toBeVisible();

    // img с правильными src и alt
    expect(screen.getByAltText('Интерстеллар (2014)')).toHaveAttribute(
      'src',
      'https://image.openmoviedb.com/kinopoisk-images/1600647/430042eb-ee69-4818-aed0-a312400a26bf/x1000',
    );

    // Текст описания отображается на странице
    expect(
      screen.getByText(
        'Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты',
      ),
    ).toBeVisible();
  });

  it('1.1.2 JavaScript in JSX with Curly Braces', () => {
    const movie = getMovieModule.getMovie();

    // функция возвращает правильный объект с данными
    expect(movie).toEqual({
      title: 'Интерстеллар',
      year: 2014,
      posterUrl:
        'https://image.openmoviedb.com/kinopoisk-images/1600647/430042eb-ee69-4818-aed0-a312400a26bf/x1000',
      description:
        'Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты',
    });

    const getMovie = vi.spyOn(getMovieModule, 'getMovie');

    render(<Movie />);

    // Функция получения фильма была вызвана 1 раз, чтобы получить данные о фильме
    expect(getMovie).toHaveBeenCalledTimes(1);

    // Проверим отображение фильма на странице
    expect(
      screen.getByRole('heading', { name: 'Интерстеллар', level: 4 }),
    ).toBeVisible();

    const img = screen.getByAltText('Интерстеллар (2014)');
    expect(img).toHaveAttribute(
      'src',
      'https://image.openmoviedb.com/kinopoisk-images/1600647/430042eb-ee69-4818-aed0-a312400a26bf/x1000',
    );
    expect(img).toHaveStyle({ width: '300px' });

    expect(
      screen.getByText(
        'Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты',
      ),
    ).toBeVisible();
  });
});
