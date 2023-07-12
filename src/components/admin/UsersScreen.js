import { useNavigate } from "react-router-dom";
import useSWR from "swr"
import { useTranslation } from "react-i18next";

import { PaginatedUsersItems } from "./PaginatedUsersItems";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const UsersScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isLoading } = useSWR('auth/users');
  const handleReturn = (e) => {
    navigate('/');
  };
  return (
    <>
      {
        isLoading
          ?
          <LoadingSpinner />
          :
          <div className="d-flex flex-column justify-content-center align-items-center text-center">
            <h1 className="text-dark mb-4 mt-2">{t('users.title')}</h1>
            {
              data?.users.length > 0 ?
                <PaginatedUsersItems itemsPerPage={10} items={data?.users} loading={isLoading} />
                :
                <span className="h3">{t('users.list.empty')}</span>
            }
            <div className="form-group d-flex flex-row justify-content-center">
              <button className="btn btn-light mt-2 mb-2 btn-bright d-flex flex-row justify-content-center align-items-center" onClick={handleReturn}>
                <i className="fa fa-arrow-rotate-left me-1"></i> {t('buttons.return')}
              </button>
            </div>
          </div >
      }
    </>
  );
};
