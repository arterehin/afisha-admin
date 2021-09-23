import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { 
    getLocales, 
    getLanguage 
} from "@app/i18next/utils";
import languages from "@app/i18next/languages";
import { getURLLanguage } from "@utils/urlParams";

const useLanguage = (lang) => {
    const { i18n } = useTranslation();
    const URLLanguage = getURLLanguage();

    return useMemo(() => ({
        fallback: "ru",
        locales: getLocales(),
        language: getLanguage(lang || i18n.language),
        URLLanguage,
        languages 
    }), [lang, i18n.language, URLLanguage]);
}

export default useLanguage;