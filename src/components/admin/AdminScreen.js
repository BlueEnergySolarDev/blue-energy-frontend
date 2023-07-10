import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import useSWR from "swr"
import { OfficeCard } from '../user/OfficeCard';
import { PaginatedSitDownsSimplesItems } from '../sitdownsimple/PaginatedSitDownsSimplesItems';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const AdminScreen = () => {
  const { data: offices } = useSWR("sitdowns/counter")
  const { data: sitDowns, error, isLoading } = useSWR("sitdowns/simple")
  return (
    <>
      {
        isLoading
          ?
          <LoadingSpinner />
          :
          <div>
            {
              isMobile
                ?
                <div className='container text-center' data-aos="fade-up" data-aos-duration="1000">
                  <div className='d-flex flex-column justify-content-evenly align-items-center'>
                    <div className='d-flex flex-column m-1'>
                      <Link to="/sitdowndetail" className='m-1'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                          <i className="fas fa-handshake"></i> Sit Down Detail
                        </button>
                      </Link>
                      <Link to="/users" className='m-1'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Manage users">
                          <i className="fas fa-user"></i> Users
                        </button>
                      </Link>
                    </div>
                    <h1 className='text-dark'>SIT DOWN</h1>
                    {offices?.offices.length > 0 &&
                      <div className="container px-4">
                        <div className='row mt-2'>
                          {offices?.offices.map((office) => {
                            return (
                              <OfficeCard key={office.name} office={office} />
                            )
                          })}
                        </div>
                      </div>
                    }
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <h2 className='text-dark'>Simple Sit Down Register</h2>
                      {sitDowns?.sitDownsSimples.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns?.sitDownsSimples} loading={isLoading} />
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
                    <div className='m-2'>
                      <Link to="/sitdowndetail" className='m-3'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Add sit down detail">
                          <i className="fas fa-handshake"></i> Sit Down Detail
                        </button>
                      </Link>
                      <Link to="/users" className='m-3'>
                        <button className="btn btn-primary btn-lg btn-secondary-back" title="Manage users">
                          <i className="fas fa-user"></i> Users
                        </button>
                      </Link>
                    </div>
                    <h1 className='text-dark'>SIT DOWN</h1>
                    {offices?.offices.length > 0 &&
                      <div className="container px-4">
                        <div className='row mt-3 gx-5'>
                          {offices?.offices.map((office) => {
                            return (
                              <OfficeCard key={office.name} office={office} />
                            )
                          })}
                        </div>
                      </div>
                    }
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 w-100' data-aos="fade-up" data-aos-duration="1000">
                      <h2 className='text-dark'>Simple Sit Down Register</h2>
                      {sitDowns?.sitDownsSimples.length > 0 ?
                        <PaginatedSitDownsSimplesItems itemsPerPage={10} items={sitDowns?.sitDownsSimples} loading={isLoading} />
                        :
                        <div className='p-5'>
                          <span className="h3 text-dark">No sit downs</span>
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
