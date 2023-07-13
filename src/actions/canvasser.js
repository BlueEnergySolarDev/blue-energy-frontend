import { types } from "../types/types";

export const startSetCanvasser = (canvasser) => ({
  type: types.setCanvasser,
  payload: canvasser,
});