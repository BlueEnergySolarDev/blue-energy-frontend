import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enUS, esES } from '../translations';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: false,
        fallbackLng: 'en-US',
        interpolation: {
            escapeValue: false,
        },
        resources: {
            'en-US': {
                translation: enUS
            },
            'es-ES': {
                translation: esES
            }
        }
    });

export default i18n;