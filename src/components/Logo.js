import React from "react";
import classNames from "classnames";
import logo from "../assets/img/logo.svg";

const Logo = ({ className, ...rest }) => (
  <div className={classNames("site-brand", className)}>
    <img
      src={logo}
      alt="Afisha"
      {...rest}
    />
  </div>
);

export default Logo;
