import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { startSetUser } from '../../actions/auth';
import { fetchConToken } from '../../helpers/fetch';
import toPascalCase from '../../helpers/pascalCase';

export const UsersItems = ({ users, loading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) {
    return <h2>{t('loading.text')}</h2>
  }
  const handleEdit = async (uid) => {
    const body = await fetchConToken(`auth/${uid}`);
    dispatch(startSetUser(body.user));
    localStorage.setItem('userId', uid);
    navigate('/edituser');
  };
  return (
    <div className='container-fluid table-responsive mb-2'>

      {users && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped rounded rounded-3 overflow-hidden" : "table table-bordered table-striped table-hover rounded rounded-3 overflow-hidden"}>
        <thead className='secondary-back text-light align-middle'>
          <tr>
            <th className="text-center" scope="col">{t('labels.status')}</th>
            <th className="text-center" scope="col">{t('labels.first_name')}</th>
            <th className="text-center" scope="col">{t('labels.last_name')}</th>
            <th className="text-center" scope="col">{t('labels.email')}</th>
            <th className="text-center" scope="col">{t('labels.office')}</th>
            <th className="text-center" scope="col">{t('labels.role')}</th>
            <th className="text-center" scope="col">{t('labels.edit')}</th>
          </tr>
        </thead>
        <>
          {users.length > 0 && users.map(user => {
            return (
              <tbody key={user.uid}>
                <tr>
                  <td className="text-center">{user.status ? t('labels.active') : t('labels.inactive')}</td>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.lastname}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.office}</td>
                  <td className="text-center">{toPascalCase(user.role)}</td>
                  <td className="text-center"><button className='btn btn-primary' onClick={() => handleEdit(user.uid)}><i className='fa fa-edit'></i></button></td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
