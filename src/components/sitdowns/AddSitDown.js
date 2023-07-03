import React from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { startAddSitDown } from '../../actions/sitdown';
import Select from 'react-select';
import { format } from 'date-fns';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { isMobile } from 'react-device-detect';

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const AddSitDown = () => {
  const { uid, office } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formSitDownValues, handleSitDownInputChange] = useForm({
    sName: "",
    sAddress: "",
    sPhoneNumber: "",
    sEmail: "",
    sProposal: "",
    sReason: "",
  });
  const { sName, sAddress, sPhoneNumber, sEmail, sProposal, sReason } = formSitDownValues;

  const [date, setDate] = useState(format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setDate(e);
  };
  const [canvasser, setCanvasser] = useState(null);
  const canvassers = [
    { value: 'uid', label: 'Boca Raton' },
  ];
  const handleCanvasser = (e) => {
    setCanvasser(e);
  };

  const [status, setStatus] = useState({ value: 'processing', label: <span><i className="fas fa-spinner text-warning"></i> Processing</span> } || null);
  const statuses = [
    { value: 'no_proceed', label: <span><i className="fas fa-pause text-muted"></i> No proceed</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-danger"></i> Incomplete</span> },
    { value: 'processing', label: <span><i className="fas fa-spinner text-warning"></i> Processing</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> Payed</span> },
  ];
  const handleStatus = (e) => {
    setStatus(e);
  };
  const handleAddSitDown = (e) => {
    e.preventDefault();
    if (sName === "" || sAddress === "" || sPhoneNumber === "" || sEmail === "" || sProposal === "" || sReason === "") {
      return Swal.fire(
        "Error",
        "All fields must be completed",
        "error"
      );
    }
    dispatch(startAddSitDown(sName, sAddress, sPhoneNumber, sEmail, sProposal, sReason, date, status.value, uid, canvasser.value, office));
  };
  const handleReturn = () => {
    navigate('/');
  };
  return (
    <>{
      isMobile
        ?
        <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
          <h1 className='text-dark h1'>Detailed Sit Down</h1>
          <div className="col-md-6 login-form-2 m-4">
            <form onSubmit={handleAddSitDown}>
              <div className="form-group">
                <label className='text-light'>Date</label>
                <DateTimePicker
                  onChange={handleDateChange}
                  value={date}
                  className="form-control mb-2"
                  format='MM-dd-yyyy HH:mm'
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  name="sName"
                  value={sName}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Address</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  name="sAddress"
                  value={sAddress}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Phone number</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone number"
                  name="sPhoneNumber"
                  value={sPhoneNumber}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Proposal</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Proposal"
                  name="sProposal"
                  value={sProposal}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Reason</label>
                <textarea
                  type="text"
                  className="form-control mb-2"
                  placeholder="Reason"
                  name="sReason"
                  value={sReason}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>Canvasser</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>Status</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                </div>
              </div>
              <div className="form-group d-flex justify-content-center mb-1">
                <button type="submit" className="btn btn-success btn-bright">
                  <i className="fa fa-floppy-disk"></i> Save
                </button>
              </div>
            </form>
            <div className="form-group d-flex flex-row justify-content-center">
              <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
                <i className="fa fa-arrow-rotate-left me-1"></i> Return
              </button>
            </div>
          </div>
        </div>
        :
        <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
          <h1 className='text-dark'>Detailed Sit Down</h1>
          <div className="col-md-6 login-form-2 m-4">
            <form onSubmit={handleAddSitDown}>
              <div className="form-group">
                <label className='text-light'>Date</label>
                <DateTimePicker
                  onChange={handleDateChange}
                  value={date}
                  className="form-control mb-2"
                  format='MM-dd-yyyy HH:mm'
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Name</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  name="sName"
                  value={sName}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Address</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  name="sAddress"
                  value={sAddress}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Phone number</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone number"
                  name="sPhoneNumber"
                  value={sPhoneNumber}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Proposal</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Proposal"
                  name="sProposal"
                  value={sProposal}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group">
                <label className='text-light'>Reason</label>
                <textarea
                  type="text"
                  className="form-control mb-2"
                  placeholder="Reason"
                  name="sReason"
                  value={sReason}
                  onChange={handleSitDownInputChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>Canvasser</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                </div>
              </div>
              <div className="form-group mb-3">
                <label className='text-light'>Status</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                </div>
              </div>
              <div className="form-group d-flex justify-content-center mb-1">
                <button type="submit" className="btn btn-success btn-bright">
                  <i className="fa fa-floppy-disk"></i> Save
                </button>
              </div>
            </form>
            <div className="form-group d-flex flex-row justify-content-center">
              <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
                <i className="fa fa-arrow-rotate-left me-1"></i> Return
              </button>
            </div>
          </div>
        </div>
    }</>
  );
};
