import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchConToken } from '../../helpers/fetch';
import Swal from 'sweetalert2';
import { isMobile } from 'react-device-detect';
import { OfficeCard } from './OfficeCard';
import { PaginatedSitDownsSimplesItems } from '../sitdowns/PaginatedSitDownsSimplesItems';

export const AdminScreen = () => {
  const [loading, setLoading] = useState(false);
  const [sitDowns, setSitDowns] = useState([]);
  const [offices, setOffices] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getSitDownCounter = async () => {
      const resp = await fetchConToken(`sitdowns/counter`);
      const body = await resp.json();
      if (body.ok) {
        setOffices(body.offices)
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    }
    getSitDownCounter();
    const getSitDownsSimples = async () => {
      const resp = await fetchConToken(`sitdowns/simple`);
      const body = await resp.json();
      setSitDowns(body.sitDownsSimples);
      setLoading(false);
    }
    getSitDownsSimples();
  }, []);
  return (
    <>
      {
        isMobile
          ?
          <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
            <div className='d-flex flex-column justify-content-evenly align-items-center'>
              <Link to="/sitdown" className='mb-3 mt-3'>
                <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                  <i className="fas fa-handshake"></i> Sit Down Detail
                </button>
              </Link>
              <h1 style={{ color: "black" }}>SIT DOWN</h1>
              {offices.length > 0 &&
                <div className="container px-4">
                  <div className='row mt-5 gx-5'>
                    {offices.map((office) => {
                      return (
                        <OfficeCard key={office.name} office={office} />
                      )
                    })}
                  </div>
                </div>
              }
              <div className='d-flex flex-column justify-content-center align-items-center mt-5 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                <h2>Simple Sit Down Register</h2>
                {sitDowns.length > 0 ?
                  <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns} loading={loading} />
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
              <Link to="/sitdown" className='mb-3 mt-3'>
                <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                  <i className="fas fa-handshake"></i> Sit Down Detail
                </button>
              </Link>
              <h1 style={{ color: "black" }}>SIT DOWN</h1>
              {offices.length > 0 &&
                <div className="container px-4">
                  <div className='row mt-5 gx-5'>
                    {offices.map((office) => {
                      return (
                        <OfficeCard key={office.name} office={office} />
                      )
                    })}
                  </div>
                </div>
              }
              <div className='d-flex flex-column justify-content-center align-items-center mt-5 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                <h2>Simple Sit Down Register</h2>
                {sitDowns.length > 0 ?
                  <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns} loading={loading} />
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
