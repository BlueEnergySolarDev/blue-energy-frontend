import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConToken } from '../../helpers/fetch';
import Swal from 'sweetalert2';
import { useForm } from '../../hooks/useForm';
import { PaginatedSitDownsItems } from '../sitdowns/PaginatedSitDownsItems';
import { isMobile } from 'react-device-detect';

export const AdminScreen = () => {
  // const dispatch = useDispatch();
  const { uid, office } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [sitDowns, setSitDowns] = useState([]);
  const [actualAmount, setActualAmount] = useState(0);
  const [formAmountValues, , , , , handleAmountInputChange] = useForm({
    sAmount: 0,
  });
  const { sAmount } = formAmountValues;

  useEffect(() => {
    setLoading(true);
    const getSitDownCounter = async () => {
      const resp = await fetchConToken(`sitdowns/counter/${office}`);
      const body = await resp.json();
      if (body.ok) {
        setActualAmount(body.amount);
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    }
    getSitDownCounter();
    const getSitDownsSimples = async () => {
      const resp = await fetchConToken(`sitdowns/simple/${office}`);
      const body = await resp.json();
      setSitDowns(body.sitDownsSimples);
      setLoading(false);
    }
    getSitDownsSimples();
  }, []);

  const incrementCount = () => {
    handleAmountInputChange(1, 'plus')
  }

  const decrementCount = () => {
    handleAmountInputChange(1, 'minus')
  }

  const resetCount = () => {
    handleAmountInputChange(0, 'reset')
  }

  const saveSitDown = () => {
    const addSitDown = async () => {
      const resp = await fetchConToken("sitdowns/addsimple", { amount: sAmount, office, user: uid }, "POST");
      const body = await resp.json();
      if (body.ok) {
        setActualAmount(body.amount);
        Swal.fire("Success", 'Amount updated sucessfully', "success");
        const getSitDownsSimples = async () => {
          const resp = await fetchConToken(`sitdowns/simple/${office}`);
          const body = await resp.json();
          setSitDowns(body.sitDownsSimples);
        }
        getSitDownsSimples();
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    }
    addSitDown();
  }

  return (
    <>
      {
        isMobile
          ?
          <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
            <div className='d-flex flex-column justify-content-evenly align-items-center'>
              <Link to="/addsitdown" className='mb-3 mt-3'>
                <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                  <i className="fas fa-handshake"></i> Sit Down Detail
                </button>
              </Link>
              <h1 style={{ color: "black" }}>SIT DOWN</h1>
              <div className='w-100'>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                  <div className='mb-2'>
                    <h2 className='fw-bold'>Amount</h2>
                  </div>
                  <input
                    className="p-1 border rounded-pill border-primary primary-back text-light text-center fw-bold h3 border-bright"
                    type="number"
                    name="sAmount"
                    autoFocus
                    value={sAmount}
                    onChange={handleAmountInputChange}
                  />

                  <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                    <button className="me-2 btn btn-primary btn-lg" onClick={decrementCount}>
                      <i className="fa fa-circle-minus"></i>
                    </button>
                    <button className="ms-2 btn btn-primary btn-lg" onClick={incrementCount}>
                      <i className="fa fa-circle-plus"></i>
                    </button>
                  </div>
                  <button className="btn btn-primary btn-bright-sm " onClick={resetCount}>
                    <i className="fa fa-arrow-rotate-left"></i> Reset
                  </button>
                  <button onClick={saveSitDown} className="btn btn-success btn-bright-sm mt-4" title="Sit down control">
                    <i className="fas fa-floppy-disk"></i> Save
                  </button>
                </div>
                <div className='mt-5 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
                  <h2 className='mb-2 '>Actual amount in {office}</h2>
                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{actualAmount}</span>
                </div>
              </div>
              <div className='d-flex flex-column justify-content-center align-items-center mt-5 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                <h2>Simple Sit Down Register</h2>
                {sitDowns.length > 0 ?
                  <PaginatedSitDownsItems itemsPerPage={10} items={sitDowns} loading={loading} />
                  :
                  <div className='p-5'>
                    <span className="h3 text-dark">No sit downs</span>
                  </div>
                }
              </div>
            </div>
          </div>
          :
          <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
            <div className='d-flex flex-column justify-content-evenly align-items-center'>
              <Link to="/addsitdown" className='mb-3 mt-3'>
                <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                  <i className="fas fa-handshake"></i> Sit Down Detail
                </button>
              </Link>
              <h1 style={{ color: "black" }}>SIT DOWN</h1>
              <div className='row w-100'>
                <div className='d-flex flex-column justify-content-center align-items-center col-6'>
                  <div className='mb-2'>
                    <h2 className='fw-bold'>Amount</h2>
                  </div>
                  <input
                    className="p-1 border rounded-pill border-primary primary-back text-light text-center fw-bold h3 border-bright"
                    type="number"
                    name="sAmount"
                    autoFocus
                    value={sAmount}
                    onChange={handleAmountInputChange}
                  />

                  <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                    <button className="me-2 btn btn-primary btn-lg" onClick={decrementCount}>
                      <i className="fa fa-circle-minus"></i>
                    </button>
                    <button className="ms-2 btn btn-primary btn-lg" onClick={incrementCount}>
                      <i className="fa fa-circle-plus"></i>
                    </button>
                  </div>
                  <button className="btn btn-primary btn-bright-sm " onClick={resetCount}>
                    <i className="fa fa-arrow-rotate-left"></i> Reset
                  </button>
                  <button onClick={saveSitDown} className="btn btn-success btn-bright-sm mt-4" title="Sit down control">
                    <i className="fas fa-floppy-disk"></i> Save
                  </button>
                </div>
                <div className='col-6 mt-5 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
                  <h2 className='mb-2 '>Actual amount in {office}</h2>
                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{actualAmount}</span>
                </div>
              </div>

              <div className='d-flex flex-column justify-content-center align-items-center mt-5 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                <h2>Simple Sit Down Register</h2>
                {sitDowns.length > 0 ?
                  <PaginatedSitDownsItems itemsPerPage={10} items={sitDowns} loading={loading} />
                  :
                  <div className='p-5'>
                    <span className="h3 text-dark">No sit downs</span>
                  </div>
                }
              </div>
            </div>
          </div>
      }

    </>
  );
};
