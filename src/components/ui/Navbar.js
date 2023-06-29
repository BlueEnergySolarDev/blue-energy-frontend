import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { startLogout } from "../../actions/auth";
import { eventLogout } from "../../actions/eventos";
import eventIcon from '../../images/eee.png';

export const Navbar = () => {
  const { nombre,rol } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isAdmin, setisAdmin] = useState(false);
  useEffect(() => {
    if(rol === 'ADMIN'){
      setisAdmin(true);
    }
  }, [setisAdmin,rol]);
  const handleLogout = () => {
    dispatch(startLogout());
    dispatch(eventLogout());
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-3">
      <Link className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none"><img src={eventIcon} alt="Event App" /></span></Link>
      {/* <Link className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none" style={{ color: "white" }}>EventApp</span></Link> */}
      {isAdmin && <Link className="text-decoration-none me-3" to="/verificar"><span role="button" className="navbar-brand ms-4 text-decoration-none" style={{ color: "white" }}> <i className="fas fa-check-circle    "></i> Verificar</span></Link>}
      <div className="nav-item dropdown me-3">
        <a style={{ color: "white" }} className="nav-link dropdown-toggle" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{nombre}</a>
        <ul className="dropdown-menu dropdown-pull-right text-center" aria-labelledby="userDropdown">
          {/* <li><Link className="text-decoration-none dropdown-item" to="/perfil">Perfil</Link></li> */}
          {/* <li><Link className="text-decoration-none" to={`/${uid}/clientes`}><a className="dropdown-item" href="/clientes">Mis clientes</a></Link></li> */}
          {/* <li><hr className="dropdown-divider" /></li> */}
          {isAdmin && <li><Link className="dropdown-item bg-primary text-decoration-none me-3 text-light" to="/configurarmp"><i className="fa-solid fa-cog"></i> Configuración MercadoPago</Link></li>}
          {/* <li><button onClick={handleLogout} className="dropdown-item active bg-danger">Cerrar sesion</button></li> */}
          <li><button onClick={handleLogout} className="dropdown-item active bg-danger"><i className="fa-solid fa-right-from-bracket"></i> Cerrar sesion</button></li>
        </ul>
      </div>
    </div>
  );
};
