import i18next from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { getLocales } from "./utils";

i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: getLocales(),
        ns: 'common',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false
        },
        backend: {
            loadPath: "/adm/locales/{{lng}}/{{ns}}.json"
        },
        detection: {
            order: ["path", "localStorage"],
            lookupFromPathIndex: 1,
            caches: []
        },
        react: {
            useSuspense: false
        }
    });

export default i18next;