import { useCallback, useState } from "react";
import Modal from "react-modal";
import Select from 'react-select';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { uiCloseModall } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";
import colourStyles from '../../helpers/selectStyles';
import { fetchConToken } from "../../helpers/fetch";
import "./addmodal.css";
import { startSetCanvasser } from "../../actions/canvasser";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

export const AddCanvasserModal = ({ setCanvasser, mutate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { modalOpenn } = useSelector((state) => state.ui);
  const [formCloserValues, handleCloserInputChange] = useForm({
    sName: '',
    sLastname: '',
    sEmail: '',
    sPhoneNumber: '',
  });
  const { sName, sLastname, sEmail, sPhoneNumber } = formCloserValues;
  const [office, setOffice] = useState(null);
  const offices = [
    { value: 'Boca Raton', label: 'Boca Raton' },
    { value: 'Bradenton', label: 'Bradenton' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Jacksonville', label: 'Jacksonville' },
  ];
  const handleOffice = (e) => {
    setOffice(e);
  };
  const [date, setDate] = useState(format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setDate(e);
  };

  const closeModall = useCallback(() => {
    dispatch(uiCloseModall());
  }, [dispatch]);

  const handleCreateCanvasser = (e) => {
    e.preventDefault();
    if (sName === '' || sLastname === '' || sEmail === '') {
      return Swal.fire(
        "Error",
        t('errors.fields_required'),
        "error"
      );
    }
    const startAddCanvasser = async (firstName, lastName, phone_number, email, hireDate, office) => {
      const status = true;
      const body = await fetchConToken(
        "canvassers/create",
        { firstName, lastName, phone_number, email, hireDate, office, status },
        "POST"
      );
      if (body.ok) {
        Swal.fire(t('success.title'), t('success.canvasser_created'), "success");
        setCanvasser({
          value: body.canvasser.id,
          label: body.canvasser.firstName + ' ' + body.canvasser.lastName,
        })
        mutate();
        closeModall();
      } else {
        Swal.fire("Error", body.msg, "error");
        closeModall();
      }
    }
    startAddCanvasser(sName, sLastname, sPhoneNumber, sEmail, date, office.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <Modal
        isOpen={modalOpenn}
        onRequestClose={closeModall}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        ariaHideApp={process.env.NODE_ENV === "test"}
      >
        <div className='d-flex flex-column justify-content-center align-items-center mt-2 w-100' data-aos="fade-up" data-aos-duration="1000">
          <h3 className='text-dark'>{t('canvassers.create')}</h3>
          <div className="col-md-11 login-form-2 m-2">
            <form onSubmit={handleCreateCanvasser}>
              <div className="form-group">
                <label className='text-light'>{t('labels.first_name')}</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder={t('labels.first_name')}
                  name="sName"
                  value={sName}
                  onChange={handleCloserInputChange}
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
                  onChange={handleCloserInputChange}
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
                  onChange={handleCloserInputChange}
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
                  onChange={handleCloserInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>{t('labels.office')}</label>
                <div className="w-100">
                  <Select placeholder={t('select.placeholder')} styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                </div>
              </div>
              <div className="form-group">
                <label className='text-light'>{t('labels.date')}</label>
                <DateTimePicker
                  onChange={handleDateChange}
                  value={date}
                  className="form-control mb-2"
                  format='MM-dd-yyyy HH:mm'
                />
              </div>
              <div className="form-group d-flex justify-content-center mb-1">
                <button type="submit" className="btn btn-success btn-bright">
                  <i className="fa fa-floppy-disk"></i> {t('buttons.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
