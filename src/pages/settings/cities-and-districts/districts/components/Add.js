import React, {
  useState,
  useEffect
} from "react";
import { toastr } from "react-redux-toastr";
import {
  useDispatch,
  useSelector
} from "react-redux";
import { disableTab as disableTabAction } from "@redux/modules/settings/ui/actions";
import { postDistrict } from "@redux/modules/settings/districts/actions";
import { useTranslation } from "react-i18next";
import useForm from "@hooks/useForm";

import {
  Col,
  Container,
  Row
} from "reactstrap";
import Form from "@components/Form";
import LanguageTabs from "@components/LanguageTabs";
import TabHeader from "@components/TabHeader";
import Fields from "./Fields";

const initialState = {
  city: "",
  slug: ""
}

const Add = ({ disableTab }) => {
  const { t } = useTranslation(["settings.cities-and-districts", "common"]);
  const dispatch = useDispatch();
  const {
    state,
    setState,
    onChange,
    reset,
    setTranslation,
    getTranslation,
    isRequired,
    formRef
  } = useForm(initialState);
  const [processing, setProcessing] = useState(false);
  const city = useSelector(state => state.settings.ui.district.add.current);

  const handleFormDiscard = () => {
    disableTab("add-district");
    dispatch(disableTabAction({
      type: "district",
      mode: "add",
    }));
  }

  const handleFormSubmit = async () => {
    setProcessing(true);
    try {
      await dispatch(postDistrict(state));
      reset();
      toastr.success(
        t("common:toasts.success.title"),
        t("toasts.add-district.success"),
      );
    } catch {
      toastr.error(
        t("common:toasts.error.title"),
        t("common:toasts.error.request.message")
      );
    } finally {
      setProcessing(false);
    }
  }

  useEffect(() => {
    setState((state) => ({
      ...state,
      city
    }));
  }, [setState, city]);

  return (
    <Container fluid className="p-0">
      <Row>
        <Col lg="7">
          <Form
            state={state}
            processing={processing}
            onSubmit={handleFormSubmit}
            onDiscard={handleFormDiscard}
            onChange={onChange}
            setTranslation={setTranslation}
            getTranslation={getTranslation}
            isRequired={isRequired}
            ref={formRef}
            header={
              <TabHeader
                title={t("add-district")}
                subTitle={t("form.subtitle")}
              />
            }
            render={(formProps) => (
              <LanguageTabs
                {...formProps}
                component={Fields}
              />
            )}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Add;
