import { useTranslation } from "react-i18next";

export const NotFoundScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <div className="alert alert-danger d-flex flex-column justify-content-center align-items-center mt-5">
        <h1 style={{color:"red"}}>Error</h1>
        <h3>{t('errors.page_not_found')}</h3>
      </div>
    </div>
  );
};
