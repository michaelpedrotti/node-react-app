import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import Topbar from "./topbar";

const Content = ({ sidebarIsOpen, toggleSidebar, children }) => (
  <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
        {children}
  </Container>
);

export default Content;