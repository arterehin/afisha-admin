import { useState, useEffect, useCallback } from "react";
import useIsMounted from "@hooks/useIsMounted";

const useFetch = (callback, defaultLoading = false, deps = []) => {
    const isMounted = useIsMounted();
    const [loading, setLoading] = useState(defaultLoading);
    const hookCallback = useCallback(callback, deps);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                await hookCallback();
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [hookCallback, isMounted]);

    return { loading }
}

export default useFetch;