import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

import Loader from "@components/Loader";
import { CardTitle, Button, Col, Row } from "reactstrap";
import { YMaps, Map, ZoomControl, Placemark } from "react-yandex-maps";
import { Move, Save, MapPin, X } from "react-feather";

const getDefaultCenter = (center) => {
    return center || [41.311151, 69.279737];
}

const getDefaultMapState = (center) => {
    return {
        center: getDefaultCenter(center),
        zoom: 5,
        controls: [],
        behaviors: []
    }
}

const getInitialState = (center) => {
    return {
        isEditEnabled: false,
        center: getDefaultCenter(center),
        placemark: center || []
    };
}

const YandexMap = forwardRef(({ 
    processing = false, 
    center, 
    onChange,
    className = "" 
}, ref) => {
    const { t } = useTranslation();
    const mapRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [editState, setEditState] = useState(getInitialState(center));

    const enableEdit = () => {
        setEditState({
            ...editState,
            isEditEnabled: true
        });
    }

    const cancelEdit = () => {
        setEditState({
            ...editState,
            isEditEnabled: false
        });
    }

    const saveEdit = () => {
        const center = mapRef.current.getCenter();

        setEditState({
            ...editState,
            isEditEnabled: false,
            center,
            placemark: center
        });

        onChange(center);
    }

    const reset = () => {
        setEditState(getInitialState(center));
    }

    useImperativeHandle(ref, () => ({ reset }));

    const changeStateCallback = useCallback((state) => {
        const map = mapRef.current;
        const behaviors = ["drag", "dblClickZoom", "multiTouch"];

        if (state.isEditEnabled) {
            map.behaviors.enable(behaviors);
        } else {
            map.behaviors.disable(behaviors);
            map.setZoom(getDefaultMapState().zoom);
            map.setCenter(state.center);
        }
    }, []);

    useEffect(() => {
        if (mapRef && mapRef.current) {
            changeStateCallback(editState);
        }
    }, [changeStateCallback, editState, mapRef]);

    useEffect(() => {
        if (center) {
            setEditState((state) => ({
                ...state,
                center,
                placemark: center
            }));
        }
    }, [center]);

    return (
        <>
            <div className="tab-header">
                <Row>
                    <Col lg="6">
                        <CardTitle tag="h5">{t("map.title")}</CardTitle>
                        <h6 className="card-subtitle text-muted">
                            {t("map.subtitle")}
                        </h6>
                    </Col>
                    <Col lg="6">
                        <div className="float-right pull-right">
                            {editState.isEditEnabled ? (
                                <>
                                    <Button
                                        color="primary"
                                        className="float-right mt-2"
                                        onClick={saveEdit}
                                    >
                                        <Save className="align-middle mr-1" size={18} /> {t("form.save-btn")}
                                    </Button>
                                    <Button
                                        color="secondary"
                                        className="float-right mt-2 mr-1"
                                        onClick={cancelEdit}
                                    >
                                        <X className="align-middle mr-1" size={18} /> {t("form.cancel-btn")}
                                    </Button>
                                </>
                            ) : (
                                    <Button
                                        color="primary"
                                        className="float-right mt-2"
                                        onClick={enableEdit}
                                        disabled={loading || processing}
                                    >
                                        <Move className="align-middle mr-1" size={18} /> {t("form.select-btn")}
                                    </Button>
                                )}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={`yandex-maps d-flex ${className}`}>
                <Loader loading={loading} className="yandex-maps__loader"></Loader>
                <YMaps>
                    <Map
                        defaultState={getDefaultMapState(center)}
                        instanceRef={mapRef}
                        onLoad={() => setLoading(false)}
                        width="100%"
                        height="240px"
                    >
                        {editState.isEditEnabled ? (
                            <>
                                <ZoomControl />
                                <MapPin className="yandex-maps__pin" size={35} />
                            </>
                        ) : (editState.placemark.length > 0) && (
                            <Placemark geometry={editState.placemark} />
                        )}
                    </Map>
                </YMaps>
            </div>
        </>
    );
});

export default YandexMap;