import { useState } from "react";
import { useDispatch } from "react-redux";
import { isMobile } from 'react-device-detect';
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { GoogleLogin } from '@react-oauth/google';
import { useTranslation } from "react-i18next";

import { login, startGetUser } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { OfficeModal } from "./OfficeModal";
import { uiOpenModal } from "../../actions/ui";
import { fetchSinToken } from "../../helpers/fetch";
import logo from '../../images/logo.png';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    lEmail: '',
    lPassword: '',
  });
  const { lEmail, lPassword } = formLoginValues;
  const [officeData, setOfficeData] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const startLogin = async (emaill, password) => {
      const email = emaill.toLowerCase().trim();
      const body = await fetchSinToken("auth", { email, password }, "POST");
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
        dispatch(startGetUser(body.uid));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    }
    startLogin(lEmail, lPassword);
  };

  const onSuccess = (res) => {
    const startGoogle = async (res) => {
      const bodi = await fetchSinToken(`auth/newgoogle`, { credential: res.credential }, "POST");
      if (bodi.isVerified) {
        if (bodi.created) {
          const startLoginGoogle = async (email, namee, lastnamee) => {
            const lastname = lastnamee.toUpperCase().trim();
            const name = namee.toUpperCase().trim();
            const role = 'office_manager';
            const body = await fetchSinToken("auth/google", { email, name, lastname, role }, "POST");
            if (body.ok) {
              localStorage.setItem("token", body.token);
              localStorage.setItem("token-init-date", new Date().getTime());
              dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
              dispatch(startGetUser(body.uid));
            } else {
              Swal.fire("Error", body.msg, "error");
            }
          }
          startLoginGoogle(bodi.email, bodi.name, bodi.lastname);
        } else {
          setOfficeData(bodi);
          dispatch(uiOpenModal());
        }
      }
    }
    startGoogle(res);
  };
  const onError = (err) => {
    Swal.fire("Error", t('errors.google_login'), "error");
  };

  return (
    <>
      {isMobile ?
        <div className="login-container block-scroll" data-aos="fade-down" data-aos-duration="1000">
          <h1 className="d-flex align-items-center justify-content-center mt-5" style={{ color: "#000" }}><img src={logo} className="w-100" alt="Blue Energy Solar Logo" /></h1>
          <div className="row">
            <div className="col-md-11 col-11 login-form-1 mt-5">
              <h3>{t('auth.login.title')}</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder={t('labels.email')}
                    name="lEmail"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control mb-3"
                    placeholder={t('labels.password')}
                    name="lPassword"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btn btn-primary btn-bright" value={t('buttons.login')} />
                </div>
                <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                  <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </div>
              </form>
              <div className="form-group d-flex justify-content-center">
                <h5>{t('auth.login.go_to_register')} <Link className='text-decoration-none text-primary' to='/register'>{t('buttons.register')}</Link></h5>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="login-container" data-aos="fade-up" data-aos-duration="1000">
          <h1 className="d-flex align-items-center justify-content-center" style={{ color: "#000" }}><img src={logo} className="w-30" alt="Blue Energy Solar Logo" /></h1>
          <div className="row mt-2">
            <div className="col-md-6 col-6 me-5 login-form-3">
              <h3>{t('auth.login.title')}</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <i className="m-3 fa-solid fa-envelope fa-lg"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t('labels.email')}
                    name="lEmail"
                    autoComplete="off"
                    value={lEmail}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
                  <i className="m-3 fa-solid fa-lock fa-lg"></i>
                  <input
                    type="password"
                    className="form-control"
                    placeholder={t('labels.password')}
                    name="lPassword"
                    autoComplete="off"
                    value={lPassword}
                    onChange={handleLoginInputChange}
                  />
                </div>
                <div className="form-group d-flex justify-content-center">
                  <input type="submit" className="btn btn-primary btn-bright" value={t('buttons.login')} />
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onError}
                  />
                </div>
                {officeData && <OfficeModal bodi={officeData} />}
              </form>
              <div className="form-group d-flex justify-content-center">
                <h5>{t('auth.login.go_to_register')} <Link className='text-decoration-none text-primary' to='/register'>{t('buttons.register')}</Link></h5>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};
