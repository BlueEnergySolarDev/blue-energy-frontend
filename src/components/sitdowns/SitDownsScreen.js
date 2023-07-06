import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaginatedSitDownsItems } from "./PaginatedSitDownsItems";
import useSWR from "swr"
import { useSelector } from "react-redux";

export const SitDownsScreen = () => {
  const navigate = useNavigate();
  const { role, office } = useSelector((state) => state.auth);
  const [isOfficeManager, setIsOfficeManager] = useState(false);
  useEffect(() => {
    if (role === 'office_manager') {
      setIsOfficeManager(true);
    }
  }, [role]);
  let url = "";
  if (isOfficeManager) {
    url = 'sitdowns/' + office;
  } else {
    url = `sitdowns`;
  }
  const { data, error, isLoading } = useSWR(url);

  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      {isOfficeManager &&
        < Link to="/addsitdowndetail" className='m-2'>
          <button className="btn btn-success" title="Add sit down detail">
            <i className="fas fa-plus-circle"></i> Add
          </button>
        </Link>
      }
      <h1 className="text-dark mb-4 mt-2">Sit Down Detail</h1>
      {
        data?.sitDowns.length > 0 ?
          <PaginatedSitDownsItems itemsPerPage={10} items={data?.sitDowns} loading={isLoading} />
          :
          <span className="h3">No sit downs detail</span>
      }
      <div className="form-group d-flex flex-row justify-content-center">
        <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
          <i className="fa fa-arrow-rotate-left me-1"></i> Return
        </button>
      </div>
    </div >
  );
};
