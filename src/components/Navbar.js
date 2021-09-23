import React, { useState } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { LanguageToggle } from "@components/LanguageToggle";
import { toggleSidebar } from "@redux/modules/sidebar/actions";
import { changeLocale } from "@redux/modules/user/actions";
import authService from "@services/authService";
import useLanguage from "@hooks/useLanguage";

import {
  Collapse,
  Navbar,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import {
  Settings,
} from "react-feather";

import avatar1 from "../assets/img/avatars/avatar.jpg";

const NavbarComponent = ({ dispatch, user }) => {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const { locales } = useLanguage();

  const changeLanguage = async (lng) => {
    if (i18n.language !== lng) {
      setLoading(true);

      try {
        await dispatch(changeLocale(lng));
        await i18n.changeLanguage(lng);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogoutClick = () => {
    authService.logOut();
  }

  return (
    <Navbar color="white" light expand>
      <span
        className="sidebar-toggle d-flex mr-2"
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      >
        <i className="hamburger align-self-center" />
      </span>

      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <LanguageToggle
            onChange={changeLanguage}
            loading={loading}
            initialLocale={locales[0]}
          />

          <UncontrolledDropdown nav inNavbar>
            <span className="d-inline-block d-sm-none">
              <DropdownToggle nav caret>
                <Settings size={18} className="align-middle" />
              </DropdownToggle>
            </span>
            <span className="d-none d-sm-inline-block">
              <DropdownToggle nav caret>
                <img
                  src={avatar1}
                  className="avatar img-fluid rounded-circle mr-1"
                  alt={user.fullName}
                />
                <span className="text-dark">{user.fullName}</span>
              </DropdownToggle>
            </span>
            <DropdownMenu right>
              <DropdownItem onClick={handleLogoutClick}>{t("exit")}</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default connect(store => ({
  user: store.user
}))(NavbarComponent);
