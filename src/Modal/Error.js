import React from "react";
import "./Error.css"

export function ErrorModal(props) {

    if (!props.error) {
        return null
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal Header</h4>
                </div>
                <div className="modal-body">
                    {props.message.toString()}
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={props.onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}