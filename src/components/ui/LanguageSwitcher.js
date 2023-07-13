import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import enUSFlag from '../../images/enUS-flag.png';
import esESFlag from '../../images/esES-flag.png';

const colourStyles = {
  control: (styles) => {
    return {
      ...styles,
      width: '6rem',
      position: 'fixed',
      bottom: '0px',
      right: '0px',
      margin: '1rem'
    }
  },
  option: (styles) => {
    return {
      ...styles,
      display: 'flex',
      justifyContent: 'center',
      padding: 1
    };
  },
};

export const LanguageSwitcher = () => {
  const { t, i18n } = useTranslation();
  const defaultLenguage = localStorage.getItem('i18nextLng');
  const languages = [
    { value: 'en-US', label: <img src={enUSFlag} alt="English" /> },
    { value: 'es-ES', label: <img src={esESFlag} alt="Español" /> }
  ];
  const [language, setLanguage] = useState(
    defaultLenguage
      ?
      languages.filter((v) => {
        return defaultLenguage === v.value;
      })
      :
      { value: 'en-US', label: <img src={enUSFlag} alt="English" /> }
  )
  const handleLanguage = (e) => {
    setLanguage(e);
    i18n.changeLanguage(e.value);
  };
  return (
    <div>
      <Select placeholder={t('select.placeholder')} menuPosition='fixed' menuPlacement='auto' styles={colourStyles} options={languages} value={language} onChange={handleLanguage} />
    </div>
  );
};
