import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (emaill, password) => {
  return async (dispatch) => {
    let email = emaill.toLowerCase();
    const body = await fetchSinToken("auth", { email, password }, "POST");
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
      dispatch(startGetUser(body.uid));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
export const startRegister = (email, password, namee, lastnamee, office) => {
  return async (dispatch) => {
    const role = 'office_manager';
    const lastname = lastnamee.toUpperCase();
    const name = namee.toUpperCase();
    const body = await fetchConToken(
      "auth/new",
      { email, password, name, lastname, role, office },
      "POST"
    );
    if (body.ok) {
      Swal.fire("Success", "Register successfully", "success");
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
      dispatch(startGetUser(body.uid));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startUpdateUser = (email, namee, lastnamee, office) => {
  return async (dispatch) => {
    let lastname = lastnamee.toUpperCase();
    let name = namee.toUpperCase();
    const body = await fetchConToken(
      `auth/edit`,
      { email, name, lastname, office },
      "PUT"
    );
    if (body.ok) {
      Swal.fire("Success", "Updated successfully", "success");
      dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
      dispatch(startGetUser(body.uid));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChangePassword = (id, password) => {
  return async (dispatch) => {
    const body = await fetchConToken(
      `auth/changepass/${id}`,
      { password },
      "PUT"
    );
    if (body.ok) {
      Swal.fire("Success", body.msg, "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startGetUser = (id) => {
  return async (dispatch) => {
    const body = await fetchConToken(`auth/${id}`);
    if (body.ok) {
      dispatch(startAsociar(body.user));
    } else {
      Swal.fire("Error", body.msg, "error");
    }

  };
};

export const startAsociar = (user) => ({
  type: types.userAsociar,
  payload: user,
});

export const startClearUserAsoc = () => ({
  type: types.startClearUserAsoc,
  payload: null,
});

export const startChecking = () => {
  return async (dispatch) => {
    const body = await fetchConToken("auth/renew");
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
      dispatch(startGetUser(body.uid));
    } else {
      dispatch(checkingFinish());
    }
  };
};
const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

export const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  }
}

const logout = () => ({
  type: types.authLogout
})

export const setRedirect = (redirect) => ({
  type: types.setRedirect,
  payload: redirect,
});