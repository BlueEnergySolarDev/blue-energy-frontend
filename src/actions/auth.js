import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (emaill, password) => {
  return async (dispatch) => {
    let email = emaill.toLowerCase();
    const resp = await fetchSinToken("auth", { email, password }, "POST");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, nombre: body.nombre, rol: body.rol, maxFree: body.maxFree, acctok: body.acctok, pubkey: body.pubkey, vendedorid: body.vendedorid }));
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};
export const startRegister = (dni, email, password, nombree, apellidoo, comisionEnt, roll, comisionRRPP, rrppp, maxFree, eventoo, uid) => {
  return async (dispatch) => {
    let rol;
    if (roll.value === "ESPECIAL") {
      rol = "ESPECIAL";
    } else {
      rol = "RRPP";
    }
    const estado = true;
    const rrpp = rrppp.value;
    const rrppNombre = rrppp.label;
    const evento = eventoo.value;
    const eventoNombre = eventoo.label;
    const rolEvento = roll.value;
    const passwordShow = password;
    const online = false;
    const uidadmin = uid;
    let apellido = apellidoo.toUpperCase();
    let nombre = nombree.toUpperCase();
    //const evento = eventoo.value;
    const resp = await fetchConToken(
      "auth/new",
      { email, password, passwordShow, nombre, apellido, rol, dni, estado, comisionEnt, comisionRRPP, rrpp, maxFree, evento, eventoNombre, rolEvento, rrppNombre, online, uidadmin },
      "POST"
    );
    const body = await resp.json();
    if (body.ok) {
      // dispatch(Asociar(body.uid, evento));
      Swal.fire("Exito", "RRPP Cargado con exito", "success");
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startAsociar = (uid) => ({
  type: types.userAsociar,
  payload: uid,
});
export const startClearUserAsoc = () => ({
  type: types.startClearUserAsoc,
  payload: null,
});

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();
    if (body.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(login({ uid: body.uid, nombre: body.nombre, rol: body.rol, acctok: body.acctok, pubkey: body.pubkey, vendedorid: body.vendedorid }));
    } else {
      //Swal.fire("Error", body.msg, "error");
      dispatch(checkingFinish());
    }
  };
};
const checkingFinish = () => ({
  type: types.authCheckingFinish,
});

const login = (user) => ({
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
