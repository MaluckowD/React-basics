import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MainPage } from './main-page';

describe("1.4 Responding to Events | State. A Component's Memory", () => {
  it("1.4 Responding to Events | State. A Component's Memory", async () => {
    // Проверяем отображение кнопки, формы и нотификации после добавления фильма

    const user = userEvent.setup();

    render(<MainPage />);

    const title = 'Довод';
    const year = 2020;
    const posterUrl =
      'https://image.openmoviedb.com/kinopoisk-images/4303601/b35131e0-041b-4ebc-af90-7104f2f75821/x1000';
    const description =
      'Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана';

    const notificationText =
      'Добавляемый фильм - Название: "Довод", год: "2020", постер URL: "https://image.openmoviedb.com/kinopoisk-images/4303601/b35131e0-041b-4ebc-af90-7104f2f75821/x1000", описание: "Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана"';

    // Изначально форма не показывается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Нажимаем кнопку "Добавить фильм"
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Форма отображается
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Кнопка "Добавить фильм" скрылась
    expect(screen.queryByRole('button', { name: 'Добавить фильм' })).toBeNull();

    // Будем заполнять отдельно каждое поле и отправлять форму, чтобы проверить, что все поля обязательные
    const submitButton = screen.getByRole('button', { name: 'Добавить' });

    // Отправляем форму. Форма по-прежнему отображается
    await user.click(submitButton);
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Ввод Названия фильма происходит
    const titleField = screen.getByRole('textbox', { name: 'Название фильма' });
    await user.type(titleField, title);
    expect(titleField).toHaveValue('Довод');

    // Отправляем форму. Форма по-прежнему отображается
    await user.click(submitButton);
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Ввод Года происходит
    const yearField = screen.getByRole('textbox', { name: 'Год' });
    await user.type(yearField, String(year));
    expect(yearField).toHaveValue(String(year));

    // Отправляем форму. Форма по-прежнему отображается
    await user.click(submitButton);
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Ввод URL постера происходит
    const posterUrlField = screen.getByRole('textbox', { name: 'URL постера' });
    await user.type(posterUrlField, posterUrl);
    expect(posterUrlField).toHaveValue(posterUrl);

    // Отправляем форму. Форма по-прежнему отображается
    await user.click(submitButton);
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();

    // Ввод Описания происходит
    const descriptionField = screen.getByRole('textbox', { name: 'Описание' });
    await user.type(descriptionField, description);
    expect(descriptionField).toHaveValue(description);

    // Отправляем форму. Текст нотификации о добавлении фильма отображается
    await user.click(submitButton);
    expect(screen.getByText(notificationText)).toBeVisible();

    // Форма не отображается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Кнопка "Добавить фильм" снова отображается
    const addMovieButton = screen.getByRole('button', {
      name: 'Добавить фильм',
    });
    expect(addMovieButton).toBeVisible();

    // Нажмём ещё раз кнопку "Добавить фильм"
    await user.click(addMovieButton);

    // Отображается форма. Поля на форме подчистились после прошлого добавления
    expect(
      screen.getByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeVisible();
    expect(
      screen.getByRole('textbox', { name: 'Название фильма' }),
    ).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Год' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'URL постера' })).toHaveValue(
      '',
    );
    expect(screen.getByRole('textbox', { name: 'Описание' })).toHaveValue('');

    // Нотификация также подчистилась
    expect(screen.queryByText(notificationText)).toBeNull();
  });
});
