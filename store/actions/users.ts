import {
  DOWNLOAD_USER_SUCCESS,
  DOWNLOAD_ALL_USERS_SUCCESS
} from "./actionTypes";
import { saveOrder } from "./index";

export const downloadUserSuccess = userData => {
  return {
    type: DOWNLOAD_USER_SUCCESS,
    userData
  };
};

export const downloadAllUsersSuccess = usersData => {
  return {
    type: DOWNLOAD_ALL_USERS_SUCCESS,
    usersData
  };
};

export const downloadContactById = contactId => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/users/" + contactId, {
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
        dispatch(downloadUserSuccess(parsedRes));
      })
      .catch(err => {
        console.warn("DOWNLOAD CONTACT BY ID ERROR", err);
      });
  };
};

export const saveUserImage = imageUri => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    let formData = new FormData();
    formData.append("profile-pic", {
      uri: imageUri,
      type: "image/png",
      name: "photo.jpg"
    });
    fetch("https://liftrics.herokuapp.com/users/me/profile-pic", {
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
      .then(parsedRes => {
        dispatch(downloadUserSuccess(parsedRes));
      })
      .catch(err => {
        console.warn("SAVE USER IMAGE ERROR", err);
      });
  };
};

export const downloadAllUsers = () => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/users/", {
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
        dispatch(downloadAllUsersSuccess(parsedRes));
      })
      .catch(err => {
        console.warn("DOWNLOAD ALL USERS ERROR", err);
      });
  };
};

export const leaveFeedback = (userId, orderId, leftRating) => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    fetch("https://liftrics.herokuapp.com/users/leaveFeedback/" + userId, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ leftRating, orderId })
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
        console.warn("LEAVING FEEDBACK ERROR", err);
      });
  };
};
