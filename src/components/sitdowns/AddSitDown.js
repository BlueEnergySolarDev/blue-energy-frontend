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
import axios from 'axios';
import useSWR from "swr";

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const AddSitDown = () => {
  const { office } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formSitDownValues, handleSitDownInputChange] = useForm({
    sName: "",
    sAddress: "",
    sPhoneNumber: "",
    sEmail: "",
    sReason: "",
  });
  const { sName, sAddress, sPhoneNumber, sEmail, sReason } = formSitDownValues;

  const [date, setDate] = useState(format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setDate(e);
  };

  const fetcher = (url) =>
    axios
      .get(url, {
        headers: { Authorization: "Bearer " + process.env.REACT_APP_SALESRABBIT_TOKEN }
      })
      .then((res) => res.data);

  const { data, } = useSWR("https://api.salesrabbit.com/users?role=Rep", fetcher);
  const { data: treps } = useSWR("https://api.salesrabbit.com/users?role=TRep", fetcher);

  const canvassers = [];
  if (data?.data && treps?.data) {
    let aux = "";
    if (office === "Boca Raton") {
      aux = "Boca";
      //REP
      for (let i = 0; i < data?.data.length; i++) {
        if (data?.data[i].office === aux) {
          const canvasser = {
            value: data?.data[i].firstName.trim() + ' ' + data?.data[i].lastName,
            label: data?.data[i].firstName.trim() + ' ' + data?.data[i].lastName,
          }
          canvassers.push(canvasser);
        }
      }
      //TREP
      for (let i = 0; i < treps?.data.length; i++) {
        if (treps?.data[i].office === aux) {
          const canvasser = {
            value: treps?.data[i].firstName.trim() + ' ' + treps?.data[i].lastName,
            label: treps?.data[i].firstName.trim() + ' ' + treps?.data[i].lastName
          }
          canvassers.push(canvasser);
        }
      }
    } else {
      //REP
      for (let i = 0; i < data?.data.length; i++) {
        if (data?.data[i].office === office) {
          const canvasser = {
            value: data?.data[i].firstName.trim() + ' ' + data?.data[i].lastName,
            label: data?.data[i].firstName.trim() + ' ' + data?.data[i].lastName,
          }
          canvassers.push(canvasser);
        }
      }
      //TREP
      for (let i = 0; i < treps?.data.length; i++) {
        if (treps?.data[i].office === office) {
          const canvasser = {
            value: treps?.data[i].firstName.trim() + ' ' + treps?.data[i].lastName,
            label: treps?.data[i].firstName.trim() + ' ' + treps?.data[i].lastName
          }
          canvassers.push(canvasser);
        }
      }
    }

  }

  const [canvasser, setCanvasser] = useState(null);
  const handleCanvasser = (e) => {
    setCanvasser(e);
  };

  const { data: closersApi } = useSWR("https://api.salesrabbit.com/users?role=Closer", fetcher);

  const closers = [];
  if (closersApi?.data) {
    let aux = "";
    if (office === "Boca Raton") {
      aux = "Boca";
      //CLOSER
      for (let i = 0; i < closersApi?.data.length; i++) {
        if (closersApi?.data[i].office === aux) {
          const closer = {
            value: closersApi?.data[i].firstName.trim() + ' ' + closersApi?.data[i].lastName,
            label: closersApi?.data[i].firstName.trim() + ' ' + closersApi?.data[i].lastName,
          }
          closers.push(closer);
        }
      }
    } else {
      //CLOSER
      for (let i = 0; i < closersApi?.data.length; i++) {
        if (closersApi?.data[i].office === office) {
          const closer = {
            value: closersApi?.data[i].firstName.trim() + ' ' + closersApi?.data[i].lastName,
            label: closersApi?.data[i].firstName.trim() + ' ' + closersApi?.data[i].lastName,
          }
          closers.push(closer);
        }
      }
    }
  }

  const [closer, setCloser] = useState(null);
  const handleCloser = (e) => {
    setCloser(e);
  };

  const [status, setStatus] = useState({ value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> Processed</span> } || null);
  const statuses = [
    { value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> Processed</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-warning"></i> Incomplete</span> },
    { value: 'fail_credit', label: <span><i className="fas fa-credit-card text-danger"></i> Fail credit</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> Payed</span> },
  ];
  const handleStatus = (e) => {
    setStatus(e);
  };
  const handleAddSitDown = (e) => {
    e.preventDefault();
    if (sName === "" || sAddress === "" || sPhoneNumber === "") {
      return Swal.fire(
        "Error",
        "All o fields must be completed",
        "error"
      );
    }
    dispatch(startAddSitDown(sName, sAddress, sPhoneNumber, sEmail, sReason, date, status.value, closer.value, canvasser.value, office));
  };
  const handleReturn = () => {
    navigate('/sitdowndetail');
  };
  return (
    <>{
      isMobile
        ?
        <div className='d-flex flex-column justify-content-center align-items-center mt-4' data-aos="fade-up" data-aos-duration="1000">
          <h1 className='text-dark h1'>Sit Down Detail</h1>
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
                <label className='text-light'>Email</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Email"
                  name="sEmail"
                  value={sEmail}
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
                <label className='text-light'>Closer</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                </div>
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
          <h1 className='text-dark'>Sit Down Detail</h1>
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
                <label className='text-light'>Email</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Email"
                  name="sEmail"
                  value={sEmail}
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
                <label className='text-light'>Closer</label>
                <div className="w-100">
                  <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                </div>
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
