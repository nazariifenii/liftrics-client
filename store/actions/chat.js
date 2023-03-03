import { SAVE_CHAT } from "./actionTypes";

export const createChat = driverId => {
  return (dispatch, getState) => {
    const token = getState().auth.userToken;
    const userId = getState().auth.userId;
    fetch("https://liftrics.herokuapp.com/chats", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ customerId: userId, driverId })
    })
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        if (parsedRes._id) {
          dispatch(saveChat(parsedRes));
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        console.warn("CREATING ORDER ERROR", err);
      });
  };
};

export const saveChat = data => {
  return {
    type: SAVE_CHAT,
    data
  };
};
