import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { googleLogout } from '@react-oauth/google';
import { useTranslation } from "react-i18next";

import { startClearUserAsoc, startLogout } from "../../actions/auth";
import logo from '../../images/logo-nav.png';

export const Navbar = () => {
  const { t } = useTranslation();
  const { name } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    googleLogout();
    dispatch(startLogout());
    dispatch(startClearUserAsoc());
  };
  return (
    <>
      {isMobile ?
        <div className="navbar navbar-dark secondary-back navbar-expand-lg d-flex justify-content-between align-items-center mb-1">
          <Link className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none"><img style={{ objectFit: "contain" }} width={150} height={50} src={logo} alt="Blue Energy Solar App" /></span></Link>
          <button type="button" className="navbar-toggler me-3" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="collapse navbar-collapse">
            <div className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
              <div className="dropdown dropdown-nav ms-4 text-decoration-none">
                <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{name}</strong>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end rounded secondary-back" aria-labelledby="userDropdown">
                  <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/profile">{t('buttons.profile')}</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item rounded-1">{t('buttons.logout')}</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="navbar navbar-dark secondary-back navbar-expand-lg d-flex justify-content-between align-items-center mb-1">
          <Link className="text-decoration-none" to="/"><span role="button" className="navbar-brand ms-4 text-decoration-none"><img style={{ objectFit: "contain" }} width={150} height={50} src={logo} alt="Blue Energy Solar App" /></span></Link>
          <button type="button" className="navbar-toggler me-3" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div id="navbarCollapse" className="me-5 collapse navbar-collapse">
            <div className="navbar-nav ms-auto d-flex justify-content-center align-items-center">
              <div className="dropdown dropdown-nav ms-4 text-decoration-none">
                <strong style={{ fontSize: "18px" }} className="navbar-brand dropdown-toggle text-decoration-none" href="!#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">{name}</strong>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end rounded secondary-back" aria-labelledby="userDropdown">
                  <li><Link className="text-decoration-none dropdown-item dropdown-item-default rounded-1" to="/profile">{t('buttons.profile')}</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item rounded-1">{t('buttons.logout')}</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
