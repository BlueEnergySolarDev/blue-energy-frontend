import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startAddSitDown = (email, password, namee, lastnamee) => {
  return async (dispatch) => {
    const role = 'CLOSER';
    const lastname = lastnamee.toUpperCase();
    const name = namee.toUpperCase();
    const resp = await fetchConToken(
      "auth/new",
      { email, password, name, lastname, role },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      Swal.fire("Success", "Register sucessfully", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};