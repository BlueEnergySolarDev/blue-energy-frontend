import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useForm } from '../../hooks/useForm';
import { PaginatedSitDownsSimplesItems } from '../sitdownsimple/PaginatedSitDownsSimplesItems';
import { fetchConToken } from '../../helpers/fetch';
import { OfficeCard } from '../user/OfficeCard';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const OfficeManagerScreen = () => {
  const { t } = useTranslation();
  const { uid, office } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [sitDowns, setSitDowns] = useState([]);
  const [officeData, setOfficeData] = useState(0);
  const [formAmountValues, , , , , handleAmountInputChange] = useForm({
    sAmount: 0,
    sFailCredit: 0
  });
  const { sAmount, sFailCredit } = formAmountValues;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    const getSitDownCounter = async () => {
      const body = await fetchConToken(`sitdowns/counter/id/${uid}`);
      if (body.ok) {
        if (isMounted) {
          setOfficeData(body.office);
          setLoading(false);
        }
      } else {
        Swal.fire("Error", body.msg, "error");
        setLoading(false);
      }
    }
    getSitDownCounter();
    const getSitDownsSimples = async () => {
      const body = await fetchConToken(`sitdowns/simple/id/${uid}`);
      if (isMounted) {
        setSitDowns(body.sitDownsSimples);
        setLoading(false);
      }
    }
    getSitDownsSimples();
    return () => {
      isMounted = false;
    }
  }, [uid]);

  const incrementCount = (name) => {
    handleAmountInputChange(1, 'plus', name)
  }

  const decrementCount = (name) => {
    handleAmountInputChange(1, 'minus', name)
  }

  const resetCount = (name) => {
    handleAmountInputChange(0, 'reset', name)
  }

  const saveSitDown = () => {
    const addSitDown = async () => {
      const body = await fetchConToken("sitdowns/addsimple", { amount: sAmount, office, user: uid, fail_credit: sFailCredit }, "POST");
      if (body.ok) {
        setOfficeData(body.office);
        Swal.fire(t('success.title'), t('success.amount_update'), "success");
        const getSitDownsSimples = async () => {
          const body = await fetchConToken(`sitdowns/simple/${office}`);
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
        loading
          ?
          <LoadingSpinner />
          :
          <div>
            {
              isMobile
                ?
                <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
                  <div className='d-flex flex-column justify-content-evenly align-items-center'>
                    <Link to="/sitdowndetail" className='mb-3 mt-3 text-decoration-none'>
                      <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                        <i className="fas fa-handshake"></i> {t('detailed_sit_downs.title')}
                      </button>
                    </Link>
                    <h1 className='text-dark'>{t('sit_downs.sit_down')}</h1>
                    <div className='w-100'>
                      <div className='d-flex flex-column justify-content-center align-items-center col'>
                        <div className='mb-2'>
                          <h2 className='fw-bold h4'>{t('office_manager.amount')}</h2>
                        </div>
                        <input
                          className="border rounded-pill border-primary secondary-back text-light text-center fw-bold h3 border-bright"
                          type="number"
                          name="sAmount"
                          autoFocus
                          value={sAmount}
                          onChange={handleAmountInputChange}
                        />
                        <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                          <button className="me-2 btn btn-primary" onClick={() => { decrementCount('sAmount') }}>
                            <i className="fa fa-circle-minus"></i>
                          </button>
                          <button className="me-2 ms-2 btn btn-primary" onClick={() => { resetCount('sAmount') }}>
                            <i className="fa fa-arrow-rotate-left"></i>
                          </button>
                          <button className="ms-2 btn btn-primary" onClick={() => { incrementCount('sAmount') }}>
                            <i className="fa fa-circle-plus"></i>
                          </button>
                        </div>
                        <div className='mb-2'>
                          <h2 className='fw-bold h4'>{t('sit_downs.fail_credits')}</h2>
                        </div>
                        <input
                          className="border rounded-pill border-primary secondary-back text-light text-center fw-bold h3 border-bright"
                          type="number"
                          name="sFailCredit"
                          value={sFailCredit}
                          onChange={handleAmountInputChange}
                        />

                        <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                          <button className="me-2 btn btn-primary" onClick={() => { decrementCount('sFailCredit') }}>
                            <i className="fa fa-circle-minus"></i>
                          </button>
                          <button className="me-2 ms-2 btn btn-primary" onClick={() => { resetCount('sFailCredit') }}>
                            <i className="fa fa-arrow-rotate-left"></i>
                          </button>
                          <button className="ms-2 btn btn-primary" onClick={() => { incrementCount('sFailCredit') }}>
                            <i className="fa fa-circle-plus"></i>
                          </button>
                        </div>
                        <button onClick={saveSitDown} className="btn btn-success btn-bright-sm mt-2" title="Sit down control">
                          <i className="fas fa-floppy-disk"></i> {t('buttons.save')}
                        </button>
                      </div>
                      <div className='mt-4'>
                        <OfficeCard office={officeData} />
                      </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <h2 className='text-dark'>{t('sit_downs.simple_register')}</h2>
                      {sitDowns.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns} loading={loading} />
                        :
                        <div className='p-5'>
                          <span className="h3 text-dark">{t('sit_downs.empty')}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
                :
                <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
                  <div className='d-flex flex-column justify-content-evenly align-items-center'>
                    <Link to="/sitdowndetail" className='mb-2 mt-2 text-decoration-none'>
                      <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                        <i className="fas fa-handshake"></i> {t('detailed_sit_downs.title')}
                      </button>
                    </Link>
                    <h1 className='text-dark'>{t('sit_downs.sit_down')}</h1>
                    <div className='row w-100'>
                      <div className='d-flex flex-column justify-content-center align-items-center col'>
                        <div className='mb-2'>
                          <h2 className='fw-bold h4'>{t('office_manager.amount')}</h2>
                        </div>
                        <input
                          className="border rounded-pill border-primary secondary-back text-light text-center fw-bold h3 border-bright"
                          type="number"
                          name="sAmount"
                          autoFocus
                          value={sAmount}
                          onChange={handleAmountInputChange}
                        />
                        <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                          <button className="me-2 btn btn-primary" onClick={() => { decrementCount('sAmount') }}>
                            <i className="fa fa-circle-minus"></i>
                          </button>
                          <button className="me-2 ms-2 btn btn-primary" onClick={() => { resetCount('sAmount') }}>
                            <i className="fa fa-arrow-rotate-left"></i>
                          </button>
                          <button className="ms-2 btn btn-primary" onClick={() => { incrementCount('sAmount') }}>
                            <i className="fa fa-circle-plus"></i>
                          </button>
                        </div>
                        <div className='mb-2'>
                          <h2 className='fw-bold h4'>{t('sit_downs.fail_credits')}</h2>
                        </div>
                        <input
                          className="border rounded-pill border-primary secondary-back text-light text-center fw-bold h3 border-bright"
                          type="number"
                          name="sFailCredit"
                          value={sFailCredit}
                          onChange={handleAmountInputChange}
                        />

                        <div className='button__wrapper d-flex justify-content-center align-items-center m-3'>
                          <button className="me-2 btn btn-primary" onClick={() => { decrementCount('sFailCredit') }}>
                            <i className="fa fa-circle-minus"></i>
                          </button>
                          <button className="me-2 ms-2 btn btn-primary" onClick={() => { resetCount('sFailCredit') }}>
                            <i className="fa fa-arrow-rotate-left"></i>
                          </button>
                          <button className="ms-2 btn btn-primary" onClick={() => { incrementCount('sFailCredit') }}>
                            <i className="fa fa-circle-plus"></i>
                          </button>
                        </div>
                        <button onClick={saveSitDown} className="btn btn-success btn-bright-sm mt-2" title="Sit down control">
                          <i className="fas fa-floppy-disk"></i> {t('buttons.save')}
                        </button>
                      </div>
                      <OfficeCard office={officeData} />
                    </div>

                    <div className='d-flex flex-column justify-content-center align-items-center mt-5 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <h2 className='text-dark'>{t('sit_downs.simple_register')}</h2>
                      {sitDowns.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns} loading={loading} />
                        :
                        <div className='p-5'>
                          <span className="h3 text-dark">{t('sit_downs.empty')}</span>
                        </div>
                      }
                    </div>
                  </div>
                </div>
            }
          </div>
      }
    </>
  );
};
