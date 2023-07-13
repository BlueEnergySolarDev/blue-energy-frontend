import { types } from "../types/types";

const initialState = {
  modalOpen: false,
  modalOpenn: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.uiOpenModal:
      return {
        ...state,
        modalOpen: true,
      };
    case types.uiCloseModal:
      return {
        ...state,
        modalOpen: false,
      };
    case types.uiOpenModall:
      return {
        ...state,
        modalOpenn: true,
      };
    case types.uiCloseModall:
      return {
        ...state,
        modalOpenn: false,
      };

    default:
      return state;
  }
};
