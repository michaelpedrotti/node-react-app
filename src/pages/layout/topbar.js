import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";

const Topbar = ({ toggleSidebar }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  return (
    <Navbar className="navbar-brand shadow-sm border p-3 mb-5 " expand="md">
      <Button onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink href="#" onClick={() => alert('Settings') }>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => alert('Logout') }>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
