import { useState } from 'react';
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
import { PaginatedSitDownsAddedItems } from './PaginatedSitDownsAddedItems';
import { fetchConToken } from '../../helpers/fetch';
import colourStyles from '../../helpers/selectStyles';

export const AddSitDown = () => {
  const { t } = useTranslation();
  const { office, uid } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formSitDownValues, handleSitDownInputChange] = useForm({
    sName: '',
    sAddress: '',
    sPhoneNumber: '',
    sEmail: '',
    sReason: '',
  });
  const { sName, sAddress, sPhoneNumber, sEmail, sReason } = formSitDownValues;
  const [sitDowns, setSitDowns] = useState([]);
  const { data: closersApi } = useSWR("closers");
  const closers = [];
  const { data: canvasserApi } = useSWR("canvassers");
  const canvassers = [];
  const statuses = [
    { value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> {t('labels.processed')}</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-warning"></i> {t('labels.incomplete')}</span> },
    { value: 'fail_credit', label: <span><i className="fas fa-credit-card text-danger"></i> {t('labels.fail_credit')}</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> {t('labels.payed')}</span> },
  ];

  const [date, setDate] = useState(format(new Date(), 'MM-dd-yyyy HH:mm'));
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
  const [canvasser, setCanvasser] = useState(null);
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
  const [closer, setCloser] = useState(null);
  const handleCloser = (e) => {
    setCloser(e);
  };

  const [status, setStatus] = useState({ value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> {t('labels.processed')}</span> } || null);
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
    const startAddSitDown = async (name, address, phone_number, email, reason, date, status, closer, canvasser, office, user) => {
      const body = await fetchConToken(
        "sitdowns",
        { name, address, phone_number, email, reason, date, status, closer, canvasser, office, user },
        "POST"
      );
      if (body.ok) {
        Swal.fire(t('success.title'), t('success.sit_down_created'), "success");
        const sitdowns = [...sitDowns, body.sitDown]
        setSitDowns(sitdowns);
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    };
    startAddSitDown(sName, sAddress, sPhoneNumber, sEmail, sReason, date, status.value, closerr, canvasserr, office, uid);
  };
  const handleReturn = () => {
    navigate('/sitdowndetail');
  };
  return (
    <>{
      isMobile
        ?
        <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
          <h1 className='text-dark h1'>{t('detailed_sit_downs.register.title')}</h1>
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
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>{t('labels.canvasser')}</label>
                <div className="w-100">
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>{t('labels.status')}</label>
                <div className="w-100">
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
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
          <h1 className="text-dark mb-4 mt-2 h1">{t('detailed_sit_downs.register.table')}</h1>
          {
            sitDowns.length > 0 ?
              <PaginatedSitDownsAddedItems itemsPerPage={10} items={sitDowns} loading={false} />
              :
              <span className="h3 mb-5">{t('detailed_sit_downs.register.empty')}</span>
          }
        </div>
        :
        <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
          <h1 className='text-dark'>{t('detailed_sit_downs.register.title')}</h1>
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
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>{t('labels.canvasser')}</label>
                <div className="w-100">
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>{t('labels.status')}</label>
                <div className="w-100">
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
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
          <h1 className="text-dark mb-4 mt-2">{t('detailed_sit_downs.register.table')}</h1>
          {
            sitDowns.length > 0 ?
              <PaginatedSitDownsAddedItems itemsPerPage={10} items={sitDowns} loading={false} />
              :
              <span className="h3 mb-5">{t('detailed_sit_downs.register.empty')}</span>
          }
        </div>
    }</>
  );
};
