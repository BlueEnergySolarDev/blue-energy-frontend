import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { pasarBody } from "../actions/clientes";
import { fetchConToken } from "../helpers/fetch";

export const useFormAuto = (initialState = {}) => {
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
        const resp = await fetchConToken(`clientes/verificardb/${target.value}`);
        const body = await resp.json();
        dispatch(pasarBody(body));
      }
      verificar();
    }
    setValues({
      ...values,
      [target.name]: target.value
    });
  };

  // const handleInput = ( target,valuemod,target2,valuemod2,target3,valuemod3 ) => {
  //   setValues({
  //     ...values,
  //     [target.name]: valuemod ,
  //     [target2.name]: valuemod2 ,
  //     [target3.name]: valuemod3,
  //   });
  // };
  // const handleInput2 = ( target,valuemod ) => {
  //   setValues({
  //     ...values,
  //     [target.name]: valuemod ,
  //   });
  // };
  return [values, handleInputChange,reset];
};
