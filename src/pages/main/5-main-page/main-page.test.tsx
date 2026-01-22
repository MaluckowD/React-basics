import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MainPage } from './main-page';

describe.skip('2.1 Referencing Values with Refs | Manipulating the DOM with Refs | Effects', () => {
  const title = 'Довод';
  const year = 2020;
  const posterUrl =
    'https://image.openmoviedb.com/kinopoisk-images/4303601/b35131e0-041b-4ebc-af90-7104f2f75821/x1000';
  const description =
    'Протагонист пытается обезвредить террориста с помощью уникальной технологии. Блокбастер-пазл Кристофера Нолана';

  it('2.1 Начальное состояние приложения', async () => {
    render(<MainPage />);

    // Форма не отображается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Отображается кнопка "Добавить фильм"
    expect(
      screen.getByRole('button', { name: 'Добавить фильм' }),
    ).toBeVisible();

    // Проверим полностью данные всех 3 фильмов на экране
    expect(
      screen.getByRole('heading', { name: 'Интерстеллар', level: 4 }),
    ).toBeVisible();
    expect(screen.getByAltText('Интерстеллар (2014)')).toHaveAttribute(
      'src',
      'https://image.openmoviedb.com/kinopoisk-images/1600647/430042eb-ee69-4818-aed0-a312400a26bf/x1000',
    );
    expect(
      screen.getByText(
        'Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты',
      ),
    ).toBeVisible();

    expect(
      screen.getByRole('heading', { name: 'Начало', level: 4 }),
    ).toBeVisible();
    expect(screen.getByAltText('Начало (2010)')).toHaveAttribute(
      'src',
      'https://image.openmoviedb.com/kinopoisk-images/1629390/8ab9a119-dd74-44f0-baec-0629797483d7/x1000',
    );
    expect(
      screen.getByText(
        'Профессиональные воры внедряются в сон наследника огромной империи. Фантастический боевик Кристофера Нолана',
      ),
    ).toBeVisible();

    expect(
      screen.getByRole('heading', { name: 'Темный рыцарь', level: 4 }),
    ).toBeVisible();
    expect(screen.getByAltText('Темный рыцарь (2008)')).toHaveAttribute(
      'src',
      'https://image.openmoviedb.com/kinopoisk-images/1599028/0fa5bf50-d5ad-446f-a599-b26d070c8b99/x1000',
    );
    expect(
      screen.getByText(
        'У Бэтмена появляется новый враг — философ-террорист Джокер. Кинокомикс, который вывел жанр на новый уровень',
      ),
    ).toBeVisible();

    // На экране 3 кнопки "Добавить в избранное"
    expect(
      screen.getAllByRole('button', { name: 'Добавить в избранное' }),
    ).toHaveLength(3);

    // Никакой нотификации изначально не отображается
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('2.1 Автовыставление фокуса в поле "Название фильма" при открытии формы', async () => {
    render(<MainPage />);

    const user = userEvent.setup();

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Проверяем автовыставление фокуса в поле "Название фильма"
    expect(
      screen.getByRole('textbox', { name: 'Название фильма' }),
    ).toHaveFocus();
  });

  it('2.1 Кнопка "Отмена" очищает и закрывает форму', async () => {
    render(<MainPage />);

    const user = userEvent.setup();

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Заполняем форму данными
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

    // Нажимаем кнопку "Отмена"
    await user.click(screen.getByRole('button', { name: 'Отмена' }));

    // Форма не отображается
    expect(
      screen.queryByRole('form', {
        name: 'Форма добавления фильма',
      }),
    ).toBeNull();

    // Открываем форму опять
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Проверяем, что поля формы очистились
    expect(
      screen.getByRole('textbox', { name: 'Название фильма' }),
    ).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'Год' })).toHaveValue('');
    expect(screen.getByRole('textbox', { name: 'URL постера' })).toHaveValue(
      '',
    );
    expect(screen.getByRole('textbox', { name: 'Описание' })).toHaveValue('');
  });

  it('2.1 Фильм добавляется с нотификацией на 3 секунды', async () => {
    // Очень важно задать shouldAdvanceTime: true, иначе будет ошибка таймаута
    // https://github.com/testing-library/dom-testing-library/issues/987#issuecomment-1266266801
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(<MainPage />);

    // Тут важно выставить advanceTimers: vi.advanceTimersByTime, потому что мы используем fake timers
    // https://testing-library.com/docs/user-event/options#advancetimers
    // Иначе тест будет проходить больше 3 секунд и время не будет мотаться быстро через fake timers
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Заполняем форму данными
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

    // Добавляем фильм
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    // Нотификация отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Довод" добавлен!',
    );

    // Промотаем 2 секунды и 500 миллисекунд
    // Важно обернуть в act для стабильной перемотки фейк таймера
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Нотификация по-прежнему отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Довод" добавлен!',
    );

    // Промотаем ещё 1000 миллисекунд, чтобы прошло больше 3 секунд в целом
    // Важно обернуть в act для стабильной перемотки фейк таймера
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Нотификация больше не отображается
    expect(screen.queryByRole('alert')).toBeNull();

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

    // Есть совет, перед useRealTimers вызвать ещё и runOnlyPendingTimers в конце теста
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('2.1 Нотификация не закрывается досрочно', async () => {
    /**
     * В рамках этого теста проверим сценарий:
     * 1. Добавляем фильм - показывается нотификация
     * 2. Сразу же открываем форму - нотификация по-прежнему показывается
     * 3. Быстро закрываем форму кнопкой "Отмена" - нотификация по-прежнему показывается
     * 3. Опять быстро открываем форму, заполняем и отправляем - нотификация сменилась на новую
     * 4. Новая нотификация отображается 3 секунды и только потом закрывается
     */

    // Очень важно задать shouldAdvanceTime: true, иначе будет ошибка таймаута
    // https://github.com/testing-library/dom-testing-library/issues/987#issuecomment-1266266801
    vi.useFakeTimers({ shouldAdvanceTime: true });

    render(<MainPage />);

    // Тут важно выставить advanceTimers: vi.advanceTimersByTime, потому что мы используем fake timers
    // https://testing-library.com/docs/user-event/options#advancetimers
    // Иначе тест будет проходить больше 3 секунд и время не будет мотаться быстро через fake timers
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Заполняем форму данными
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

    // Добавляем фильм
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    // Нотификация отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Довод" добавлен!',
    );

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Нотификация отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Довод" добавлен!',
    );

    // Закрываем форму кнопкой "Отмена"
    await user.click(screen.getByRole('button', { name: 'Отмена' }));

    // Нотификация отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Довод" добавлен!',
    );

    // Открываем форму
    await user.click(screen.getByRole('button', { name: 'Добавить фильм' }));

    // Заполняем и отправляем форму ещё раз с новым фильмом
    await user.type(
      screen.getByRole('textbox', { name: 'Название фильма' }),
      'Дюнкерк',
    );
    await user.type(screen.getByRole('textbox', { name: 'Год' }), '2017');
    await user.type(
      screen.getByRole('textbox', { name: 'URL постера' }),
      'https://image.openmoviedb.com/kinopoisk-images/1773646/23ea826c-b42b-43ce-b203-01da70655aea/x1000',
    );
    await user.type(
      screen.getByRole('textbox', { name: 'Описание' }),
      'Союзные войска держат оборону в сужающемся окружении. Драма Кристофера Нолана по реальным событиям, 3 «Оскара»',
    );
    await user.click(screen.getByRole('button', { name: 'Добавить' }));

    // Текст нотификации сменился на новый
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Дюнкерк" добавлен!',
    );

    // Промотаем 2 секунды и 500 миллисекунд
    // Важно обернуть в act для стабильной перемотки фейк таймера
    act(() => {
      vi.advanceTimersByTime(2500);
    });

    // Нотификация по-прежнему отображается
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Фильм "Дюнкерк" добавлен!',
    );

    // Промотаем ещё 1000 миллисекунд, чтобы прошло больше 3 секунд в целом
    // Важно обернуть в act для стабильной перемотки фейк таймера
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // Нотификация больше не отображается
    expect(screen.queryByRole('alert')).toBeNull();

    // Есть совет, перед useRealTimers вызвать ещё и runOnlyPendingTimers в конце теста
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('2.1 Фильм добавляется и удаляется из избранного', async () => {
    render(<MainPage />);

    const user = userEvent.setup();

    // На экране пока нет никакой кнопки "Удалить из избранного", так как никакой из 3-ёх фильмов не в избранном
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

    // На экране 3 кнопки "Добавить в избранное"
    expect(
      screen.getAllByRole('button', { name: 'Добавить в избранное' }),
    ).toHaveLength(3);
  });
});
