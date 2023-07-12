import { isMobile } from 'react-device-detect';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { fetchConToken } from '../../helpers/fetch';
import { startSetSitDown } from '../../actions/sitdown';

export const SitDownsAddedItems = ({ sitDowns, loading }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (loading) {
    return <h2>{t('loading.title')}</h2>
  }
  const handleEdit = async (id) => {
    const body = await fetchConToken(`sitdowns/getbyid/${id}`);
    dispatch(startSetSitDown(body.sitDown));
    localStorage.setItem('sitDownId', id);
    navigate('/editsitdowndetail');
  };
  return (
    <div className='container-fluid mb-5 table-responsive'>

      {sitDowns && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped rounded rounded-3 overflow-hidden" : "table table-sm table-bordered table-striped table-hover rounded rounded-3 overflow-hidden"}>
        <thead className='secondary-back text-light align-middle'>
          <tr>
            <th className="text-center" scope="col">{t('labels.status')}</th>
            <th className="text-center" scope="col">{t('labels.name')}</th>
            <th className="text-center" scope="col">{t('labels.address')}</th>
            <th className="text-center" scope="col">{t('labels.phone_number')}</th>
            <th className="text-center" scope="col">{t('labels.closer')}</th>
            <th className="text-center" scope="col">{t('labels.canvasser')}</th>
            <th className="text-center" scope="col">{t('labels.edit')}</th>
          </tr>
        </thead>
        <>
          {sitDowns.length > 0 && sitDowns.map(sitDown => {
            return (
              <tbody key={sitDown.id}>
                <tr>
                  <td className="text-center">{sitDown.status === 'processed' ? <span><i className="fas fa-spinner text-muted"></i> {t('labels.processed')}</span> : sitDown.status === 'incomplete' ? <span><i className="fas fa-exclamation-circle text-warning"></i> {t('labels.incomplete')}</span> : sitDown.status === 'fail_credit' ? <span><i className="fas fa-credit-card text-danger"></i> {t('labels.fail_credit')}</span> : <span><i className="fas fa-check text-success"></i> {t('labels.payed')}</span>}</td>
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
