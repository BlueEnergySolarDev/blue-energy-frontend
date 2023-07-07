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
            <th className="text-center" scope="col">Status</th>
            <th className="text-center" scope="col">Name</th>
            <th className="text-center" scope="col">Address</th>
            <th className="text-center" scope="col">Phone Number</th>
            <th className="text-center" scope="col">Email</th>
            <th className="text-center" scope="col">Reason</th>
            <th className="text-center" scope="col">Office</th>
            <th className="text-center" scope="col">Closer</th>
            <th className="text-center" scope="col">Canvasser</th>
            <th className="text-center" scope="col">Date</th>
          </tr>
        </thead>
        <>
          {sitDowns.length > 0 && sitDowns.map(sitDown => {
            return (
              <tbody key={sitDown.id}>
                <tr>
                  <td className="text-center">{sitDown.status === 'processed' ? <span><i className="fas fa-spinner text-muted"></i> Processed</span> : sitDown.status === 'incomplete' ? <span><i className="fas fa-exclamation-circle text-warning"></i> Incomplete</span> : sitDown.status === 'fail_credit' ? <span><i className="fas fa-credit-card text-danger"></i> Fail credit</span> : <span><i className="fas fa-check text-success"></i> Payed</span>}</td>
                  <td className="text-center">{sitDown.name}</td>
                  <td className="text-center">{sitDown.address}</td>
                  <td className="text-center">{sitDown.phone_number}</td>
                  <td className="text-center">{sitDown.email ? sitDown.email : "-"}</td>
                  <td className="text-center">{sitDown.reason}</td>
                  <td className="text-center">{sitDown.office}</td>
                  <td className="text-center">{sitDown.closer ? sitDown.closer.firstName + ' ' + sitDown.closer.lastName : "-"}</td>
                  <td className="text-center">{sitDown.canvasser ? sitDown.canvasser.firstName + ' ' + sitDown.canvasser.lastName : "-"}</td>
                  <td className="text-center">{sitDown.date ? format(new Date(sitDown.date), 'MM/dd/yyyy HH:mm') : "-"}</td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
