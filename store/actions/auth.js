import { AsyncStorage } from "react-native";

import { uiStartLoading, uiFinishLoading, downloadContactById } from "./index";
import {
  TRY_AUTH,
  ADD_USER_TOKEN,
  ADD_USER_DATA,
  REMOVE_USER_DATA_FROM_STORE
} from "./actionTypes";

export const tryAuth = authData => {
  return dispatch => {
    dispatch(authSignIn(authData));
  };
};

export const authSignIn = authData => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch("https://liftrics.herokuapp.com/users/login", {
      method: "POST",
      body: JSON.stringify({
        phoneNumber: authData.phone,
        password: authData.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        dispatch(uiFinishLoading());
        return res.json();
      })
      .then(parsedRes => {
        dispatch(uiFinishLoading());
        if (parsedRes.errors) {
          console.log(parsedRes.message);
        } else {
          const token = parsedRes.token;
          const userId = parsedRes.user._id;
          if (token && userId) {
            dispatch(authStoreToken(token));
            dispatch(saveUserData(userId));
            dispatch(downloadContactById(userId));
          }
        }
      })
      .catch(err => {
        dispatch(uiFinishLoading());
        console.warn("LOGIN ERROR", err);
      });
  };
};

export const doSignUp = registrationData => {
  return dispatch => {
    // dispatch(registerInProgress());
    fetch("https://liftrics.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify({
        firstName: registrationData.firstName,
        lastName: registrationData.lastName,
        phoneNumber: registrationData.phoneNumber,
        password: registrationData.password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        // dispatch(registerInProgress());
        console.log(err);
      })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes.errors) {
          console.log(parsedRes.message);
        } else {
          const token = parsedRes.token;
          if (token) {
            dispatch(authStoreToken(token));
          }
        }
      });
  };
};

export const authStoreToken = token => {
  return dispatch => {
    dispatch(saveToken(token));
    AsyncStorage.setItem("auth-token", token);
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.userToken;
      const userId = getState().auth.userId;
      if (!token && !userId) {
        AsyncStorage.getItem("auth-token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            if (!tokenFromStorage) {
              reject();
              return;
            }
            dispatch(saveToken(tokenFromStorage));
            resolve(tokenFromStorage);
          });

        AsyncStorage.getItem("auth-id")
          .catch(err => reject())
          .then(idFromStorage => {
            if (!idFromStorage) {
              reject();
              return;
            }
            dispatch(saveUserData(idFromStorage));
            resolve(idFromStorage);
          });
      } else {
        resolve(token);
      }
    });
    return promise;
  };
};

export const saveToken = data => {
  return {
    type: ADD_USER_TOKEN,
    data
  };
};

const saveUserData = data => {
  AsyncStorage.setItem("auth-id", data);
  return {
    type: ADD_USER_DATA,
    data
  };
};

export const authAutoSignIn = navigation => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        navigation.navigate("Main");
      })
      .catch(err => console.log("Failed to fetch token", err));
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/users/logout", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => {
        if (res.status === 200) {
          AsyncStorage.removeItem("auth-token");
          AsyncStorage.removeItem("auth-id");
          dispatch(removeUserDataFromStore());
        }
      });
  };
};

export const removeUserDataFromStore = () => {
  return {
    type: REMOVE_USER_DATA_FROM_STORE
  };
};
