import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";

export const startAddSitDown = (name, address, phone_number, email, proposal, reason, date, status, closer, canvasser, office) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "sitdowns",
      { name, address, phone_number, email, proposal, reason, date, status, closer, canvasser, office },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      Swal.fire("Success", "Sit down created", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};