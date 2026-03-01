import type { ChangeEventHandler } from 'react';

export const YearField = ({
  onChange,
  value,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
}) => {
  return (
    <div className="mb-5">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="year"
      >
        Год
      </label>
      <input
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required
        onChange={onChange}
        value={value}
        id="year"
        type="text"
        placeholder="Введите год"
      />
    </div>
  );
};
