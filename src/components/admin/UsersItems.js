import { isMobile } from 'react-device-detect';
import { startSetUser } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchConToken } from '../../helpers/fetch';

export const UsersItems = ({ users, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) {
    return <h2>Loading...</h2>
  }
  const handleEdit = async (uid) => {
    const body = await fetchConToken(`auth/${uid}`);
    dispatch(startSetUser(body.user));
    localStorage.setItem('userId', uid);
    navigate('/edituser');
  };
  return (
    <div className='container-fluid table-responsive mb-2'>

      {users && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped" : "table table-bordered table-striped table-hover"}>
        <thead className='primary-back text-light align-middle'>
          <tr>
            <th className="text-center" scope="col">Status</th>
            <th className="text-center" scope="col">Firstname</th>
            <th className="text-center" scope="col">Lastname</th>
            <th className="text-center" scope="col">Email</th>
            <th className="text-center" scope="col">Office</th>
            <th className="text-center" scope="col">Role</th>
            <th className="text-center" scope="col">Edit</th>
          </tr>
        </thead>
        <>
          {users.length > 0 && users.map(user => {
            return (
              <tbody key={user.uid}>
                <tr>
                  <td className="text-center">{user.status ? 'Active' : 'Inactive'}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.lastname}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.office}</td>
                  <td className="text-center">{user.role.replace('_', ' ').toUpperCase()}</td>
                  <td className="text-center"><button className='btn btn-primary' onClick={() => handleEdit(user.uid)}><i className='fa fa-edit'></i></button></td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
