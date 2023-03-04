import { REQUEST_STARTED, REQUEST_FINISHED } from "./actionTypes";

export const uiStartLoading = () => {
  return {
    type: REQUEST_STARTED
  };
};

export const uiFinishLoading = () => {
  return {
    type: REQUEST_FINISHED
  };
};
