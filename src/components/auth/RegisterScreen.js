import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { useDispatch } from "react-redux";
import Select from 'react-select';
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";
import logo from '../../images/logo.png';
import { startRegister } from "../../actions/auth";

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    rName: "",
    rLastname: "",
    rEmail: "",
    rPassword: "",
    rPasswordConf: ""
  });
  const { rEmail, rPassword, rName, rLastname, rPasswordConf } = formRegisterValues;
  const [office, setOffice] = useState(null);
  const offices = [
    { value: 'Boca Raton', label: 'Boca Raton' },
    { value: 'Bradenton', label: 'Bradenton' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Jacksonville', label: 'Jacksonville' },
  ];
  const handleRegister = (e) => {
    e.preventDefault();
    if (rName === "" || rLastname === "" || rEmail === "" || rPassword === "" || rPasswordConf === "") {
      return Swal.fire(
        "Error",
        "All fields must be completed",
        "error"
      );
    }
    if (rPassword !== rPasswordConf) {
      return Swal.fire(
        "Error",
        "Passwords have to match",
        "error"
      );
    }
    dispatch(startRegister(rEmail, rPassword, rName, rLastname, office.value));
  };
  const handleOffice = (e) => {
    setOffice(e);
  };
  return (
    <>
      {isMobile ?
        <div className="login-container block-scroll" data-aos="fade-down" data-aos-duration="1000">
          <h1 className="d-flex align-items-center justify-content-center mt-2" style={{ color: "#000" }}><img src={logo} className="w-100" alt="Blue Energy Solar Logo" /></h1>
          <div className="row">
            <div className="col-md-11 col-11 login-form-1 m-3">
              <h3>REGISTER</h3>
              <form onSubmit={handleRegister}>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-envelope fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="rEmail"
                    autoComplete="off"
                    value={rEmail}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-lock fa-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="rPassword"
                    autoComplete="new-password"
                    value={rPassword}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-arrows-rotate fa-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="rPasswordConf"
                    autoComplete="new-password"
                    value={rPasswordConf}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-user fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="rName"
                    value={rName}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-id-card fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lastname"
                    name="rLastname"
                    value={rLastname}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-10">
                    <i className="fa-solid fa-building fa-lg"></i>
                  </div>
                  <div className="w-100">
                    <Select menuPlacement="auto" menuPosition="fixed" styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                  </div>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btn btn-primary btn-bright" value="Register" />
                </div>
              </form>
              <div className="form-group d-flex justify-content-center">
                <h5>Already register? <Link className='text-decoration-none text-primary' to={`/login`}>Login</Link></h5>
              </div>
            </div>

          </div>
        </div>
        :
        <div className="login-container" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="d-flex align-items-center justify-content-center" style={{ color: "#000" }}><img src={logo} className="w-30" alt="Blue Energy Solar Logo" /></h1>
          <div className="row mt-2">
            <div className="col-md-6 col-6 me-5 login-form-3">
              <h3>REGISTER</h3>
              <form onSubmit={handleRegister}>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-envelope fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    name="rEmail"
                    autoComplete="off"
                    value={rEmail}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-lock fa-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="rPassword"
                    autoComplete="new-password"
                    value={rPassword}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-arrows-rotate fa-lg"></i>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    name="rPasswordConf"
                    autoComplete="new-password"
                    value={rPasswordConf}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-user fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    name="rName"
                    value={rName}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-id-card fa-lg"></i>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lastname"
                    name="rLastname"
                    value={rLastname}
                    onChange={handleRegisterInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <div className="m-2 w-5">
                    <i className="fa-solid fa-building fa-lg"></i>
                  </div>
                  <div className="w-100">
                    <Select menuPlacement="auto" menuPosition="fixed" styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                  </div>
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btn btn-primary btn-bright" value="Register" />
                </div>
              </form>
              <div className="form-group d-flex justify-content-center">
                <h5>Already register? <Link className='text-decoration-none text-primary' to={`/login`}>Login</Link></h5>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
