import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FormGroup, Label, Col, Row, Card, CardBody } from "reactstrap";
import useLanguage from "@hooks/useLanguage";

import { Editor } from "@tinymce/tinymce-react";
import 'tinymce/tinymce';
import 'tinymce/icons/default';
import 'tinymce/themes/silver';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/table';

import Toggle from "@components/Toggle";
import { ResourceSelect } from "@components/ResourceSelect";
import { EnumSelect } from "@components/EnumSelect";
import { Input } from "@components/Input";
import { InputFile } from "@components/InputFile";
import { EventScheduleListField } from "./customFields/EventScheduleListField/EventScheduleListField";
import { TildaField } from "./customFields/TildaField/TildaField";
import { ExtraHTMLField } from "./customFields/ExtraHTMLField/ExtraHTMLField";

import {
  EMaterialType,
  EMaterialTypeTranslation,
  EMaterialStatus,
  EMaterialStatusTranslation,
  EMaterialPriority,
  EMaterialPriorityTranslation,
  EMaterialViewMode,
  EMaterialViewModeTranslation
} from "@redux/enums";

const Fields = (props) => {
  const { form } = props;
  const { setValue, values, handleChange } = form;
  const { t } = useTranslation('materials');
  const { URLLanguage } = useLanguage();

  const tagsFilterFunction = (tag) => (tag.locale === URLLanguage);

  useEffect(() => {
    setValue('locale', URLLanguage);
  }, [URLLanguage, values.locale === '']);

  return (
    <>
      <Row form>
        <Col lg="8">
          <Card>
            <CardBody className="p-3">
              <Row form>
                <Col lg="8">
                  <Input
                    name="title"
                    form={form}
                    placeholder={t("header")}
                    label={t("header")}
                  />
                </Col>
                <Col lg="4">
                  <EnumSelect
                    t={t}
                    form={form}
                    name="type"
                    label={t("type")}
                    placeholder={t("type")}
                    options={EMaterialType}
                    optionTranslation={EMaterialTypeTranslation}
                  />
                </Col>
              </Row>
              <Input
                name="slug"
                form={form}
                placeholder={t("slug")}
                label={t("slug")}
              />
              <Input
                name="intro"
                form={form}
                placeholder={t("intro")}
                label={t("intro")}
                type="textarea"
                rows="3"
              />
              <FormGroup>
                <Label>{t("content")}</Label>
                <Editor
                  value={values.content}
                  onEditorChange={(value) => {
                      setValue('content', value);
                  }}
                  init={{
                    height: 400,
                  }}
                />
              </FormGroup>
              <Row>
                <Col>
                  <ResourceSelect
                    form={form}
                    selector={state => state.users.data}
                    name="author"
                    resourceLabelKey="fullName"
                    label={t("author")}
                    placeholder={t("author")}
                  />
                </Col>
                <Col>
                  <EnumSelect
                    t={t}
                    form={form}
                    name="status"
                    label={t("status")}
                    placeholder={t("status")}
                    options={EMaterialStatus}
                    optionTranslation={EMaterialStatusTranslation}
                  />
                </Col>
                <Col>
                  <EnumSelect
                    t={t}
                    form={form}
                    name="priority"
                    label={t("priority")}
                    placeholder={t("priority")}
                    options={EMaterialPriority}
                    optionTranslation={EMaterialPriorityTranslation}
                  />
                </Col>
                <Col>
                  <EnumSelect
                    t={t}
                    form={form}
                    name="viewMode"
                    label={t("viewMode")}
                    placeholder={t("viewMode")}
                    options={EMaterialViewMode}
                    optionTranslation={EMaterialViewModeTranslation}
                  />
                </Col>
              </Row>
              <Input
                name="authorCustom"
                form={form}
                placeholder={t("authorCustom")}
                label={t("authorCustom")}
              />
              <Input
                name="publishedAt"
                form={form}
                placeholder={t("publishedAt")}
                label={t("publishedAt")}
                type="datetime-local"
              />
              <TildaField form={form}/>
              <ExtraHTMLField form={form}/>
              <EventScheduleListField form={form}/>
              <InputFile form={form}/>
              <InputFile form={form} isMulti />
            </CardBody>
          </Card>
        </Col>
        <Col lg="4" className="px-4">
          <Row form>
            <Col lg="6">
              <FormGroup>
                <Label>{t("material")}</Label>
                <Toggle
                  id="isOnHomepage"
                  name="isOnHomepage"
                  label={t("isOnHomepage")}
                  value={values.isOnHomepage}
                  onChange={handleChange}
                />
                <Toggle
                  id="isCommentable"
                  name="isCommentable"
                  label={t("isCommentable")}
                  value={values.isCommentable}
                  onChange={handleChange}
                />
                <Toggle
                  id="isExported"
                  name="isExported"
                  label={t("isExported")}
                  value={values.isExported}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Col lg="6">
              <FormGroup>
                <Label>{t("advertising")}</Label>
                <Toggle
                  id="isAdvertising"
                  name="isAdvertising"
                  label={t("isAdvertising")}
                  value={values.isAdvertising}
                  onChange={handleChange}
                />
                <Toggle
                  id="inlineAdsEnabled"
                  name="inlineAdsEnabled"
                  label={t("inlineAdsEnabled")}
                  value={values.inlineAdsEnabled}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <ResourceSelect
            form={form}
            selector={state => state.tags.data}
            filterFunction={tagsFilterFunction}
            resourceValueKey="name"
            name="tags"
            label={t("tags")}
            placeholder={t("tags")}
            isMulti
            isCreatable
          />
          <ResourceSelect
            form={form}
            selector={state => state.sections.data}
            name="sections"
            label={t("sections")}
            placeholder={t("sections")}
            isMulti
          />
          <ResourceSelect
            form={form}
            selector={state => state.books.data}
            name="books"
            resourceLabelKey="title"
            label={t("books")}
            placeholder={t("books")}
            isMulti
          />
          <ResourceSelect
            form={form}
            selector={state => state.movies.data}
            name="movies"
            resourceLabelKey="title"
            label={t("movies")}
            placeholder={t("movies")}
            isMulti
          />
          <ResourceSelect
            form={form}
            selector={state => state.celebrities.data}
            name="celebrities"
            label={t("celebrities")}
            placeholder={t("celebrities")}
            isMulti
          />
          <ResourceSelect
            form={form}
            selector={state => state.places.list.data}
            name="places"
            label={t("places")}
            placeholder={t("places")}
            isMulti
          />
          <ResourceSelect
            form={form}
            selector={state => state.performances.data}
            name="performances"
            resourceLabelKey="originalTitle"
            label={t("performances")}
            placeholder={t("performances")}
            isMulti
          />
        </Col>
      </Row>
    </>
  );
}

export default Fields;
