import SideBar from './sidebar';
import Content from './content';
import React, { useState } from "react";

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
            <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen}>
                { props.children }
            </Content>
        </div>
    );
};

