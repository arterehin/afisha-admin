import React, { 
    useState,
    useMemo 
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { getCities } from "@redux/modules/settings/cities/actions";
import { enableTab as enableTabAction } from "@redux/modules/settings/ui/actions";
import { useTranslation } from "react-i18next";
import useFetch from "@hooks/useFetch";

import {
    columns,
    expandRow
} from "./config";

import { CardTitle } from "reactstrap";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import DeleteCity from "./components/Delete";

const Cities = ({ enableTab }) => {
    const { t, i18n } = useTranslation("settings.cities-and-districts");
    const dispatch = useDispatch();
    const data = useSelector(state => state.settings.cities);
    const [modal, setModal] = useState({
        isOpen: false,
        city: {}
    });

    const { loading } = useFetch(async () => {
        await dispatch(getCities());
    }, false, [i18n.language]);

    const handleDeleteClick = (e, city) => {
        e.stopPropagation();
        setModal({
            isOpen: true,
            city
        });
    };

    const handleEditClick = (e, city) => {
        e.stopPropagation();
        enableTab("edit-city");
        dispatch(enableTabAction({
            type: "city",
            mode: "edit",
            current: city["@id"]
        }));
    };

    const handleModalClose = () => {
        setModal({
            isOpen: false,
            city: {}
        });
    }

    const cities = useMemo(() => {
        return data.map((row, index) => ({
            ...row,
            index
        }));
    }, [data]);

    return (
        <>
            <div className="tab-header">
                <CardTitle tag="h5">{t("title")}</CardTitle>
                <h6 className="card-subtitle text-muted">
                    {t("list.subtitle")}
                </h6>
            </div>
            <Loader className="py-5" loading={loading}>
                <Pagination options={{
                    sizePerPage: 20,
                    hidePageListOnlyOnePage: true
                }}>
                    <BootstrapTable
                        bootstrap4
                        bordered={false}
                        keyField="@id"
                        data={cities}
                        columns={columns({
                            onDeleteClick: handleDeleteClick,
                            onEditClick: handleEditClick
                        }, t)}
                        expandRow={expandRow({
                            enableTab
                        })}
                    />
                </Pagination>
            </Loader>
            <DeleteCity {...modal} onClose={handleModalClose} />
        </>
    );
};

export default Cities;