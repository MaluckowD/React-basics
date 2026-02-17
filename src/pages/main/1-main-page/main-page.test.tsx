import { render, screen } from '@testing-library/react';

import { MainPage } from './main-page';

describe('1.3 Understanding Your UI as a Tree', () => {
  it('1.3 Understanding Your UI as a Tree', async () => {
    render(<MainPage />);

    const addMovieForm = screen.getByRole('form', {
      name: 'Форма добавления фильма',
    });
    expect(addMovieForm).toBeVisible();

    const titleField = screen.getByLabelText('Название фильма');
    expect(titleField).toBeVisible();
    expect(titleField).toHaveAttribute('type', 'text');
    expect(titleField).toHaveAttribute(
      'placeholder',
      'Введите название фильма',
    );
    expect(titleField).toBeRequired();

    const yearField = screen.getByLabelText('Год');
    expect(yearField).toBeVisible();
    expect(yearField).toHaveAttribute('type', 'text');
    expect(yearField).toHaveAttribute('placeholder', 'Введите год');
    expect(yearField).toBeRequired();

    const posterUrlField = screen.getByLabelText('URL постера');
    expect(posterUrlField).toBeVisible();
    expect(posterUrlField).toHaveAttribute('type', 'text');
    expect(posterUrlField).toHaveAttribute(
      'placeholder',
      'Введите URL постера',
    );
    expect(posterUrlField).toBeRequired();

    const descriptionField = screen.getByLabelText('Описание');
    expect(descriptionField).toBeVisible();
    expect(descriptionField).toHaveAttribute('rows', '4');
    expect(descriptionField).toHaveAttribute('placeholder', 'Введите описание');
    expect(descriptionField).toBeRequired();

    const addButton = screen.getByRole('button', { name: 'Добавить' });
    expect(addButton).toBeVisible();
  });
});
