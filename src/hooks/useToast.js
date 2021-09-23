import {
    useEffect,
    useCallback,
    useRef,
    useState
} from "react";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const useToast = (successSelector, errorSelector, namespace) => {
    const { t } = useTranslation(namespace);

    const successMsg = useSelector(successSelector);
    const errorMsg = useSelector(errorSelector);

    const initialSuccessRef = useRef(successMsg);
    const [success, setSuccess] = useState([]);

    const initialErrorRef = useRef(errorMsg);
    const [error, setError] = useState([]);

    const showToast = useCallback((type, item = {}) => {
        let {
            title = `common:toasts.${type}.title`,
            message = `common:toasts.${type}.request.message`
        } = item;

        if (item.field) {
            toastr[type](
                t(title),
                `${t(`toasts.violations.${item.field}`)}: ${item.message}`
            );
        } else {
            toastr[type](
                t(title),
                t(message)
            );
        }
    }, []);

    const changeState = useCallback((state, initial, type) => {
        const initialState = initial.current;

        if (state.length > 0) {
            if (initialState.length === 0) {
                state.forEach((item) => showToast(
                    type,
                    item
                ));
            }
            initial.current = [];
        }
    }, [showToast]);

    useEffect(() => {
        changeState(
            error,
            initialErrorRef,
            "error"
        );
    }, [error, changeState]);

    useEffect(() => {
        changeState(
            success,
            initialSuccessRef,
            "success"
        );
    }, [success, changeState]);

    useEffect(() => {
        if (successMsg && successMsg.length > 0) {
            setSuccess(successMsg);
        }
    }, [successMsg]);

    useEffect(() => {
        if (errorMsg && errorMsg.length > 0) {
            setError(errorMsg);
        }
    }, [errorMsg]);
}

export default useToast;