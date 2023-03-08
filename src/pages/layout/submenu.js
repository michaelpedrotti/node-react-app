import React, { useState } from "react";
import classNames from "classnames";
import { Collapse, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const SubMenu = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const toggle = () => setCollapsed(!collapsed);
  const { icon, title, items } = props;

  return (
    <div>
      <NavItem onClick={toggle} className={classNames({ "menu-open": !collapsed })} >
        <NavLink className="dropdown-toggle">
          <FontAwesomeIcon icon={icon} className="mr-2" />
          {title}
        </NavLink>
      </NavItem>
    </div>
  );
};

export default SubMenu;
