type addMoviesFormAction =
  | { type: 'OPEN_FORM' }
  | { type: 'CLOSE_FORM' }
  | { type: 'SUBMIT_FORM'; notification: string }
  | {
      type: 'UPDATE_FIELD';
      value: string;
      field: keyof Omit<addMoviesFormState, 'isShowForm'>;
    }
  | { type: 'HIDE_NOTIFICATION' };

type addMoviesFormState = {
  isShowForm: boolean;
  notification: string;
  title: string;
  year: string;
  posterUrl: string;
  description: string;
};

export const addMovieFormReducer = (
  state: addMoviesFormState,
  action: addMoviesFormAction,
): addMoviesFormState => {
  switch (action.type) {
    case 'SUBMIT_FORM': {
      return {
        isShowForm: false,
        notification: action.notification,
        title: '',
        year: '',
        posterUrl: '',
        description: '',
      };
    }
    case 'UPDATE_FIELD': {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case 'HIDE_NOTIFICATION': {
      return {
        ...state,
        notification: '',
      };
    }

    case 'OPEN_FORM': {
      return {
        ...state,
        isShowForm: true,
      };
    }

    case 'CLOSE_FORM': {
      return {
        ...state,
        isShowForm: false,
        title: '',
        year: '',
        posterUrl: '',
        description: '',
      };
    }
    default:
      return state;
  }
};
