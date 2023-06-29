import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { pasarBody, setClearLoading, setLoading } from "../actions/clientes";
import { fetchSinToken } from "../helpers/fetch";

export const useFormAutoSinToken = (initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const dispatch = useDispatch();
  
  const reset = (newFormState=initialState) => {
    setValues(newFormState);
  };

  const handleInputChange = ({ target }) => {
    let tienePunto = target.value.includes(".") ? true : false;
    let tieneComa = target.value.includes(",") ? true : false;
    if(tienePunto||tieneComa){
      return Swal.fire('Error','El DNI ingresado no puede contener caracteres como: . o ,','error');
    }
    if(target.value.length===8){
      const verificar = async() =>{
        dispatch(setLoading());
        const resp = await fetchSinToken(`clientes/verificardbsintoken/${target.value}`);
        const body = await resp.json();
        
        dispatch(setClearLoading());
        dispatch(pasarBody(body));
      }
      verificar();
    }
    setValues({
      ...values,
      [target.name]: target.value
    });
  };
  return [values, handleInputChange,reset];
};
