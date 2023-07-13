import { types } from "../types/types";

const initialState = {
};

export const canvasserReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setCanvasser:
      return {
        ...state,
        canvasser: action.payload
      };
    default:
      return state;
  }
};
