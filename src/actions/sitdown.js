import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

// export const startAddSitDown = (name, address, phone_number, email, reason, date, status, closer, canvasser, office ,user) => {
//   return async (dispatch) => {
//     const body = await fetchConToken(
//       "sitdowns",
//       { name, address, phone_number, email, reason, date, status, closer, canvasser, office, user },
//       "POST"
//     );
//     if (body.ok) {
//       Swal.fire("Success", "Sit down created", "success");
//     } else {
//       Swal.fire("Error", body.msg, "error");
//     }
//   };
// };

export const startSetSitDown = (sitDown) => ({
  type: types.sitDownSelected,
  payload: sitDown,
});