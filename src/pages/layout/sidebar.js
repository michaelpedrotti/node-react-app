import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faImage } from "@fortawesome/free-solid-svg-icons";
import { NavLink, NavItem, Nav, NavbarText } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { SessionContext } from "../../contexts/session";


const SideBar = ({ isOpen }) => {

  const [session] = useContext(SessionContext);

  const permission = session.profile.permissions || [];

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="side-menu border shadow-sm">
        <div style={{'margin':'5px'}}>
          <h4>React</h4>
        </div>
        <Nav vertical>
          <NavbarText style={{'backgroundColor': '#CCCCCC'}}>
              <div style={{'marginLeft': '1rem'}}>Admin</div>
          </NavbarText>
          { permission.some(row => row.resource == 'user') && <NavItem>
              <NavLink tag={Link} to={"/user"}>
                <FontAwesomeIcon icon={faUsers} className="mr-2" /> User
              </NavLink>
            </NavItem>
          }
          { permission.some(row => row.resource == 'profile') && <NavItem>
              <NavLink tag={Link} to={"/profile"}>
                <FontAwesomeIcon icon={faImage} className="mr-2" /> Profile
              </NavLink>
            </NavItem>
          }
        </Nav>
      </div>
    </div>
  )
};


export default SideBar;
