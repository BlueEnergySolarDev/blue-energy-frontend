import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

import { useForm } from "../../hooks/useForm";
import { startChangePassword } from "../../actions/auth";

export const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const { uid } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [formUserValues, handleUserInputChange] = useForm({
    rPassword: '',
    rPasswordConfirm: '',
  });

  const { rPassword, rPasswordConfirm } = formUserValues;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (rPassword === "" || rPasswordConfirm === "") {
      return Swal.fire(
        "Error",
        t('errors.fields_required'),
        "error"
      );
    }
    if (rPassword !== rPasswordConfirm) {
      return Swal.fire(
        "Error",
        t('errors.password_match'),
        "error"
      );
    }
    dispatch(startChangePassword(uid, rPassword));
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
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center mb-5" data-aos="fade-up" data-aos-duration="1000">
        <form onSubmit={handleUpdate} className={isMobile ? "w-95" : "w-50"}>
          <h3 className="mb-1 text-dark text-center h4">{t('profile.change_password')}</h3>
          <hr className="bg-dark" />
          <div className="form-group mb-2">
            <label>{t('labels.password')}</label>
            <div className='d-flex flex-row align-items-center'>
              <input
                type={isHidden ? "password" : "text"}
                className="mb-2 form-control"
                placeholder={t('labels.password')}
                name="rPassword"
                value={rPassword}
                autoComplete="new-password"
                onChange={handleUserInputChange}
              />
              <button style={{ width: "15%", height: "15%" }} className={isHidden ? 'btn btn-success btn-sm mb-2 ms-1' : 'btn btn-danger btn-sm mb-2 ms-1'} onClick={setHidden} type="button">{isHidden ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}</button>
            </div>
          </div>
          <div className="form-group mb-2">
            <label>{t('labels.confirm_password')}</label>
            <div className='d-flex flex-row align-items-center'>
              <input
                type={isHidden ? "password" : "text"}
                className="mb-2 form-control"
                placeholder={t('labels.confirm_password')}
                name="rPasswordConfirm"
                value={rPasswordConfirm}
                autoComplete="new-password"
                onChange={handleUserInputChange}
              />
              <button style={{ width: "15%", height: "15%" }} className={isHidden ? 'btn btn-success btn-sm mb-2 ms-1' : 'btn btn-danger btn-sm mb-2 ms-1'} onClick={setHidden} type="button">{isHidden ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}</button>
            </div>
          </div>
          <div className="form-group d-flex justify-content-center mb-1">
            <button type="submit" className="btn btn-primary btn-bright">
              <i className="fa fa-floppy-disk"></i> {t('buttons.save')}
            </button>
          </div>

        </form>
        <div className="form-group d-flex flex-row justify-content-center">
          <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
            <i className="fa fa-arrow-rotate-left me-1"></i> {t('buttons.return')}
          </button>
        </div>
      </div>
    </>
  );
};
