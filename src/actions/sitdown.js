import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";

export const startAddSitDown = (name, address, phone_number, email, reason, date, status, closer, canvasser, office) => {
  return async (dispatch) => {
    const body = await fetchConToken(
      "sitdowns",
      { name, address, phone_number, email, reason, date, status, closer, canvasser, office },
      "POST"
    );
    if (body.ok) {
      Swal.fire("Success", "Sit down created", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};