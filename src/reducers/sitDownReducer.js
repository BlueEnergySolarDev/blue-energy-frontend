import { types } from "../types/types";

const initialState = {
};

export const sitDownReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.sitDownSelected:
      return {
        ...state,
        sitDownSelected: action.payload
      };
    default:
      return state;
  }
};
