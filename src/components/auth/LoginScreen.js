import React from "react";
import { useDispatch } from "react-redux";
import { startLogin } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import eventIcon from '../../images/ee.png';
import "./login.css";
import { isMobile } from 'react-device-detect';

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: "",
    lPassword: "",
  });
  const { lEmail, lPassword } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  return (
    <>
      {isMobile ?
        <div className="login-container">
          <h2 className="d-flex align-items-center justify-content-center mt-4" style={{ color: "#0062cc" }}><img src={eventIcon} alt="" /></h2>
          <div className="row ">
            <div className="col-md-11 col-11 login-form-1 mt-5">
              <h3>Ingreso</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Correo"
                    name="lEmail"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    name="lPassword"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btnSubmit" value="Ingresar" />
                </div>
              </form>
            </div>

          </div>
        </div>
        :
        <div className="login-container">
          <h2 className="d-flex align-items-center justify-content-center mt-4" style={{ color: "#0062cc" }}><img src={eventIcon} alt="" /></h2>
          <div className="row mt-4">
            <div className="col-md-6 col-6 me-5 login-form-3">
              <h3>Ingreso</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Correo"
                    name="lEmail"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder="Contraseña"
                    name="lPassword"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btnSubmit" value="Ingresar" />
                </div>
              </form>
            </div>

          </div>
        </div>
      }
    </>
  );
};
