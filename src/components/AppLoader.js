import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import useLanguage from "@hooks/useLanguage";
import authService from "@services/authService";

import Loader from "@components/Loader";

const AppLoader = ({ children }) => {
    const { fallback } = useLanguage();
    const [loading, setLoading] = useState(true);
    const user = useSelector(state => state.user);
    const { i18n } = useTranslation();

    const checkLogin = useCallback(async () => {
        try {
            await authService.checkLogin();
        } catch {
            setLoading(false);
        }
    }, []);

   useEffect(() => {
        if (authService.getCachedUser()) {
            checkLogin();
        } else {
            setLoading(false);
        }
    }, [checkLogin]);

    useEffect(() => {
        const hasLanguage = i18n.language && i18n.language !== "dev";

        if(user.isMe && !hasLanguage) {
            setLoading(true);
            i18n.changeLanguage(user.locale || fallback, () => {
                setLoading(false);
            });
        } else if(user.isMe && hasLanguage) {
            setLoading(false);
        }
    }, [user, i18n, fallback]);

    return (
        <Loader loading={loading} className="vh-100">
            {children}
        </Loader>
    );
};

export default AppLoader;
