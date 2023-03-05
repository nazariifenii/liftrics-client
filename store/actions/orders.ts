import {
  SAVE_ORDER,
  DOWNLOAD_ALL_ORDERS_SUCCESS,
  DOWNLOAD_MY_ORDERS_SUCCESS,
  DELETE_ORDER_SUCCESS,
  SET_FILTER_FLAG
} from "./actionTypes";
import R from "ramda";
import { createChat } from "./index";
import { AppDispatch, RootState } from "store/store";

export type DownloadOrderData = {
  packageWeight: string[];
  packageSize: string[];
};

export const saveOrder = data => {
  return {
    type: SAVE_ORDER,
    data
  };
};

export const createOrder = data => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/orders", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (data.image) {
          dispatch(uploadOrderImage(data.image, parsedRes._id));
        }
        return parsedRes._id;
      })
      .then(orderId => {
        if (orderId) {
          dispatch(getOrderById(orderId));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("CREATING ORDER ERROR", err);
      });
  };
};

export const getOrderById = orderId => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/orders/" + orderId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(saveOrder(parsedRes));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("FETCHING ONE ORDER ERROR", err);
      });
  };
};

export const deleteOrder = orderId => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch(`https://liftrics.herokuapp.com/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(deleteOrderSuccess(parsedRes));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("DELETING ORDER ERROR", err);
      });
  };
};

export const deleteOrderSuccess = data => {
  return {
    type: DELETE_ORDER_SUCCESS,
    data
  };
};

export const uploadOrderImage = (imageUrl, orderId) => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    let formData = new FormData();
    formData.append("order-pic", {
      uri: imageUrl,
      type: "image/png",
      name: "photo.jpg"
    });
    fetch(`https://liftrics.herokuapp.com/orders/${orderId}/order-pic`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data"
      },
      body: formData
    })
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.warn("SAVE ORDER IMAGE ERROR", err);
      });
  };
};

export const downloadAllOrders = (filterOptions?: DownloadOrderData) => {
  let url = "https://liftrics.herokuapp.com/orders";
  if (filterOptions) {
    for (const [optionName, element] of Object.entries(filterOptions)) { // Add filter options to url params
      if (filterOptions.hasOwnProperty(optionName)) {
        if (!R.isEmpty(element)) {
          const startSign = url.split("?")[1] ? "&" : "?";
          url +=
            startSign +
            optionName +
            "=" +
            encodeURIComponent(JSON.stringify(element));
        }
      }
    }
  }
  return (dispatch: AppDispatch, getState: RootState) => {
    const token = getState().auth.userToken;
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (filterOptions) {
          dispatch(setFilterFlag(true));
        } else {
          dispatch(setFilterFlag(false));
        }
        dispatch(downloadAllOrdersSuccess(parsedRes));
      })
      .catch(err => {
        console.warn("DOWNLOAD ALL ORDERS ERROR", err);
      });
  };
};

export const downloadAllOrdersSuccess = ordersData => {
  return {
    type: DOWNLOAD_ALL_ORDERS_SUCCESS,
    ordersData
  };
};

export const setFilterFlag = value => {
  return {
    type: SET_FILTER_FLAG,
    value
  };
};

export const downloadMyOrdersSuccessByKey = (ordersData, key) => {
  return {
    type: DOWNLOAD_MY_ORDERS_SUCCESS,
    ordersData,
    key
  };
};

export const applyToOrder = orderId => {
  return (dispatch, getState) => {
    const driverId = getState().auth.userId;
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/orders/apply/" + orderId, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driverId })
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(saveOrder(parsedRes));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("APPLY TO ORDER ERROR", err);
      });
  };
};

export const getMyOrdersByKey = key => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.userToken;
    const path =
      key === "driver" ? `driverId=${userId}` : `creatorId=${userId}`;
    fetch("https://liftrics.herokuapp.com/orders?" + path, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        dispatch(downloadMyOrdersSuccessByKey(parsedRes, key));
      })
      .catch(err => {
        console.warn("GET MY ORDERS BY KEY ERROR", err);
      });
  };
};

export const submitDriver = (orderId, driverId) => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/orders/submitDriver/" + orderId, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driverId })
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(saveOrder(parsedRes));
          dispatch(createChat(driverId));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("SUBMIT DRIVER ERROR", err);
      });
  };
};

export const finishOrder = orderId => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    const authUserId = getState().auth.userId;
    fetch("https://liftrics.herokuapp.com/orders/finishOrder/" + orderId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ driverId: authUserId })
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(saveOrder(parsedRes));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("FINISH ORDER ERROR", err);
      });
  };
};
