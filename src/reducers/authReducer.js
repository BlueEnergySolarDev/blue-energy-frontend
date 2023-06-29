import { types } from "../types/types";

const initialState = {
  checking: true,
  userAsoc: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        checking: false,
        ...action.payload,
      };
    case types.userAsociar:
      return {
        ...state,
        userAsoc: action.payload
      };
    case types.startClearUserAsoc:
      return {
        ...state,
        userAsoc: action.payload
      };
    case types.authCheckingFinish:
      return {
        ...state,
        checking: false,
      };
    case types.authLogout:
      return {
        checking: false,
      };
    default:
      return state;
  }
};
