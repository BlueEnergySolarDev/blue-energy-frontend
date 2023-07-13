import { types } from "../types/types";

export const startSetCloser = (closer) => ({
  type: types.setCloser,
  payload: closer,
});