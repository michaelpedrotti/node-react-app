import {  Container, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody } from "reactstrap";
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
                <Breadcrumb listTag="div">
                    <BreadcrumbItem href="#" tag="a">Home</BreadcrumbItem>
                    <BreadcrumbItem href="#" tag="a">Library</BreadcrumbItem>
                    <BreadcrumbItem href="#" tag="a">Data</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Bootstrap</BreadcrumbItem>
                </Breadcrumb>
                <Card  className="my-2">
                    <CardHeader>
                        Header
                    </CardHeader>
                    <CardBody>
                        {props.children}
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
};

