import axios from "axios";
import authService from "@services/authService";
import i18next from "@app/i18next";
import { getURLLanguage } from "@utils/urlParams";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  auth: {
    username: "username",
    password: "password"
  }
});

instance.interceptors.request.use(
  ({ params, localize = true, useURLLanguage = true, ...config }) => {
    const { language } = i18next;
    const URLLanguage = getURLLanguage();
    const hasLanguage = language && language !== "dev";

    return {
      ...config,
      ...(useURLLanguage && localize && hasLanguage ? {
        params: {
          locale: URLLanguage ?? language,
          ...params
        }
      } : { params })
    };
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    const isCollection = data["@type"] === "hydra:Collection";

    return {
      ...response,
      ...(isCollection && { data: data["hydra:member"] })
    };
  },
  (error) => {
    if (error.response) {
      const {
        response: {
          data,
          status
        }
      } = error;

      if (status === 401) {
        authService.logOut();
      }

      switch (data["@type"]) {
        case "hydra:Error":
          error.messages = [{
            message: data["hydra:description"]
          }];
          break;
        case "ConstraintViolationList":
          const violations = data.violations.reduce((acc, curr) => {
            const isAttribute = /^attributes(\.|\[)/.test(curr.propertyPath);
            const field = isAttribute ? "attribute" : curr.propertyPath.replace(/.*\./, "");
            const hasField = acc.some((item) => item.field === field);

            if(!hasField) {
              return [
                ...acc,
                {
                  message: curr.message,
                  field
                }
              ];
            }

            return acc;
          }, []);

          error.messages = violations;
          break;
        default:
          error.messages = [{}];
          break;
      }
    }

    return Promise.reject(error);
  }
);

export default instance;