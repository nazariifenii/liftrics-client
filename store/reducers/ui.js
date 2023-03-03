import { REQUEST_STARTED, REQUEST_FINISHED } from "../actions/actionTypes";

const INITIAL_STATE = { isLoading: false };

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_STARTED:
      return { ...state, isLoading: true };
    case REQUEST_FINISHED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
