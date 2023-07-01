import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { startUpdateUser } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import Select from 'react-select';

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const ProfileScreen = () => {
  const { userAsoc } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [formUsuarioValues, handleUsuarioInputChange] = useForm({
    rName: userAsoc && userAsoc.name,
    rLastname: userAsoc && userAsoc.lastname,
    rEmail: userAsoc && userAsoc.email,
    rPassword: userAsoc ? userAsoc.password: '',
  });

  const { rName, rLastname, rPassword, rEmail } = formUsuarioValues;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (rName === "" || rLastname === "" || rEmail === "" || rPassword === "") {
      return Swal.fire(
        "Error",
        "All fields must be completed",
        "error"
      );
    }
    dispatch(startUpdateUser(rEmail, rPassword, rName, rLastname, office.value));
  };
  const handleReturn = (e) => {
    navigate('/');
  };
  const setHidden = () => {
    if (isHidden) {
      setIsHidden(false);
    } else {
      setIsHidden(true);
    }
  };
  const [office, setOffice] = useState(userAsoc ? { value: userAsoc.office, label: userAsoc.office } : null);
  const offices = [
    { value: 'Boca Raton', label: 'Boca Raton' },
    { value: 'Bradenton', label: 'Bradenton' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Jacksonville', label: 'Jacksonville' },
  ];
  const handleOffice = (e) => {
    setOffice(e);
  };
  return (
    <>
    {userAsoc ? <div className="d-flex flex-column justify-content-center align-items-center mb-5">

      <form onSubmit={handleUpdate} data-aos="fade-up" data-aos-duration="1000">
        <h1 className="mb-2 text-dark text-center">PROFILE</h1>
        <hr />
        <div className="form-group text-center">
          <label>Name</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Name"
            name="rName"
            value={rName}
            onChange={handleUsuarioInputChange}
          />
        </div>
        <div className="form-group text-center">
          <label>Lastname</label>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Lastname"
            name="rLastname"
            value={rLastname}
            onChange={handleUsuarioInputChange}
          />
        </div>
        <div className="form-group text-center">
          <label>Email</label>
          <input
            type="email"
            className="form-control mb-2"
            placeholder="Email"
            name="rEmail"
            value={rEmail}
            autoComplete="new-password"
            onChange={handleUsuarioInputChange}
          />
        </div>
        <div className="form-group text-center mb-2">
          <label>Password</label>
          <div className='d-flex flex-row align-items-center'>
            <input
              type={isHidden ? "password" : "text"}
              className="mb-2 form-control"
              placeholder="Password"
              name="rPassword"
              value={rPassword}
              autoComplete="new-password"
              onChange={handleUsuarioInputChange}
            />
            <button style={{ width: "15%", height: "15%" }} className={isHidden ? 'btn btn-success btn-sm mb-2 ms-1' : 'btn btn-danger btn-sm mb-2 ms-1'} onClick={setHidden} type="button">{isHidden ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}</button>
          </div>
        </div>
        <div className="form-group d-flex flex-column justify-content-center align-items-center mb-3">
          <label>Office</label>
          <div className="w-100">
            <Select styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
          </div>
        </div>

        <div className="form-group d-flex justify-content-center mb-1">
          <button type="submit" className="btn btn-primary btn-bright">
            <i className="fa fa-floppy-disk"></i> Save
          </button>
        </div>
      </form>
      <div className="form-group d-flex flex-row justify-content-center">
        <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
          <i className="fa fa-arrow-rotate-left me-1"></i> Return
        </button>
      </div>
    </div>
    :
    <h1>Loading...</h1>
    }
    </>
  );
};
