import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { localizePath } from "@app/i18next/utils";

import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import routes from "../routes/index";
import avatar from "../assets/img/avatars/avatar.jpg";

import Logo from "./Logo";

const initOpenRoutes = (location) => {
  /* Open collapse element that matches current url */
  const pathName = location.pathname;

  let _routes = {};

  routes.forEach((route, index) => {
    const isActive = pathName.indexOf(route.path) === 0;
    const isOpen = route.open;
    const isHome = route.containsHome && pathName === "/" ? true : false;

    _routes = Object.assign({}, _routes, { [index]: isActive || isOpen || isHome })
  });

  return _routes;
};

const SidebarCategory = withRouter(
  ({
    name,
    badgeColor,
    badgeText,
    icon: Icon,
    isOpen,
    children,
    onClick,
    location,
    to
  }) => {
    const { t } = useTranslation();
    const getSidebarItemClass = path => {
      return location.pathname.indexOf(path) !== -1 ||
        (location.pathname === "/" && path === "/dashboard")
        ? "active"
        : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <span
          data-toggle="collapse"
          className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
          onClick={onClick}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <Icon size={18} className="align-middle mr-3" />
          <span className="align-middle">{t(name)}</span>
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </span>
        <Collapse isOpen={isOpen}>
          <ul id="item" className={"sidebar-dropdown list-unstyled"}>
            {children}
          </ul>
        </Collapse>
      </li>
    );
  }
);

const SidebarItem = withRouter(
  ({ name, badgeColor, badgeText, icon: Icon, location, to }) => {
    const { t, i18n } = useTranslation();
    const getSidebarItemClass = path => {
      return location.pathname.indexOf(path) !== -1 ? "active" : "";
    };

    return (
      <li className={"sidebar-item " + getSidebarItemClass(to)}>
        <NavLink to={localizePath(to, i18n.language)} className="sidebar-link" activeClassName="active">
          {Icon ? <Icon size={18} className="align-middle mr-3" /> : null}
          {t(name)}
          {badgeColor && badgeText ? (
            <Badge color={badgeColor} size={18} className="sidebar-badge">
              {badgeText}
            </Badge>
          ) : null}
        </NavLink>
      </li>
    );
  }
);

const Sidebar = ({ location, sidebar, user }) => {
  const [openRoutes, setOpenRoutes] = useState(() => initOpenRoutes(location));

  const toggle = index => {
    // Collapse all elements
    Object.keys(openRoutes).forEach(
      item => openRoutes[index] || setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [item]: false }))
    )

    // Toggle selected element
    setOpenRoutes(openRoutes => Object.assign({}, openRoutes, { [index]: !openRoutes[index] }));
  }

  return (
    <nav
      className={
        "sidebar" +
        (!sidebar.isOpen ? " toggled" : "") +
        (sidebar.isSticky ? " sidebar-sticky" : "")
      }
    >
      <div className="sidebar-content">
        <PerfectScrollbar>
          <a className="sidebar-brand" href="/adm">
            <Logo />
          </a>

          <ul className="sidebar-nav">
            {routes.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  {category.children ? (
                    <SidebarCategory
                      name={category.name}
                      badgeColor={category.badgeColor}
                      badgeText={category.badgeText}
                      icon={category.icon}
                      to={category.path}
                      isOpen={openRoutes[index]}
                      onClick={() => toggle(index)}
                    >
                      {category.children.map((route, index) => (
                        <SidebarItem
                          key={index}
                          name={route.name}
                          to={route.path}
                          badgeColor={route.badgeColor}
                          badgeText={route.badgeText}
                        />
                      ))}
                    </SidebarCategory>
                  ) : (
                      <SidebarItem
                        name={category.name}
                        to={category.path}
                        icon={category.icon}
                        badgeColor={category.badgeColor}
                        badgeText={category.badgeText}
                      />
                    )}
                </React.Fragment>
              );
            })}
          </ul>

          {!sidebar.isSticky ? (
            <div className="sidebar-bottom d-none d-lg-block">
              <div className="media">
                <img
                  className="rounded-circle mr-3"
                  src={avatar}
                  alt={user.fullName}
                  width="40"
                  height="40"
                />
                <div className="media-body">
                  <h5 className="mb-1">{user.fullName}</h5>
                  <div>
                    <FontAwesomeIcon
                      icon={faCircle}
                      className="text-success"
                    />{" "}
                    Online
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </PerfectScrollbar>
      </div>
    </nav>
  )
}

export default withRouter(
  connect(store => ({
    sidebar: store.sidebar,
    user: store.user
  }))(Sidebar)
);
