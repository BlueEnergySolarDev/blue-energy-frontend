import { format } from "date-fns";
import { useTranslation } from "react-i18next";

export const OfficeCard = ({ office }) => {
  const { t } = useTranslation();
  return (
    <div className='col m-1 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
      <h2 className='mb-2'>{office.name}</h2>
      <hr />
      <h2 className='mb-2'>{t('labels.sit_downs')}</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.sit_down}</span>
      <h2 className='mb-2'>{t('labels.fail_credits')}</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.fail_credit}</span>
      <h2 className='mb-2'>{t('labels.last_update')}</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.last_update ? format(new Date(office.last_update), 'MM/dd/yyyy HH:mm') : "-"}</span>
    </div>
  );
};
