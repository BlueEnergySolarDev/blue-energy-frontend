import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import Select from 'react-select';
import { isMobile } from 'react-device-detect';
import { startUpdateUserFromAdmin } from '../../actions/auth';
import { fetchConToken } from '../../helpers/fetch';
import { LoadingSpinner } from '../ui/LoadingSpinner';

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const EditUser = () => {
  const { userSelected } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formUserValues, handleUserInputChange, reset] = useForm({
    sName: userSelected ? userSelected.name : "",
    sLastname: userSelected ? userSelected.lastname : "",
    sEmail: userSelected ? userSelected.email : "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
    setIsLoading(true);
    const { user: userSelected } = await fetchConToken(`auth/${localStorage.getItem('userId')}`);
    reset({
      sName: userSelected ? userSelected.name : "",
      sLastname: userSelected ? userSelected.lastname : "",
      sEmail: userSelected ? userSelected.email : "",
    })
    setOffice(userSelected ? { value: userSelected.office, label: userSelected.office } : null);
    setRole(userSelected ? { value: userSelected.role, label: userSelected.role.replace('_', ' ').toUpperCase() } : null());
    setStatus(userSelected ? userSelected.status : true);
    setIsLoading(false);
  }, [])

  const { sName, sLastname, sEmail } = formUserValues;
  const [status, setStatus] = useState(userSelected ? userSelected.status : true);
  const [office, setOffice] = useState(userSelected ? { value: userSelected.office, label: userSelected.office } : null);
  const offices = [
    { value: 'Boca Raton', label: 'Boca Raton' },
    { value: 'Bradenton', label: 'Bradenton' },
    { value: 'Cape Coral', label: 'Cape Coral' },
    { value: 'Jacksonville', label: 'Jacksonville' },
  ];
  const handleOffice = (e) => {
    setOffice(e);
  };

  const [role, setRole] = useState(userSelected ? { value: userSelected.role, label: userSelected.role.replace('_', ' ').toUpperCase() } : null);
  const roles = [
    { value: 'admin', label: 'ADMIN' },
    { value: 'office_manager', label: 'OFFICE MANAGER' },
  ];
  const handleRole = (e) => {
    setRole(e);
  };

  const handleAddSitDown = (e) => {
    e.preventDefault();
    if (sName === "" || sLastname === "" || sEmail === "") {
      return Swal.fire(
        "Error",
        "All o fields must be completed",
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
                <h1 className='text-dark h1'>User</h1>
                <div className="w-80 login-form-2 m-2">
                  <form onSubmit={handleAddSitDown}>
                    <div className="form-group">
                      <label className='text-light'>Firstname</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Firstname"
                        name="sName"
                        value={sName}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>Lastname</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Lastname"
                        name="sLastname"
                        value={sLastname}
                        onChange={handleUserInputChange}
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
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>Office</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>Role</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={roles} value={role} onChange={handleRole} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='form-label' style={{ color: "white" }}>Status</label>
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
                <h1 className='text-dark'>User</h1>
                <div className="col-md-6 login-form-2 m-4">
                  <form onSubmit={handleAddSitDown}>
                    <div className="form-group">
                      <label className='text-light'>Firstname</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Firstname"
                        name="sName"
                        value={sName}
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className='text-light'>Lastname</label>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Lastname"
                        name="sLastname"
                        value={sLastname}
                        onChange={handleUserInputChange}
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
                        onChange={handleUserInputChange}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>Office</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='text-light'>Role</label>
                      <div className="w-100">
                        <Select styles={colourStyles} options={roles} value={role} onChange={handleRole} />
                      </div>
                    </div>
                    <div className="form-group mb-3">
                      <label className='form-label text-light'>Status</label>
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
          }
        </>
      }
    </>
  );
};
