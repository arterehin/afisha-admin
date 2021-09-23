import React from 'react';
import { FormGroup, CustomInput, Input, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";

export const ExtraHTMLField = props => {
  const {
    setValue,
    values,
    handleChange
  } = props.form;
  const { t } = useTranslation('materials');
  const handleCheckboxChange = () => setValue('isExtraHtml', !values.isExtraHtml);

  return (
    <>
      <FormGroup>
        <Row className="mb-2">
          <Col>
            <CustomInput
              id={Math.random().toString()}
              className="z-0 user-select-none"
              type="checkbox"
              label={t('extraHtml')}
              checked={values.isExtraHtml}
              onChange={handleCheckboxChange}
            />
          </Col>
        </Row>
        {values.isExtraHtml && (
          <Row className="mb-2">
            <Col>
              <FormGroup>
                <Input
                  type="textarea"
                  name="extraHtml"
                  placeholder={t('extraHtml')}
                  value={values['extraHtml'] ?? ''}
                  onChange={handleChange}
                  rows="5"
                />
              </FormGroup>
            </Col>
          </Row>
        )}
      </FormGroup>
    </>
  );
};