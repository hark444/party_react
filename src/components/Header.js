import React from "react";
import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <h1 className="header_title">Party Counter App</h1>
            <div className="nav_bar">
                <ul>
                    <ol>Home</ol>
                    <ol>Create Party</ol>
                    <ol>Parties Given</ol>
                    <ol>Parties Attended</ol>
                    <ol>About</ol>
                    <ol>Contact Us</ol>
                </ul>
            </div>
            <div className="header_user">
                <p>Dummy User</p>
            </div>
        </div>
    )
}