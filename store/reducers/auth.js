import {
  ADD_USER_TOKEN,
  ADD_USER_DATA,
  REMOVE_USER_DATA_FROM_STORE
} from "../actions/actionTypes";

const INITIAL_STATE = {
  userToken: "",
  userId: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_USER_TOKEN:
      return { ...state, userToken: action.data };
    case ADD_USER_DATA:
      return { ...state, userId: action.data };
    case REMOVE_USER_DATA_FROM_STORE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default reducer;
