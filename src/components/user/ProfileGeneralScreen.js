import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
// import { useForm } from "react-hook-form";

import { startUpdateUser } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const ProfileGeneralScreen = ({ user }) => {
  const { t } = useTranslation();
  const { userAsoc } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit, watch, formState: { errors } } = useForm({
  //   defaultValues: {
  //     name: user && user.name,
  //     lastname: user && user.lastname,
  //     email: user && user.email,
  //   }
  // });
  const [formUsuarioValues, handleUsuarioInputChange] = useForm({
    rName: userAsoc && userAsoc.name,
    rLastname: userAsoc && userAsoc.lastname,
    rEmail: userAsoc && userAsoc.email,
  });

  const { rName, rLastname, rEmail } = formUsuarioValues;

  const handleUpdate = (e) => {
    e.preventDefault();
    if (rName === "" || rLastname === "" || rEmail === "") {
      return Swal.fire(
        "Error",
        t('errors.fields_required'),
        "error"
      );
    }
    dispatch(startUpdateUser(rEmail, rName, rLastname));
  };
  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <>
      {user ?
        <div className="d-flex flex-column justify-content-center align-items-center mb-5" data-aos="fade-up" data-aos-duration="1000">
          <form onSubmit={handleUpdate} className={isMobile ? "w-95" : "w-50"}>
            <h3 className="mb-1 text-dark text-center h4">{t('profile.general')}</h3>
            <hr className="bg-dark" />
            <div className="form-group">
              <label>{t('labels.first_name')}</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder={t('labels.first_name')}
                name="rName"
                value={rName}
                onChange={handleUsuarioInputChange}
              />
            </div>
            <div className="form-group">
              <label>{t('labels.last_name')}</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder={t('labels.last_name')}
                name="rLastname"
                value={rLastname}
                onChange={handleUsuarioInputChange}
              />
            </div>
            <div className="form-group">
              <label>{t('labels.email')}</label>
              <input
                type="email"
                className="form-control mb-2"
                placeholder={t('labels.email')}
                name="rEmail"
                value={rEmail}
                onChange={handleUsuarioInputChange}
                autoComplete="new-password"
              />
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
        :
        <h1>{t('loading.title')}</h1>
      }
    </>
  );
};
