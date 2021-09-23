import React from "react";

import {
    Col,
    Container,
    Row
} from "reactstrap";
import FormWrapper from "@components/Form";
import LanguageTabs from "@components/LanguageTabs";
import TabbedFields from "@pages/users/components/TabbedFields";
import CommonFields from "@pages/users/components/CommonFields";

const Form = ({ formRef, ...props }) => (
    <FormWrapper
        {...props}
        ref={formRef}
        render={(formProps) => (
            <Container fluid className="p-0">
                <Row>
                    <Col lg="6">
                        <LanguageTabs
                            {...formProps}
                            component={TabbedFields}
                        />
                    </Col>
                    <Col lg="6" className="px-4">
                        <CommonFields {...formProps} />
                    </Col>
                </Row>
            </Container>
        )}
    />
);

export default Form;