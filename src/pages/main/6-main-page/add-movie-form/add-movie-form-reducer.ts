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
) => {
  switch (action.type) {
    case 'SUBMIT_FORM': {
      state.isShowForm = false;
      state.notification = action.notification;
      state.title = '';
      state.year = '';
      state.posterUrl = '';
      state.description = '';
      break;
    }
    case 'UPDATE_FIELD': {
      state[action.field] = action.value;
      break;
    }

    case 'HIDE_NOTIFICATION': {
      state.notification = '';
      break;
    }

    case 'OPEN_FORM': {
      state.isShowForm = true;
      break;
    }

    case 'CLOSE_FORM': {
      state.isShowForm = false;
      state.title = '';
      state.description = '';
      state.posterUrl = '';
      state.year = '';
      break;
    }
    default:
      return state;
  }
};
