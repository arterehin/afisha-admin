import React, {
    forwardRef,
    useImperativeHandle,
    useState
} from "react";
import { useTranslation } from "react-i18next";

import { AvForm } from "availity-reactstrap-validation";
import {
    Button,
    Spinner
} from "reactstrap";
import { X } from "react-feather";
import Loader from "@components/Loader";

const Form = forwardRef(({
    state,
    processing = false,
    loading = false,
    onSubmit,
    onDiscard,
    onChange,
    header,
    render,
    ...props
}, formRef) => {
    const { t } = useTranslation();
    const [timeStamp, setTimeStamp] = useState(new Date().getTime());

    useImperativeHandle(formRef, () => ({
        reset: () => {
            setTimeStamp(new Date().getTime());
        }
    }));

    return (
        <div className="d-flex flex-column h-100">
            {header}
            <Loader className="flex-grow-1" loading={loading}>
                <AvForm
                    onValidSubmit={onSubmit}
                    disabled={processing}
                    key={timeStamp}
                >
                    {render({
                        state,
                        onChange,
                        processing,
                        ...props
                    })}
                    <Button
                        color="primary"
                        className="mr-1"
                        disabled={processing}
                    >
                        {processing && (
                            <Spinner
                                type="grow"
                                size="sm"
                                className="mr-2"
                            />
                        )}
                        {t("form.save-btn")}
                    </Button>
                    <Button
                        color="secondary"
                        disabled={processing}
                        onClick={onDiscard}
                    >
                        <X className="align-middle mr-1" size={18} />
                        {t("form.cancel-btn")}
                    </Button>
                </AvForm>
            </Loader>
        </div>
    );
});

export default Form;