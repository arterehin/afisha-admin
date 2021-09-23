import React from 'react';
import cx from 'classnames';
import { FormGroup, CustomInput, Input, Col, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import styles from './TildaField.module.scss';

export const TildaField = props => {
  const {
    setValue,
    values,
    handleChange
  } = props.form;
  const { t } = useTranslation('materials');
  const handleSubstituleChange = () => setValue('tildaSubstitute', !values.tildaSubstitute);

  return (
    <>
      <FormGroup>
        <Row>
          <Col lg={2}>
            <CustomInput
              id={Math.random().toString()}
              type="checkbox"
              className={cx(styles.TildaCheckbox, "z-0")}
              label={t('tildaSubstitute')}
              checked={values.tildaSubstitute}
              onChange={handleSubstituleChange}
            />
          </Col>
          {values.tildaSubstitute && (
            <Col>
              <Input
                name="tildaPageId"
                type="text"
                placeholder={t("tildaPageId")}
                value={values.tildaPageId ?? ''}
                onChange={handleChange}
              />
            </Col>
          )}
        </Row>
      </FormGroup>
    </>
  );
};