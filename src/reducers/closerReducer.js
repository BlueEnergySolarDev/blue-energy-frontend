import { types } from "../types/types";

const initialState = {
};

export const closerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.setCloser:
      return {
        ...state,
        closer: action.payload
      };
    default:
      return state;
  }
};
