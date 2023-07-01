import React from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startAddSitDown } from '../../actions/sitdown';

export const AddSitDown = () => {
  const { uid } = useSelector((state) => state.auth);
  const [date, setDate] = useState(new Date);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formEventoValues, handleEventoInputChange] = useForm({
    eNombre: "",
    eUbicacion: "",
    eVip: "",
    ePreferencial: "",
    eGeneral: "",
    ePuerta: ""
  });
  const { eNombre, eUbicacion, eVip, ePreferencial, eGeneral, ePuerta } = formEventoValues;
  const handleAddEvento = (e) => {
    e.preventDefault();
    if (eUbicacion === "" || eNombre === "") {
      return Swal.fire(
        "Error",
        "Debes de rellenar todos los campos",
        "error"
      );
    }
    dispatch(startAddSitDown(eNombre, eUbicacion, eVip, ePreferencial, eGeneral, ePuerta, date, uid));
  };
  const handleVolver = () => {
    navigate('/');
  };
  const handleDateChange = (e) => {
    setDate(e);
  };
  return (
    <div className='d-flex justify-content-center align-items-center mt-4'>
      <div className="col-md-6 login-form-2">
        <h3>Add Sit down</h3>
        <form onSubmit={handleAddEvento}>

          <div className="form-group">
            <input
              type="text"
              className="form-control mb-2 text-center"
              placeholder="Name"
              name="eNombre"
              value={eNombre}
              onChange={handleEventoInputChange}
            />
          </div>
          {/* <div className="form-group">
            <DateTimePicker
              onChange={handleDateChange}
              value={date}
              className="form-control mb-2 text-center"
              format='dd-MM-yyyy'
            />
    </div> */}
          <div className="form-group d-flex justify-content-center">
            <input type="submit" className="btnSubmit mt-4" value="Add" />
          </div>
        </form>
        <div className="form-group d-flex justify-content-center">
          <button className="btnSubmit mt-2" onClick={handleVolver}>Return</button>
        </div>
      </div>
    </div>
    );
};
