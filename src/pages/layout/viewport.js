import {  Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import classNames from "classnames";
import React, { useState } from "react";
import Topbar from "./topbar";
import SideBar from './sidebar';

/**
 * 
 * @url https://codesandbox.io/s/reactstrap-sidebare-5ku6t
 * @url https://5ku6t.csb.app/
 */
export default function Viewport(props) {

    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <Container fluid className={classNames("content", { "is-open": sidebarIsOpen })}>
                <Topbar toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
                {props.breadcrumbs && <Breadcrumb listTag="div">
                        { props.breadcrumbs.map(([name, link]) => {
                            return(<BreadcrumbItem key={`BreadcrumbItem${name}`} href={link || '#'} tag="a">{ name }</BreadcrumbItem>)
                        })}
                    </Breadcrumb>
                }
                <div>
                    {props.children}
                </div>
            </Container>
        </div>
    );
};

