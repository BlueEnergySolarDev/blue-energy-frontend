import { format } from 'date-fns';
import React from 'react';
import { isMobile } from 'react-device-detect';

export const SitDownsItems = ({ sitDowns, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div className='container-fluid'>

      {sitDowns && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped" : "table table-bordered table-striped table-hover"}>
        <thead className='primary-back text-light'>
          <tr>
            <th className="text-center" scope="col">Name</th>
            <th className="text-center" scope="col">Address</th>
            <th className="text-center" scope="col">Phone Number</th>
            <th className="text-center" scope="col">Email</th>
            <th className="text-center" scope="col">Proposal</th>
            <th className="text-center" scope="col">Reason</th>
            <th className="text-center" scope="col">Status</th>
            <th className="text-center" scope="col">Office</th>
            {/* <th className="text-center" scope="col">Closer</th> */}
            {/* <th className="text-center" scope="col">Canvasser</th> */}
            <th className="text-center" scope="col">Date</th>
          </tr>
        </thead>
        <>
          {sitDowns.length > 0 && sitDowns.map(sitDown => {
            return (
              <tbody key={sitDown.id}>
                <tr>
                  <td className="text-center">{sitDown.name}</td>
                  <td className="text-center">{sitDown.address}</td>
                  <td className="text-center">{sitDown.phone_number}</td>
                  <td className="text-center">{sitDown.email}</td>
                  <td className="text-center">{sitDown.proposal}</td>
                  <td className="text-center">{sitDown.reason}</td>
                  <td className="text-center">{sitDown.status}</td>
                  <td className="text-center">{sitDown.office}</td>
                  {/* <td className="text-center">{sitDown.closer.name} {sitDown.closer.lastname}</td> */}
                  {/* <td className="text-center">{sitDown.canvasser.name} {sitDown.canvasser.lastname}</td> */}
                  <td className="text-center">{sitDown.date ? format(new Date(sitDown.date), 'MM/dd/yyyy HH:mm') : "-"}</td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
