import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import useSWR from "swr"
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

import { fetchConToken } from '../../helpers/fetch';
import { OfficeCard } from '../user/OfficeCard';
import { PaginatedSitDownsSimplesItems } from '../sitdownsimple/PaginatedSitDownsSimplesItems';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const AdminScreen = () => {
  const { t } = useTranslation();
  const { data: offices } = useSWR("sitdowns/counter")
  // const { data: sitDowns, error, isLoading } = useSWR("sitdowns/simple");
  const [sitDownsSimples, setSitDownsSimples] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    setLoading(true);
    setLoadingTable(true);
    const getSitDownsSimples = async () => {
      const body = await fetchConToken("sitdowns/simple");
      setSitDownsSimples(body.sitDownsSimples);
      setLoading(false);
      setLoadingTable(false);
    }
    getSitDownsSimples();
  }, [])

  const [date, setDate] = useState(format(new Date(), 'MM-dd-yyyy HH:mm'));
  const handleDateChange = (e) => {
    setLoadingTable(true);
    setDate(e);
    const searchSitDownByStatus = async () => {
      const body = await fetchConToken(`sitdowns/simple/searchbydate/${e}`);
      setSitDownsSimples(body.sitDownsSimples);
      setLoadingTable(false);
    }
    searchSitDownByStatus();
  };
  const removeFilter = () => {
    setDate(null);
    setLoadingTable(true);
    const getSitDownsSimples = async () => {
      const body = await fetchConToken("sitdowns/simple");
      setSitDownsSimples(body.sitDownsSimples);
      setLoadingTable(false);
    }
    getSitDownsSimples();
  };
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
                    <h1 className='text-dark h1'>{t('admin.title')}</h1>
                    <div className="container px-4">
                      {offices?.offices.length > 0 &&
                        <div>
                          <div className='row mt-2'>
                            {offices?.offices.map((office) => {
                              return (
                                <OfficeCard key={office.name} office={office} />
                              )
                            })}
                          </div>
                          <div className='row mt-2 gx-5' data-aos="fade-up" data-aos-duration="1000">
                            <div className='col m-1 d-flex flex-column justify-content-center rounded-3 degrade-ld-back text-light p-2'>
                              <h2 className='mb-2 text-center'>{t('admin.total')}</h2>
                              <hr className='p-0 m-0' />
                              <div className='d-flex justify-content-evenly mt-1'>
                                <div className='d-flex flex-column'>
                                  <h2 className='mb-2'>{t('sit_downs.title')}</h2>
                                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{offices?.totalSitDowns}</span>
                                </div>
                                <div className='d-flex flex-column'>
                                  <h2 className='mb-2'>{t('sit_downs.fail_credits')}</h2>
                                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{offices?.totalFailCredits}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                    <div className='d-flex flex-column m-1' data-aos="fade-up" data-aos-duration="1000">
                      <Link to="/sitdowndetail" className='m-1'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                          <i className="fas fa-handshake"></i> {t('detailed_sit_downs.title')}
                        </button>
                      </Link>
                      <Link to="/users" className='m-1'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Manage users">
                          <i className="fas fa-user"></i> {t('users.title')}
                        </button>
                      </Link>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <div className='dropend w-100 d-flex align-self-start ps-2 mb-3'>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                          <i className="fa fa-filter"></i>
                        </button>
                        <div className="dropdown-menu w-80 p-2" aria-labelledby="dropdownMenuClickableInside">
                          <div>
                            <DateTimePicker
                              onChange={handleDateChange}
                              value={date}
                              className="form-control mb-2"
                              format='MM-dd-yyyy'
                            />
                          </div>
                          <div className="mt-2 d-grid gap-2">
                            <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> {t('filters.remove_filter')}</button>
                          </div>
                        </div>
                      </div>
                      <h2 className='text-dark'>{t('sit_downs.simple_register')}</h2>
                      {sitDownsSimples.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDownsSimples} loading={loadingTable} />
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
                    <h1 className='text-dark'>{t('admin.title')}</h1>
                    <div className="container px-4">
                      {offices?.offices.length > 0 &&
                        <div>
                          <div className='row mt-3 gx-5'>

                            {offices?.offices.map((office) => {
                              return (
                                <OfficeCard key={office.name} office={office} />
                              )
                            })}
                          </div>
                          <div className='row mt-2 gx-5' data-aos="fade-up" data-aos-duration="1000">
                            <div className='col m-1 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
                              <h2 className='mb-2'>{t('admin.total')}</h2>
                              <hr className='p-0 m-0' />
                              <div className='d-flex flex-row mt-1 w-80'>
                                <div className='d-flex flex-column me-5 w-50'>
                                  <h2 className='mb-2'>{t('sit_downs.title')}</h2>
                                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{offices?.totalSitDowns}</span>
                                </div>
                                <div className='d-flex flex-column w-50'>
                                  <h2 className='mb-2'>{t('sit_downs.fail_credits')}</h2>
                                  <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{offices?.totalFailCredits}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                    <div className='m-2' data-aos="fade-up" data-aos-duration="1000">
                      <Link to="/sitdowndetail" className='m-3'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                          <i className="fas fa-handshake"></i> {t('detailed_sit_downs.title')}
                        </button>
                      </Link>
                      <Link to="/users" className='m-3'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Manage users">
                          <i className="fas fa-user"></i> {t('users.title')}
                        </button>
                      </Link>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <div className='dropend w-50 d-flex align-self-start ps-2 mb-3'>
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                          <i className="fa fa-filter"></i>
                        </button>
                        <div className="dropdown-menu w-80 p-2" aria-labelledby="dropdownMenuClickableInside">
                          <div>
                            <DateTimePicker
                              onChange={handleDateChange}
                              value={date}
                              className="form-control mb-2"
                              format='MM-dd-yyyy'
                            />
                          </div>
                          <div className="mt-2 d-grid gap-2">
                            <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> {t('filters.remove_filter')}</button>
                          </div>
                        </div>
                      </div>
                      <h2 className='text-dark'>{t('sit_downs.simple_register')}</h2>
                      {sitDownsSimples.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDownsSimples} loading={loadingTable} />
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
