import React, {
    useState,
    useEffect,
    useMemo
} from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { useTranslation } from "react-i18next";
import { getDistricts } from "@redux/modules/settings/districts/actions";
import { enableTab as enableTabAction } from "@redux/modules/settings/ui/actions";

import { columns } from "./config";

import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import BootstrapTable from "react-bootstrap-table-next";
import Loader from "@components/Loader";
import Pagination from "@components/Pagination";
import DeleteDistrict from "./components/Delete";

const Districts = ({ '@id': city, enableTab }) => {
    const { t, i18n } = useTranslation("settings.cities-and-districts");
    const dispatch = useDispatch();
    const loading = useSelector(state => state.settings.districts.loading);
    const data = useSelector(state => state.settings.districts.data[city]);
    const locale = useSelector(state => state.settings.districts.locales[city]);
    const [modal, setModal] = useState({
        isOpen: false,
        city: '',
        district: {}
    });

    useEffect(() => {
        if (!data || locale !== i18n.language) {
            dispatch(getDistricts(city, i18n.language));
        }
    }, [dispatch, city, data, locale, i18n.language]);

    const isLoading = () => {
        return loading.state && loading.city === city;
    };

    const handleDeleteClick = (e, district) => {
        e.stopPropagation();
        setModal({
            isOpen: true,
            city,
            district
        });
    };

    const handleEditClick = (e, district) => {
        e.stopPropagation();
        enableTab("edit-district", city);
        dispatch(enableTabAction({
            type: "district",
            mode: "edit",
            current: district["@id"]
        }));
    };

    const handleAddClick = () => {
        enableTab("add-district");
        dispatch(enableTabAction({
            type: "district",
            mode: "add",
            current: city
        }));
    }

    const handleModalClose = () => {
        setModal({
            isOpen: false,
            city: '',
            district: {}
        });
    }

    const districts = useMemo(() => {
        const list = data || [];

        return list.map((row, index) => ({
            ...row,
            index
        }));
    }, [data]);

    return (
        <>
            <Loader className="py-3" loading={isLoading()}>
                {
                    (districts && districts.length > 0) && (
                        <Pagination
                            topPager={false}
                            options={{
                                sizePerPage: 5,
                                hidePageListOnlyOnePage: true
                            }}
                        >
                            <BootstrapTable
                                bootstrap4
                                bordered={false}
                                keyField="@id"
                                data={districts}
                                columns={columns({
                                    onDeleteClick: handleDeleteClick,
                                    onEditClick: handleEditClick
                                }, t)}
                            />
                        </Pagination>
                    )
                }
            </Loader>
            <DeleteDistrict {...modal} onClose={handleModalClose} />
            <Button color="primary" onClick={handleAddClick}>
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> {t("add-district")}
            </Button>
        </>
    );
};

export default Districts;