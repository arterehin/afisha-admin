import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const roles = {
    "ROLE_ADMIN": {
        label: "roles.admin"
    }
}

const useRole = () => {
    const { t } = useTranslation();

    return useMemo(() => ({
        roles: Object.keys(roles).reduce((acc, curVal) => {
            const role = roles[curVal];
            return {
                ...acc,
                [curVal]: {
                    ...role,
                    label: t(role.label)
                }
             }
        }, {})
    }), [t]);
}

export default useRole;