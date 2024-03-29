import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Button, NavbarToggler, Collapse, Nav, NavItem, NavLink } from "reactstrap";
import { SessionContext } from "../../contexts/session";
import { Link } from "react-router-dom";

const Topbar = ({ toggleSidebar }) => {
  
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);
  const [session, setSession ] = useContext(SessionContext);

  return (
    <Navbar className="navbar-brand shadow-sm border p-3 mb-5 " expand="md">
      <Button onClick={toggleSidebar} style={{marginRight: "1rem"}}>
        <FontAwesomeIcon icon={faAlignLeft} />
      </Button>
      <NavLink tag={Link} to={"/"}>
        <Button>
            <FontAwesomeIcon icon={faHome} />     
        </Button>
      </NavLink>
      <NavbarToggler onClick={toggleTopbar} />
      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ms-auto" navbar>
        <NavItem>
            <NavLink href="#">{ session.name }</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={"/setting"}>Settings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={() => setSession(null) }>Logout</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Topbar;
