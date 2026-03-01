import { render, screen, waitFor } from '@testing-library/react';

import { MainPage } from './main-page';

describe('2.2 Reusing Logic with Custom Hooks', () => {
  it('2.2 Reusing Logic with Custom Hooks', async () => {
    // Так как в хуке useData будет использоваться обычный fetch, повешаем на него шпиона
    const fetchSpy = vi.spyOn(globalThis, 'fetch');

    render(<MainPage />);

    // Проверим отправку запроса за фильмами
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith('/api/movies');

    // Кнопка "Добавить фильм" не отображается
    expect(screen.queryByRole('button', { name: 'Добавить фильм' })).toBeNull();

    // Список фильмов не отображается. Просто проверим, что на странице нет никаких заголовков фильмов
    expect(screen.queryByRole('heading')).toBeNull();

    // Отображается лоудер
    expect(screen.getByRole('status')).toBeVisible();

    // Дожидаемся, когда лоудер пропадёт
    await waitFor(
      () => {
        expect(screen.queryByRole('status')).toBeNull();
      },
      { timeout: 1500 },
    );

    // Кнопка "Добавить фильм" отображается
    expect(
      screen.getByRole('button', { name: 'Добавить фильм' }),
    ).toBeVisible();

    // Список фильмов отображается. Просто проверим, что на странице 3 заголовка фильмов
    expect(screen.getAllByRole('heading')).toHaveLength(3);
  });
});
