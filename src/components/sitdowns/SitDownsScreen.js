import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchConToken } from "../../helpers/fetch";
import { PaginatedSitDownsItems } from "./PaginatedSitDownsItems";

export const SitDownsScreen = () => {
  const navigate = useNavigate();
  const [sitDowns, setSitDowns] = useState([]);
  const [loading, setLoading] = useState(false);
  //FETCHING
  useEffect(() => {
    setLoading(true);
    const getSitDowns = async () => {
      const resp = await fetchConToken(`sitdowns`);
      const body = await resp.json();
      setSitDowns(body.sitDowns);
      setLoading(false);
    }
    getSitDowns();
  }, []);
  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="text-dark mb-4">Sit Down Detail</h1>
      {sitDowns.length > 0 ?
        <PaginatedSitDownsItems itemsPerPage={10} items={sitDowns} loading={loading} />
        :
        <span className="h3">No detail sit downs</span>
      }
      <div className="form-group d-flex flex-row justify-content-center">
        <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
          <i className="fa fa-arrow-rotate-left me-1"></i> Return
        </button>
      </div>
    </div>
  );
};
