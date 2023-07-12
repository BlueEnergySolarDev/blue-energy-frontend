import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useForm } from '../../hooks/useForm';
import { startUpdateUserFromAdmin } from '../../actions/auth';
import { fetchConToken } from '../../helpers/fetch';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import colourStyles from '../../helpers/selectStyles';

export const EditUser = () => {
  const { t } = useTranslation();
  const { userSelected } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formUserValues, handleUserInputChange, reset] = useForm({
    sName: userSelected ? userSelected.name : '',
    sLastname: userSelected ? userSelected.lastname : '',
    sEmail: userSelected ? userSelected.email : '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const roles = [
    { value: 'admin', label: t('users.roles.admin') },
    { value: 'office_manager', label: t('users.roles.office_manager') },
  ];
  const offices = [
    { value: 'Boca Raton', label: 'Boca Raton' },
    { value: 'Bradenton', label: 'Bradenton' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Jacksonville', label: 'Jacksonville' },
  ];

  useEffect(async () => {
    setIsLoading(true);
    const { user: userSelected } = await fetchConToken(`auth/${localStorage.getItem('userId')}`);
    reset({
      sName: userSelected ? userSelected.name : '',
      sLastname: userSelected ? userSelected.lastname : '',
      sEmail: userSelected ? userSelected.email : '',
    })
    setOffice(userSelected ? { value: userSelected.office, label: userSelected.office } : null);
    setRole(userSelected
      ?
      roles.filter((v) => {
        return userSelected.role === v.value;
      })
      :
      null
    );
    setStatus(userSelected ? userSelected.status : true);
    setIsLoading(false);
  }, [])

  const { sName, sLastname, sEmail } = formUserValues;
  const [status, setStatus] = useState(userSelected ? userSelected.status : true);
  const [office, setOffice] = useState(userSelected ? { value: userSelected.office, label: userSelected.office } : null);

  const handleOffice = (e) => {
    setOffice(e);
  };

  const [role, setRole] = useState(
    userSelected
      ?
      roles.filter((v) => {
        return userSelected.role === v.value;
      })
      :
      null
  );

  const handleRole = (e) => {
    setRole(e);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    if (sName === '' || sLastname === '' || sEmail === '') {
      return Swal.fire(
        "Error",
        t('errors.fields_required'),
        "error"
      );
    }
    dispatch(startUpdateUserFromAdmin(sEmail, sName, sLastname, office.value, role.value, status));
  };
  const handleReturn = () => {
    navigate('/users');
  };
  const handleStatus = () => {
    setStatus(!status);
  };

  return (
    <>
      {isLoading
        ?
        <LoadingSpinner />
        :
        <>
          {
            isMobile
              ?
              <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
                <h1 className='text-dark h1'>{t('users.edit.title')}</h1>
                <div className="w-80 login-form-2 m-2">
                  <form onSubmit={handleEditUser}>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.first_name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.first_name')}
                        name="sName"
                        value={sName}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.last_name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.last_name')}
                        name="sLastname"
                        value={sLastname}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.email')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.email')}
                        name="sEmail"
                        value={sEmail}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.office')}</label>
                      <div className="w-100">
                        <Select placeholder={t('select.placeholder')} styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.role')}</label>
                      <div className="w-100">
                        <Select placeholder={t('select.placeholder')} styles={colourStyles} options={roles} value={role} onChange={handleRole} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='form-label' style={{ color: "white" }}>{t('labels.status')}</label>
                      <div className="mb-2 d-flex justify-content-center align-items-center form-control w-25 form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value={status}
                          checked={status}
                          onChange={handleStatus}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-center mb-1">
                      <button type="submit" className="btn btn-success btn-bright">
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
              </div>
              :
              <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
                <h1 className='text-dark'>{t('users.edit.title')}</h1>
                <div className="col-md-6 login-form-2 m-4">
                  <form onSubmit={handleEditUser}>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.first_name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.first_name')}
                        name="sName"
                        value={sName}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.last_name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.last_name')}
                        name="sLastname"
                        value={sLastname}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.email')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.email')}
                        name="sEmail"
                        value={sEmail}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.office')}</label>
                      <div className="w-100">
                        <Select placeholder={t('select.placeholder')} styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.role')}</label>
                      <div className="w-100">
                        <Select placeholder={t('select.placeholder')} styles={colourStyles} options={roles} value={role} onChange={handleRole} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='form-label text-light'>{t('labels.status')}</label>
                      <div className="mb-2 d-flex justify-content-center align-items-center form-control w-25 form-check form-switch">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={status}
                          value={status}
                          onChange={handleStatus}
                        />
                      </div>
                    </div>
                    <div className="form-group d-flex justify-content-center mb-1">
                      <button type="submit" className="btn btn-success btn-bright">
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
              </div>
          }
        </>
      }
    </>
  );
};
