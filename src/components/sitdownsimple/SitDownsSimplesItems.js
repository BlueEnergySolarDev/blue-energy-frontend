import { format } from 'date-fns';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

export const SitDownsSimplesItems = ({ sitDowns, loading }) => {
  const { t } = useTranslation();
  if (loading) {
    return <h2>{t('loading.title')}</h2>
  }
  return (
    <div className='container-fluid table-responsive mb-2'>

      {sitDowns && <table className={isMobile ? "d-block overflow-scroll table table-sm table-bordered table-striped rounded rounded-3 overflow-hidden" : "table table-bordered table-striped table-hover rounded rounded-3 overflow-hidden"}>
        <thead className='secondary-back text-light align-middle'>
          <tr>
            <th className="text-center" scope="col">{t('labels.user')}</th>
            <th className="text-center" scope="col">{t('labels.office')}</th>
            <th className="text-center" scope="col">{t('labels.sit_downs')}</th>
            <th className="text-center" scope="col">{t('labels.fail_credits')}</th>
            <th className="text-center" scope="col">{t('labels.date')}</th>
          </tr>
        </thead>
        <>
          {sitDowns.length > 0 && sitDowns.map(sitDown => {
            return (
              <tbody key={sitDown.id}>
                <tr>
                  <td className="text-center">{sitDown.user?.name} {sitDown.user?.lastname}</td>
                  <td className="text-center">{sitDown.office}</td>
                  <td className="text-center">{sitDown.amount}</td>
                  <td className="text-center">{sitDown.fail_credit}</td>
                  <td className="text-center">{sitDown.date ? format(new Date(sitDown.date), 'MM/dd/yyyy HH:mm') : "-"}</td>
                </tr>
              </tbody>
            );
          })}
        </>
      </table>}
    </div>);
};
