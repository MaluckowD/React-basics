import { Button } from '@/components';

import {
  DescriptionField,
  PosterUrlField,
  TitleField,
  YearField,
} from './form-fields';

export const AddMovieForm = () => {
  return (
    <form aria-label="Форма добавления фильма" className="max-w-sm my-5">
      <TitleField />
      <YearField />
      <PosterUrlField />
      <DescriptionField />
      <Button>Добавить</Button>
    </form>
  );
};
