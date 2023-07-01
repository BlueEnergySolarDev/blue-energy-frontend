import { format } from 'date-fns';
import React from 'react';
import { isMobile } from 'react-device-detect';

export const SitDownsItems = ({ sitDowns, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <div className='container-fluid'>
      <h2>Simple Sit Down Register</h2>
      {sitDowns && <table className={isMobile ? "d-block overflow-scroll table table-bordered table-striped" : "table table-bordered table-striped table-hover"}>
        <thead className='primary-back text-light'>
          <tr>
            <th className="text-center" scope="col">User</th>
            <th className="text-center" scope="col">Office</th>
            <th className="text-center" scope="col">Amount</th>
            <th className="text-center" scope="col">Date</th>
          </tr>
        </thead>
        <>
          {sitDowns.length > 0 && sitDowns.map(sitDown => {
            return (
              <tbody key={sitDown.id}>
                <tr>
                  <td className="text-center">{sitDown.user.name} {sitDown.user.lastname}</td>
                  <td className="text-center">{sitDown.office}</td>
                  <td className="text-center">{sitDown.amount}</td>
                  <td className="text-center">{sitDown.date ? format(new Date(),'MM/dd/yyyy HH:mm') : "-"}</td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};