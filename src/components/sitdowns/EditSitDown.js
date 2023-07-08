import React from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import Select from 'react-select';
import { format } from 'date-fns';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { isMobile } from 'react-device-detect';
import useSWR from "swr";
import { fetchConToken } from '../../helpers/fetch';

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const EditSitDown = () => {
  const { office, uid } = useSelector((state) => state.auth);
  const { sitDownSelected } = useSelector((state) => state.sitDown);
  const navigate = useNavigate();
  const [formSitDownValues, handleSitDownInputChange] = useForm({
    sName: sitDownSelected ? sitDownSelected.name : "",
    sAddress: sitDownSelected ? sitDownSelected.address : "",
    sPhoneNumber: sitDownSelected ? sitDownSelected.phone_number : "",
    sEmail: sitDownSelected ? sitDownSelected.email : "",
    sReason: sitDownSelected ? sitDownSelected.reason : "",
  });
  const { sName, sAddress, sPhoneNumber, sEmail, sReason } = formSitDownValues;

  const [date, setDate] = useState(sitDownSelected ? format(new Date(sitDownSelected.date), 'MM-dd-yyyy HH:mm') : format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setDate(e);
  };

  const { data: canvasserApi } = useSWR("canvassers");
  const canvassers = [];
  if (canvasserApi?.canvassers) {
    const canvassersLen = canvasserApi?.canvassers.length
    for (let i = 0; i < canvassersLen; i++) {
      if (canvasserApi?.canvassers[i].office === office) {
        const canvasser = {
          value: canvasserApi?.canvassers[i].id,
          label: canvasserApi?.canvassers[i].firstName + ' ' + canvasserApi?.canvassers[i].lastName
        }
        canvassers.push(canvasser);
      }
    }
  }
  const [canvasser, setCanvasser] = useState(sitDownSelected.canvasser ? { value: sitDownSelected.canvasser.id, label: sitDownSelected.canvasser.firstName + ' ' + sitDownSelected.canvasser.lastName } : null);
  const handleCanvasser = (e) => {
    setCanvasser(e);
  };

  const { data: closersApi } = useSWR("closers");
  const closers = [];
  if (closersApi?.closers) {
    const closersLen = closersApi?.closers.length;
    for (let i = 0; i < closersLen; i++) {
      if (closersApi?.closers[i].office === office) {
        const closer = {
          value: closersApi?.closers[i].id,
          label: closersApi?.closers[i].firstName + ' ' + closersApi?.closers[i].lastName,
        }
        closers.push(closer);
      }
    }
  }
  const [closer, setCloser] = useState(sitDownSelected.closer ? { value: sitDownSelected.closer.id, label: sitDownSelected.closer.firstName + ' ' + sitDownSelected.closer.lastName } : null);
  const handleCloser = (e) => {
    setCloser(e);
  };

  const [status, setStatus] = useState(sitDownSelected.status
    ?
    {
      value: sitDownSelected.status,
      label: sitDownSelected.status === 'processed' ? <span><i className="fas fa-spinner text-muted"></i> Processed</span> : sitDownSelected.status === 'incomplete' ? <span><i className="fas fa-exclamation-circle text-warning"></i> Incomplete</span> : sitDownSelected.status === 'fail_credit' ? <span><i className="fas fa-credit-card text-danger"></i> Fail credit</span> : <span><i className="fas fa-check text-success"></i> Payed</span>
    }
    : null);

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
    let closerr = null;
    if (closer) {
      closerr = closer?.value;
    }
    let canvasserr = null;
    if (canvasser) {
      canvasserr = canvasser.value;
    }
    if (sitDownSelected) {
      const startUpdateSitDown = async(id, name, address, phone_number, email, reason, date, status, closer, canvasser, office, user) => {
        const body = await fetchConToken(
          "sitdowns/update",
          { id, name, address, phone_number, email, reason, date, status, closer, canvasser, office, user },
          "PUT"
        );
        if (body.ok) {
          Swal.fire("Success", "Sit down updated", "success");
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
