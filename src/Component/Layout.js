import React, { Fragment } from "react";
import Home from "./Home";


const Layout = props => {


    return (
        <Fragment>
            <Home />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;