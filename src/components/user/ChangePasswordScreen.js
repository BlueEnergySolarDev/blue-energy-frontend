import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { startChangePassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";

export const ChangePasswordScreen = () => {
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
        "All fields must be completed",
        "error"
      );
    }
    if (rPassword !== rPasswordConfirm) {
      return Swal.fire(
        "Error",
        "Passwords have to match",
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
        <form onSubmit={handleUpdate} className="w-50">
          <h2 className="mb-1 text-dark text-center">Change password</h2>
          <hr className="bg-dark" />
          <div className="form-group mb-2">
            <label>Password</label>
            <div className='d-flex flex-row align-items-center'>
              <input
                type={isHidden ? "password" : "text"}
                className="mb-2 form-control"
                placeholder="Password"
                name="rPassword"
                value={rPassword}
                autoComplete="new-password"
                onChange={handleUserInputChange}
              />
              <button style={{ width: "15%", height: "15%" }} className={isHidden ? 'btn btn-success btn-sm mb-2 ms-1' : 'btn btn-danger btn-sm mb-2 ms-1'} onClick={setHidden} type="button">{isHidden ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}</button>
            </div>
          </div>
          <div className="form-group mb-2">
            <label>Confirm Password</label>
            <div className='d-flex flex-row align-items-center'>
              <input
                type={isHidden ? "password" : "text"}
                className="mb-2 form-control"
                placeholder="Confirm password"
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
    </>
  );
};
