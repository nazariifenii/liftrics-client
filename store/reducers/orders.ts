import R from "ramda";
import {
  SAVE_ORDER,
  DOWNLOAD_ALL_ORDERS_SUCCESS,
  DOWNLOAD_MY_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SET_FILTER_FLAG
} from "../actions/actionTypes";
import { ReduxUtils, RamdaUtils } from "../../utils";

const INITIAL_STATE = {
  ordersIds: [],
  ordersDataById: {},
  myOrdersIdsByKey: {
    driver: [],
    creator: []
  },
  filter: {
    useFilter: false,
    weight: [],
    size: []
  }
};

const reducer = (state = INITIAL_STATE, action) => {
  let normalizedData = {};
  switch (action.type) {
    case SAVE_ORDER:
      normalizedData = ReduxUtils.normalizeArrayOfEntities([action.data], {
        idField: "_id"
      });
      return {
        ...state,
        ordersDataById: R.mergeDeepLeft(
          normalizedData.entityById,
          state.ordersDataById || {}
        ),
        ordersIds: RamdaUtils.toggleItem(
          normalizedData.ids[0],
          state.ordersIds || {}
        )
      };
    case DOWNLOAD_ALL_ORDERS_SUCCESS:
      normalizedData = ReduxUtils.normalizeArrayOfEntities(action.ordersData, {
        idField: "_id"
      });
      return {
        ...state,
        ordersDataById: R.mergeDeepLeft(
          normalizedData.entityById,
          state.ordersDataById || {}
        ),
        ordersIds: normalizedData.ids
      };
    case DOWNLOAD_MY_ORDERS_SUCCESS:
      normalizedData = ReduxUtils.normalizeArrayOfEntities(action.ordersData, {
        idField: "_id"
      });
      return {
        ...state,
        myOrdersIdsByKey: {
          ...state.myOrdersIdsByKey,
          [action.key]: normalizedData.ids
        },
        ordersDataById: R.mergeDeepLeft(
          normalizedData.entityById,
          state.ordersDataById || {}
        )
      };
    case DELETE_ORDER_SUCCESS:
      normalizedData = ReduxUtils.normalizeArrayOfEntities([action.data], {
        idField: "_id"
      });
      const ordersIds = state.ordersIds.filter(item => {
        return item !== normalizedData.ids[0];
      });
      const myOrdersIdsByKey = {
        driver: state.myOrdersIdsByKey.driver.filter(item => {
          return item !== normalizedData.ids[0];
        }),
        creator: state.myOrdersIdsByKey.creator.filter(item => {
          return item !== normalizedData.ids[0];
        })
      };
      // TODO: Add deletion an parameter from object
      return {
        ...state,
        myOrdersIdsByKey,
        ordersIds
      };

    case SET_FILTER_FLAG:
      return {
        ...state,
        filter: {
          useFilter: action.value
        }
      };
      return;
    default:
      return state;
  }
};

export default reducer;
