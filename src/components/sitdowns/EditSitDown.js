import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { format } from 'date-fns';
import useSWR from "swr";
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { useForm } from '../../hooks/useForm';
import { fetchConToken } from '../../helpers/fetch';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import colourStyles from '../../helpers/selectStyles';

export const EditSitDown = () => {
  const { t } = useTranslation();
  const { office, uid } = useSelector((state) => state.auth);
  const { sitDownSelected } = useSelector((state) => state.sitDown);
  const navigate = useNavigate();
  const [formSitDownValues, handleSitDownInputChange, reset] = useForm({
    sName: sitDownSelected ? sitDownSelected.name : '',
    sAddress: sitDownSelected ? sitDownSelected.address : '',
    sPhoneNumber: sitDownSelected ? sitDownSelected.phone_number : '',
    sEmail: sitDownSelected ? sitDownSelected.email : '',
    sReason: sitDownSelected ? sitDownSelected.reason : '',
  });
  const { sName, sAddress, sPhoneNumber, sEmail, sReason } = formSitDownValues;
  const [isLoading, setIsLoading] = useState(false);

  const statuses = useMemo(() => [
    { value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> {t('labels.processed')}</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-warning"></i> {t('labels.incomplete')}</span> },
    { value: 'fail_credit', label: <span><i className="fas fa-credit-card text-danger"></i> {t('labels.fail_credit')}</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> {t('labels.payed')}</span> },
  ], [t]);
  const { data: canvasserApi } = useSWR("canvassers");
  const canvassers = [];
  const { data: closersApi } = useSWR("closers");
  const closers = [];

  useEffect(() => {
    const initialize = async () => {
      setIsLoading(true);
      const { sitDown: sitDownSelected } = await fetchConToken(`sitdowns/getbyid/${localStorage.getItem('sitDownId')}`);
      reset({
        sName: sitDownSelected ? sitDownSelected.name : '',
        sAddress: sitDownSelected ? sitDownSelected.address : '',
        sPhoneNumber: sitDownSelected ? sitDownSelected.phone_number : '',
        sEmail: sitDownSelected ? sitDownSelected.email : '',
        sReason: sitDownSelected ? sitDownSelected.reason : '',
      })
      setCanvasser(sitDownSelected?.canvasser && { value: sitDownSelected.canvasser._id, label: sitDownSelected.canvasser.firstName + ' ' + sitDownSelected.canvasser.lastName })
      setCloser(sitDownSelected?.closer && { value: sitDownSelected.closer._id, label: sitDownSelected.closer.firstName + ' ' + sitDownSelected.closer.lastName })
      setStatus(sitDownSelected?.status
        &&
        statuses.filter((v) => {
          return sitDownSelected?.status === v.value
        })[0]
      )
      setIsLoading(false);
    };
    initialize();

  }, [])

  const [date, setDate] = useState(sitDownSelected ? format(new Date(sitDownSelected.date), 'MM-dd-yyyy HH:mm') : format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setDate(e);
  };

  if (canvasserApi?.canvassers) {
    const canvassersLen = canvasserApi?.canvassers.length
    for (let i = 0; i < canvassersLen; i++) {
      const canvasser = {
        value: canvasserApi?.canvassers[i].id,
        label: canvasserApi?.canvassers[i].firstName + ' ' + canvasserApi?.canvassers[i].lastName
      }
      canvassers.push(canvasser);
    }
  }
  const [canvasser, setCanvasser] = useState(sitDownSelected?.canvasser ? { value: sitDownSelected.canvasser._id, label: sitDownSelected.canvasser.firstName + ' ' + sitDownSelected.canvasser.lastName } : null);
  const handleCanvasser = (e) => {
    setCanvasser(e);
  };

  if (closersApi?.closers) {
    const closersLen = closersApi?.closers.length;
    for (let i = 0; i < closersLen; i++) {
      const closer = {
        value: closersApi?.closers[i].id,
        label: closersApi?.closers[i].firstName + ' ' + closersApi?.closers[i].lastName,
      }
      closers.push(closer);
    }
  }
  const [closer, setCloser] = useState(sitDownSelected?.closer ? { value: sitDownSelected.closer._id, label: sitDownSelected.closer.firstName + ' ' + sitDownSelected.closer.lastName } : null);
  const handleCloser = (e) => {
    setCloser(e);
  };

  const [status, setStatus] = useState(
    sitDownSelected?.status
      ?
      statuses.filter((v) => {
        return sitDownSelected?.status === v.value
      })
      :
      null
  );

  const handleStatus = (e) => {
    setStatus(e);
  };
  const handleAddSitDown = (e) => {
    e.preventDefault();
    if (sName === '' || sAddress === '' || sPhoneNumber === '') {
      return Swal.fire(
        "Error",
        t('errors.fields_required'),
        "error"
      );
    }
    let closerr = null;
    if (closer) {
      closerr = closer?.value;
    }
    let canvasserr = null;
    if (canvasser) {
      canvasserr = canvasser.value;
    }
    if (sitDownSelected) {
      
      const startUpdateSitDown = async (id, name, address, phone_number, email, reason, date, status, closer, canvasser, office, user) => {
        const body = await fetchConToken(
          "sitdowns/update",
          { id, name, address, phone_number, email, reason, date, status, closer, canvasser, office, user },
          "PUT"
        );
        if (body.ok) {
          Swal.fire(t('success.title'), t('success.sit_down_updated'), "success");
          navigate('/sitdowndetail');
        } else {
          Swal.fire("Error", body.msg, "error");
        }
      }
      startUpdateSitDown(sitDownSelected?.id, sName, sAddress, sPhoneNumber, sEmail, sReason, date, status.value, closerr, canvasserr, office, uid);
    }
  };
  const handleReturn = () => {
    navigate('/sitdowndetail');
  };
  return (
    <>
      {isLoading
        ?
        <LoadingSpinner />
        :
        <div>
          {
            isMobile
              ?
              <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
                <h1 className='text-dark h1'>{t('detailed_sit_downs.edit.title')}</h1>
                <div className="col-md-6 login-form-2 m-4">
                  <form onSubmit={handleAddSitDown}>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.date')}</label>
                      <DateTimePicker
                        onChange={handleDateChange}
                        value={date}
                        className="form-control mb-2"
                        format='MM-dd-yyyy HH:mm'
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.name')}
                        name="sName"
                        value={sName}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.address')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.address')}
                        name="sAddress"
                        value={sAddress}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.phone_number')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.phone_number')}
                        name="sPhoneNumber"
                        value={sPhoneNumber}
                        onChange={handleSitDownInputChange}
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
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.reason')}</label>
                      <textarea
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.reason')}
                        name="sReason"
                        value={sReason}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.closer')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.canvasser')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.status')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
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
                <h1 className='text-dark'>{t('detailed_sit_downs.edit.title')}</h1>
                <div className="col-md-6 login-form-2 m-4">
                  <form onSubmit={handleAddSitDown}>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.date')}</label>
                      <DateTimePicker
                        onChange={handleDateChange}
                        value={date}
                        className="form-control mb-2"
                        format='MM-dd-yyyy HH:mm'
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.name')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.name')}
                        name="sName"
                        value={sName}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.address')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.address')}
                        name="sAddress"
                        value={sAddress}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.phone_number')}</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.phone_number')}
                        name="sPhoneNumber"
                        value={sPhoneNumber}
                        onChange={handleSitDownInputChange}
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
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>{t('labels.reason')}</label>
                      <textarea
                        type="text"
                        className="form-control mb-2"
                        placeholder={t('labels.reason')}
                        name="sReason"
                        value={sReason}
                        onChange={handleSitDownInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.closer')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.canvasser')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>{t('labels.status')}</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
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
        </div>
      }
    </>
  );
};
