import R from "ramda";
import {
  DOWNLOAD_USER_SUCCESS,
  DOWNLOAD_ALL_USERS_SUCCESS
} from "../actions/actionTypes";
import { ReduxUtils } from "../../utils";

const INITIAL_STATE = {
  userList: {},
  userIds: []
};

const reducer = (state = INITIAL_STATE, action) => {
  let normalizedData = {};
  switch (action.type) {
    case DOWNLOAD_USER_SUCCESS:
      normalizedData = ReduxUtils.normalizeArrayOfEntities([action.userData], {
        idField: "_id"
      });
      return {
        ...state,
        userList: R.mergeDeepLeft(
          normalizedData.entityById,
          state.userList || {}
        )
      };
    case DOWNLOAD_ALL_USERS_SUCCESS:
      normalizedData = ReduxUtils.normalizeArrayOfEntities(action.usersData, {
        idField: "_id"
      });
      return {
        ...state,
        userList: R.mergeDeepLeft(
          normalizedData.entityById,
          state.userList || {}
        ),
        userIds: normalizedData.ids
      };
    default:
      return state;
  }
};

export default reducer;
