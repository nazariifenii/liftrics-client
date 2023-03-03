import { SAVE_CHAT } from "../actions/actionTypes";

const INITIAL_STATE = {
  userChats: [],
  currentChatId: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_CHAT:
      return { ...state, userChats: [...state.userChats, action.data] };
    default:
      return state;
  }
};

export default reducer;
