import languages from "./languages";

export const getLocales = () => {
    return Object.keys(languages) || [];
}

export const getLanguage = (lng) => {
    return languages[lng] || {};
}

export const localizePath = (path = "", locale = "") => {
    return locale ? `/${locale}${path}` : path;
}

export const localizeRoute = (route = "") => {
    return `/:locale(${getLocales().join("|")})?${route}`;
}