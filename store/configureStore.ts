import { createStore, combineReducers, applyMiddleware, Store } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import authReducer from "./reducers/auth";
import uiReducer from "./reducers/ui";
import orderReducer from "./reducers/orders";
import usersReducer from "./reducers/users";
import chatReducer from "./reducers/chat";

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  order: orderReducer,
  users: usersReducer,
  chats: chatReducer
});

const middleware = [thunkMiddleware as ThunkMiddleware];

const configureStore = (): Store => {
  return createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(...middleware)));
};

export default configureStore;
