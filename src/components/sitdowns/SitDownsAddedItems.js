import { format } from 'date-fns';
import React from 'react';
import { isMobile } from 'react-device-detect';
import { fetchConToken } from '../../helpers/fetch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startSetSitDown } from '../../actions/sitdown';

export const SitDownsAddedItems = ({ sitDowns, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) {
    return <h2>Loading...</h2>
  }
  const handleEdit = async (id) => {
    const body = await fetchConToken(`sitdowns/getbyid/${id}`);
    dispatch(startSetSitDown(body.sitDown));
    navigate('/editsitdowndetail');
  };
  return (
    <div className='container-fluid mb-5'>

      {sitDowns && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped" : "table table-sm table-bordered table-striped table-hover"}>
        <thead className='primary-back text-light'>
          <tr>
            <th className="text-center" scope="col">Status</th>
            <th className="text-center" scope="col">Name</th>
            <th className="text-center" scope="col">Address</th>
            <th className="text-center" scope="col">Phone Number</th>
            <th className="text-center" scope="col">Closer</th>
            <th className="text-center" scope="col">Canvasser</th>
            <th className="text-center" scope="col">Edit</th>
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
                  <td className="text-center">{sitDown.closer ? sitDown.closer.firstName + ' ' + sitDown.closer.lastName : "-"}</td>
                  <td className="text-center">{sitDown.canvasser ? sitDown.canvasser.firstName + ' ' + sitDown.canvasser.lastName : "-"}</td>
                  <td className="text-center"><button className='btn btn-primary' onClick={() => handleEdit(sitDown.id)}><i className='fa fa-edit'></i></button></td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
