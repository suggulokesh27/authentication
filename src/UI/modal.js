import React from "react";
import  ReactDOM  from "react-dom";
import "./modal.css"


const BackDrop = (props) => {
    return(
        <div className="backdrop"></div>
    )
};

const OverLay = props => {
    return(
        <div className="modal">
            {props.children}
        </div>
    )
};

const portalElement = document.getElementById("overlay");

const Modal = props => {
    return(
        <React.Fragment>
           {ReactDOM.createPortal(<BackDrop />,portalElement)}
            {ReactDOM.createPortal(<OverLay>
                {props.children}
            </OverLay>,portalElement)}
        </React.Fragment>
    )
};

export default Modal;