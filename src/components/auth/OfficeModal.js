import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import Select from 'react-select';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiCloseModal } from "../../actions/ui";
import { fetchSinToken } from "../../helpers/fetch";
import "../modal.css";
import { login, startGetUser } from "../../actions/auth";


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

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const OfficeModal = ({ bodi }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid } = useSelector((state) => state.auth);
  const { modalOpen } = useSelector((state) => state.ui);
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

  const closeModal = useCallback(() => {
    dispatch(uiCloseModal());
  }, [dispatch]);

  const handleSetOffice = async (e) => {
    e.preventDefault();
    const startLoginGoogle = async (email, name, lastname, office) => {
      const role = 'closer';
      const resp = await fetchSinToken("auth/google", { email, name, lastname, role, office }, "POST");
      const body = await resp.json();
      if (body.ok) {
        localStorage.setItem("token", body.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        dispatch(login({ uid: body.uid, name: body.name, role: body.role, office: body.office }));
        dispatch(startGetUser(body.uid));
        closeModal();
      } else {
        closeModal();
        Swal.fire("Error", body.msg, "error");
      }
    }
    startLoginGoogle(bodi.email, bodi.name, bodi.lastname, office.value);
  };


  return (
    <div className="d-flex justify-content-center align-items-center">
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        // overlayClassName="modal-fondo"
        ariaHideApp={process.env.NODE_ENV === "test"}
      >
        <div className="d-flex flex-column justify-content-center align-items-center">
          <b style={{ fontSize: "25px" }}>Select your office</b>
        </div>
        <hr />
        <div className="d-flex flex-column justify-content-center align-items-center w-100">
          <div className="w-100">
            <div className="form-group d-flex flex-row justify-content-center align-items-center mb-3">
              <div className="m-2 w-10">
                <i className="fa-solid fa-building fa-lg"></i>
              </div>
              <div className="w-100">
                <Select styles={colourStyles} options={offices} value={office} onChange={handleOffice} />
              </div>
            </div>
            <div className="form-group d-flex justify-content-center">
              <button onClick={handleSetOffice} className="btn btn-primary btn-bright mt-4">
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
