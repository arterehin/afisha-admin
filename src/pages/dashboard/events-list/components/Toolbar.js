import React, { useState } from "react";

import { Col, Row, Input, InputGroup, Button } from "reactstrap";
import { Search as SearchIcon } from "react-feather";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "@redux/modules/events/list/actions";

const Toolbar = (props) => {
  const { t } = useTranslation("dashboard");
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.sections.data);
  const staffMembers = useSelector((state) => state.users.data);
  const [filtersState, setFiltersState] = useState({
    createdBy: "",
    searchValue: "",
    section: "",
  });
  const itemsPerPage = 20;

  const handleCreatedByChange = (event) => {
    setFiltersState({ ...filtersState, createdBy: event.target.value });
  };

  const handleSectionChange = (event) => {
    setFiltersState({ ...filtersState, section: event.target.value });
  };

  const handleSearchValueChange = (event) => {
    setFiltersState({ ...filtersState, searchValue: event.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      getEvents({
        itemsPerPage: itemsPerPage,
        params: {
          createdBy: filtersState.createdBy,
          sections: [filtersState.section],
          title: filtersState.searchValue,
        },
        order: {
          publishedAt: "DESC",
          createdAt: "DESC",
        },
      }),
    );
  };

  return (
    <Row className="mb-3">
      <Col lg="4">
        <div className="mr-4">
          <InputGroup size="md">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <SearchIcon size={18} />
              </span>
            </div>
            <Input
              onChange={handleSearchValueChange}
              value={filtersState.searchValue}
            />
          </InputGroup>
        </div>
      </Col>
      <Col lg="2">
        <Input type="select" id="date" name="dateSelect">
          <option value="">{t("list.filter.date")}</option>
          <option value="createdBy">{t("events.filter.date.createdBy")}</option>
        </Input>
      </Col>
      <Col lg="2">
        <Input
          type="select"
          id="section"
          name="sectionSelect"
          onChange={handleSectionChange}
          value={filtersState.section}
        >
          <option value="">{t("list.filter.section")}</option>
          {sections.map((section) => (
            <option key={section["@id"]} value={section["@id"]}>
              {section.name}
            </option>
          ))}
        </Input>
      </Col>
      <Col lg="2">
        <Input
          type="select"
          id="createdBy"
          name="createdBySelect"
          onChange={handleCreatedByChange}
          value={filtersState.createdBy}
        >
          <option value="">{t("list.filter.createdBy")}</option>
          {staffMembers.map((user) => (
            <option key={user["@id"]} value={user["@id"]}>
              {user.fullName}
            </option>
          ))}
        </Input>
      </Col>
      <Col lg="2">
        <Button color="primary" onClick={handleSubmit}>
          {t("button.apply")}
        </Button>
      </Col>
    </Row>
  );
};

export default Toolbar;
