import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Select from 'react-select';
import useSWR from "swr";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";

import { fetchConToken } from "../../helpers/fetch";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { PaginatedSitDownsItems } from "./PaginatedSitDownsItems";
import colourStyles from '../../helpers/selectStyles';

export const SitDownsScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { role, uid } = useSelector((state) => state.auth);
  const [sitDowns, setSitDowns] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data: closersApi } = useSWR("closers");
  const closers = [];
  const { data: canvasserApi } = useSWR("canvassers");
  const canvassers = [];
  const statuses = [
    { value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> {t('labels.processed')}</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-warning"></i> {t('labels.incomplete')}</span> },
    { value: 'fail_credit', label: <span><i className="fas fa-credit-card text-danger"></i> {t('labels.fail_credit')}</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> {t('labels.payed')}</span> },
  ];

  useEffect(() => {
    setLoading(true);
    if (role === 'office_manager') {
      const getSitDowns = async () => {
        const body = await fetchConToken('sitdowns/id/' + uid);
        setSitDowns(body.sitDowns);
        setLoading(false);
      }
      getSitDowns();
      // url = 'sitdowns/id/' + uid;
    } else {
      const getSitDowns = async () => {
        const body = await fetchConToken('sitdowns');
        setSitDowns(body.sitDowns);
        setLoading(false);
      }
      getSitDowns();
      // url = `sitdowns`;
    }
  }, [role, uid])

  // let url = "";
  // if (isOfficeManager) {
  //   url = 'sitdowns/id/' + uid;
  // } else {
  //   url = `sitdowns`;
  // }
  // const { data, error, isLoading } = useSWR(url);

  const [values, setValues] = useState({ cSearch: "" });
  const handleSearchInputChange = ({ target }) => {
    const getSitDowns = async () => {
      let body;
      if (role === 'office_manager') {
        body = await fetchConToken('sitdowns/id/' + uid);
      } else {
        body = await fetchConToken(`sitdowns`);
      }
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
    }
    const searchSitDown = async () => {
      let body;
      if (role === 'office_manager') {
        body = await fetchConToken(`sitdowns/search/id/${uid}/${target.value}`);
      } else {
        body = await fetchConToken(`sitdowns/search/${target.value}`);
      }
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
    }

    if (target.value === "") {
      getSitDowns();
    } else {
      searchSitDown();
    }

    setValues({
      ...values,
      [target.name]: target.value,
    });
  };
  const { cSearch } = values;
  const handleSearch = (e) => {
    e.preventDefault();
    const searchSitDown = async () => {
      let body;
      if (role === 'office_manager') {
        body = await fetchConToken(`sitdowns/search/id/${uid}/${cSearch}`);
      } else {
        body = await fetchConToken(`sitdowns/search/${cSearch}`);
      }
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
    }
    searchSitDown();
  };

  if (closersApi?.closers) {
    const closersLen = closersApi?.closers.length;
    for (let i = 0; i < closersLen; i++) {
      const closer = {
        value: closersApi?.closers[i].id,
        label: closersApi?.closers[i].firstName + ' ' + closersApi?.closers[i].lastName,
      }
      closers.push(closer);
    }
  }
  const [closer, setCloser] = useState(null);
  const handleCloser = (e) => {
    setValues({
      ...values,
      'cSearch': "",
    });
    setStatus(null);
    setCanvasser(null);
    setCloser(e);
    if (e) {
      const searchSitDownByCloser = async () => {
        let body;
        if (role === 'office_manager') {
          body = await fetchConToken(`sitdowns/searchbycloser/id/${uid}/${e.value}`);
        } else {
          body = await fetchConToken(`sitdowns/searchbycloser/${e.value}`);
        }
        setSitDowns(body.sitDowns);
      }
      searchSitDownByCloser();
    }
  };

  if (canvasserApi?.canvassers) {
    const canvassersLen = canvasserApi?.canvassers.length
    for (let i = 0; i < canvassersLen; i++) {
      const canvasser = {
        value: canvasserApi?.canvassers[i].id,
        label: canvasserApi?.canvassers[i].firstName + ' ' + canvasserApi?.canvassers[i].lastName
      }
      canvassers.push(canvasser);
    }
  }
  const [canvasser, setCanvasser] = useState(null);
  const handleCanvasser = (e) => {
    setValues({
      ...values,
      'cSearch': "",
    });
    setCloser(null);
    setStatus(null);
    setCanvasser(e);
    if (e) {
      const searchSitDownByCanvasser = async () => {
        let body;
        if (role === 'office_manager') {
          body = await fetchConToken(`sitdowns/searchbycanvasser/id/${uid}/${e.value}`);
        } else {
          body = await fetchConToken(`sitdowns/searchbycanvasser/${e.value}`);
        }
        setSitDowns(body.sitDowns);
      }
      searchSitDownByCanvasser();
    }
  };

  const [status, setStatus] = useState(null);
  const handleStatus = (e) => {
    setValues({
      ...values,
      'cSearch': "",
    });
    setCloser(null);
    setCanvasser(null);
    setStatus(e);
    if (e) {
      const searchSitDownByStatus = async () => {
        let body;
        if (role === 'office_manager') {
          body = await fetchConToken(`sitdowns/searchbystatus/id/${uid}/${e.value}`);
        } else {
          body = await fetchConToken(`sitdowns/searchbystatus/${e.value}`);
        }
        setSitDowns(body.sitDowns);
      }
      searchSitDownByStatus();
    }
  };

  const removeFilter = (e) => {
    setValues({
      ...values,
      'cSearch': "",
    });
    setCloser(null);
    setStatus(null);
    setCanvasser(null);
    const getSitDowns = async () => {
      let body;
      if (role === 'office_manager') {
        body = await fetchConToken('sitdowns/id/' + uid);
      } else {
        body = await fetchConToken(`sitdowns`);
      }
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
    }
    getSitDowns();
  };

  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <>
      {
        loading ?
          <LoadingSpinner />
          :
          <div className="text-center d-flex flex-column justify-content-center align-items-center w-100" data-aos="fade-up" data-aos-duration="1000">
            {
              isMobile
                ?
                <div className="d-flex flex-column justify-content-center align-items-center">
                  {role === 'office_manager' &&
                    <Link to="/addsitdowndetail" className='d-flex m-2 text-decoration-none'>
                      <button className="btn btn-success" title={t('detailed_sit_downs.register.title')}>
                        <i className="fas fa-plus-circle"></i> {t('labels.add')}
                      </button>
                    </Link>
                  }
                  <div>
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                      <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-menu w-100 p-2" aria-labelledby="dropdownMenuClickableInside">
                      <form className='form-group d-flex justify-content-center align-items-center w-100' onSubmit={handleSearch}>
                        <input className='form-control me-2 text-center' title={t('filters.search_title')} placeholder={t('filters.search_placeholder')} type="text" name="cSearch" value={cSearch} onChange={handleSearchInputChange} />
                        <button type="submit" className='btn btn-primary'><i className="fas fa-search"></i></button>
                      </form>
                      <div className="mt-2 row">
                        <div className="col">
                          <label>{t('labels.closer')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                        </div>
                        <div className="col">
                          <label>{t('labels.canvasser')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                        </div>
                        <div className="col">
                          <label>{t('labels.status')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                        </div>
                      </div>
                      <div className="mt-2 d-grid gap-2">
                        <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> {t('filters.remove_filter')}</button>
                      </div>
                    </div>
                  </div>
                </div>
                :
                <div className="d-flex flex-row justify-content-center align-items-center w-100 p-3">
                  <div className="w-100 dropend d-flex">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                      <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-menu w-80 p-2" aria-labelledby="dropdownMenuClickableInside">
                      <form className='form-group d-flex justify-content-center align-items-center w-100' onSubmit={handleSearch}>
                        <input className='form-control me-2 text-center' title={t('filters.search_title')} placeholder={t('filters.search_placeholder')} type="text" name="cSearch" value={cSearch} onChange={handleSearchInputChange} />
                        <button type="submit" className='btn btn-primary'><i className="fas fa-search"></i></button>
                      </form>
                      <div className="mt-2 row">
                        <div className="col">
                          <label>{t('labels.closer')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                        </div>
                        <div className="col">
                          <label>{t('labels.canvasser')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                        </div>
                        <div className="col">
                          <label>{t('labels.status')}</label>
                          <Select placeholder={t('select.placeholder')} styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                        </div>
                      </div>
                      <div className="mt-2 d-grid gap-2">
                        <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> {t('filters.remove_filter')}</button>
                      </div>
                    </div>
                  </div>
                  {role === 'office_manager' &&
                    <Link to="/addsitdowndetail" className='d-flex justify-content-end m-2 w-50 text-decoration-none'>
                      <button className="btn btn-success" title={t('detailed_sit_downs.register.title')}>
                        <i className="fas fa-plus-circle"></i> {t('labels.add')}
                      </button>
                    </Link>
                  }
                </div>
            }
            <h1 className="text-dark mb-4 mt-2">{t('detailed_sit_downs.title')}</h1>
            {
              sitDowns.length > 0 ?
                <PaginatedSitDownsItems itemsPerPage={10} items={sitDowns} loading={loading} />
                :
                <span className="h3">{t('detailed_sit_downs.empty')}</span>
            }
            <div className="form-group d-flex flex-row justify-content-center">
              <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
                <i className="fa fa-arrow-rotate-left me-1"></i> {t('buttons.return')}
              </button>
            </div>
          </div >
      }
    </>
  );
};
