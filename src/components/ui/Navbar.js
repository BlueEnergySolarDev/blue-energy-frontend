import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startClearUserAsoc, startGetUser, startLogout } from "../../actions/auth";
import logo from '../../images/logo-nav.png';
import { isMobile } from 'react-device-detect';
import { googleLogout } from '@react-oauth/google';

export const Navbar = () => {
  const { name, role, uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    if (role) {
      setIsAuthed(true);
    }
  }, [setIsAuthed, role]);
  const handleUserAsoc = () => {
    if (isAuthed) {
      dispatch(startGetUser(uid));
    }
  }
  const handleLogout = () => {
    googleLogout();
    dispatch(startLogout());
    dispatch(startClearUserAsoc());
  };
  return (
    <>
      {isMobile ?
        <div className="navbar navbar-dark navbar-expand-lg d-flex justify-content-between align-items-center mb-1">
          <Link reloadDocument className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none"><img style={{ objectFit: "cover" }} width={75} height={75} src={logo} alt="Event App" /></span></Link>
          <button type="button" className="navbar-toggler me-5" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="navbarCollapse" className="me-5 collapse navbar-collapse" style={{ textAlign: "center" }}>
            <div className="navbar-nav ms-auto">
              <Link reloadDocument className="text-decoration-none m-1" to="/eventos"><strong role="button" className="navbar-brand ms-4 text-decoration-none" style={{ fontSize: "18px" }}>EVENTOS</strong></Link>
              <Link reloadDocument className="text-decoration-none m-1" to="/fotos"><strong role="button" className="navbar-brand ms-4 text-decoration-none" style={{ fontSize: "18px" }}>FOTOS</strong></Link>
              {isAuthed
                ?
                <div className="dropdown ms-4 text-decoration-none m-1">
                  <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none ps-3" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{name}</strong>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-pull-right rounded-1" style={{ textAlign: "center" }} aria-labelledby="userDropdown">
                    <li><Link onClick={handleUserAsoc} className="text-decoration-none dropdown-item dropdown-item-default rounded-1" style={{ color: "white" }} to="/misdatos">Mis datos</Link></li>
                    <li><Link onClick={handleUserAsoc} className="text-decoration-none dropdown-item dropdown-item-default rounded-1" style={{ color: "white" }} to="/misentradas">Mis entradas</Link></li>
                    <li><Link onClick={handleUserAsoc} className="text-decoration-none dropdown-item dropdown-item-default rounded-1" style={{ color: "white" }} to="/miscredenciales">Mis credenciales</Link></li>
                    <li><button onClick={handleLogout} className="dropdown-item dropdown-item-danger rounded-1" style={{ color: "white" }}>Cerrar sesion</button></li>
                  </ul>
                </div>
                :
                <div className="dropdown ms-4 text-decoration-none m-1">
                  <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ingresar</strong>
                  <ul className="dropdown-menu dropdown-pull-right rounded-1" style={{ textAlign: "center" }} aria-labelledby="userDropdown">
                    <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/login">Iniciar sesion</Link></li>
                    <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/register">Registrarse</Link></li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
        :
        <div className="navbar navbar-dark secondary-back navbar-expand-lg d-flex justify-content-between align-items-center mb-1">
          <Link reloadDocument className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none"><img style={{ objectFit: "contain" }} width={150} height={50} src={logo} alt="Event App" /></span></Link>
          <button type="button" className="navbar-toggler me-3" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="me-5 collapse navbar-collapse">
            <div className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
              {isAuthed
                ?
                <div className="dropdown ms-4 text-decoration-none">
                  <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{name}</strong>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end rounded secondary-back" aria-labelledby="userDropdown">
                    <li><Link onClick={handleUserAsoc} className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/profile">Profile</Link></li>
                    <li><button onClick={handleLogout} className="dropdown-item rounded-1">Logout</button></li>
                  </ul>
                </div>
                :
                <div className="dropdown ms-4 text-decoration-none">
                  <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none text-light" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Ingresar</strong>
                  <ul className="dropdown-menu dropdown-pull-right rounded-1" aria-labelledby="userDropdown">
                    <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/login">Login</Link></li>
                    <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/register">Register</Link></li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </>
  );
};
