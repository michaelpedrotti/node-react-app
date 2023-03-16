import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faImage } from "@fortawesome/free-solid-svg-icons";
import { NavLink, NavItem, Nav, NavbarText } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="side-menu border shadow-sm">
      <div style={{'margin':'5px'}}>
        <h4>React</h4>
      </div>
      <Nav vertical>
        <NavbarText style={{'backgroundColor': '#CCCCCC'}}>
            <div style={{'marginLeft': '1rem'}}>Admin</div>
        </NavbarText>
        <NavItem>
          <NavLink tag={Link} to={"/user"}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> User
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/profile"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" /> Profile
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);


export default SideBar;
