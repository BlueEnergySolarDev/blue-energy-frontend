import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaginatedSitDownsItems } from "./PaginatedSitDownsItems";
import { useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";
import Select from 'react-select';
import useSWR from "swr";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { isMobile } from "react-device-detect";

const colourStyles = {
  control: styles => ({ ...styles, width: '100%' }),
};

export const SitDownsScreen = () => {
  const navigate = useNavigate();
  const { role, uid, office } = useSelector((state) => state.auth);
  const [sitDowns, setSitDowns] = useState([]);
  const [loading, setLoading] = useState(false);

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
  }, [role])


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
      setLoading(true);
      const body = await fetchConToken(`sitdowns`);
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
      setLoading(false);
    }
    const searchSitDown = async () => {
      const body = await fetchConToken(`sitdowns/search/${target.value}`);
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
      const body = await fetchConToken(`sitdowns/search/${cSearch}`);
      setCloser(null);
      setStatus(null);
      setCanvasser(null);
      setSitDowns(body.sitDowns);
    }
    searchSitDown();
  };

  const { data: closersApi } = useSWR("closers");
  const closers = [];
  if (closersApi?.closers) {
    const closersLen = closersApi?.closers.length;
    for (let i = 0; i < closersLen; i++) {
      // if (closersApi?.closers[i].office === office) {
        const closer = {
          value: closersApi?.closers[i].id,
          label: closersApi?.closers[i].firstName + ' ' + closersApi?.closers[i].lastName,
        }
        closers.push(closer);
      // }
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
        const body = await fetchConToken(`sitdowns/searchbycloser/${e.value}`);
        setSitDowns(body.sitDowns);
      }
      searchSitDownByCloser();
    }
  };


  const { data: canvasserApi } = useSWR("canvassers");
  const canvassers = [];
  if (canvasserApi?.canvassers) {
    const canvassersLen = canvasserApi?.canvassers.length
    for (let i = 0; i < canvassersLen; i++) {
      // if (canvasserApi?.canvassers[i].office === office) {
        const canvasser = {
          value: canvasserApi?.canvassers[i].id,
          label: canvasserApi?.canvassers[i].firstName + ' ' + canvasserApi?.canvassers[i].lastName
        }
        canvassers.push(canvasser);
      // }
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
        const body = await fetchConToken(`sitdowns/searchbycanvasser/${e.value}`);
        setSitDowns(body.sitDowns);
      }
      searchSitDownByCanvasser();
    }
  };

  const [status, setStatus] = useState(null);
  const statuses = [
    { value: 'processed', label: <span><i className="fas fa-spinner text-muted"></i> Processed</span> },
    { value: 'incomplete', label: <span><i className="fas fa-exclamation-circle text-warning"></i> Incomplete</span> },
    { value: 'fail_credit', label: <span><i className="fas fa-credit-card text-danger"></i> Fail credit</span> },
    { value: 'payed', label: <span><i className="fas fa-check text-success"></i> Payed</span> },
  ];
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
        const body = await fetchConToken(`sitdowns/searchbystatus/${e.value}`);
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
                    < Link to="/addsitdowndetail" className='d-flex m-2 text-decoration-none'>
                      <button className="btn btn-success" title="Add sit down detail">
                        <i className="fas fa-plus-circle"></i> Add
                      </button>
                    </Link>
                  }
                  <div>
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuClickableInside" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                      <i className="fa fa-filter"></i>
                    </button>
                    <div className="dropdown-menu w-100 p-2" aria-labelledby="dropdownMenuClickableInside">
                      <form className='form-group d-flex justify-content-center align-items-center w-100' onSubmit={handleSearch}>
                        <input className='form-control me-2 text-center' title='Search by name' placeholder='Search a sit down by name' type="text" name="cSearch" value={cSearch} onChange={handleSearchInputChange} />
                        <button type="submit" className='btn btn-primary'><i className="fas fa-search"></i></button>
                      </form>
                      <div className="mt-2 row">
                        <div className="col">
                          <label>Closer</label>
                          <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                        </div>
                        <div className="col">
                          <label>Canvasser</label>
                          <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                        </div>
                        <div className="col">
                          <label>Status</label>
                          <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                        </div>
                      </div>
                      <div className="mt-2 d-grid gap-2">
                        <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> Remove filter</button>
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
                        <input className='form-control me-2 text-center' title='Search by name' placeholder='Search a sit down by name' type="text" name="cSearch" value={cSearch} onChange={handleSearchInputChange} />
                        <button type="submit" className='btn btn-primary'><i className="fas fa-search"></i></button>
                      </form>
                      <div className="mt-2 row">
                        <div className="col">
                          <label>Closer</label>
                          <Select styles={colourStyles} options={closers} value={closer} onChange={handleCloser} />
                        </div>
                        <div className="col">
                          <label>Canvasser</label>
                          <Select styles={colourStyles} options={canvassers} value={canvasser} onChange={handleCanvasser} />
                        </div>
                        <div className="col">
                          <label>Status</label>
                          <Select styles={colourStyles} options={statuses} value={status} onChange={handleStatus} />
                        </div>
                      </div>
                      <div className="mt-2 d-grid gap-2">
                        <button type="submit" className='btn btn-danger' onClick={removeFilter}><i className="fas fa-trash"></i> Remove filter</button>
                      </div>
                    </div>
                  </div>
                  {role === 'office_manager' &&
                    < Link to="/addsitdowndetail" className='d-flex justify-content-end m-2 w-50 text-decoration-none'>
                      <button className="btn btn-success" title="Add sit down detail">
                        <i className="fas fa-plus-circle"></i> Add
                      </button>
                    </Link>
                  }
                </div>
            }
            <h1 className="text-dark mb-4 mt-2">Sit Down Detail</h1>
            {
              sitDowns.length > 0 ?
                <PaginatedSitDownsItems itemsPerPage={10} items={sitDowns} loading={loading} />
                :
                <span className="h3">No sit downs detail</span>
            }
            <div className="form-group d-flex flex-row justify-content-center">
              <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
                <i className="fa fa-arrow-rotate-left me-1"></i> Return
              </button>
            </div>
          </div >
      }
    </>
  );
};
