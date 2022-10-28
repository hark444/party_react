import React from "react";
import {Link, NavLink} from "react-router-dom"
import "./Header.css"

export default function Header() {
    return (
        <div className="header">
            <h1 className="header_title">Party Counter App</h1>
            <div className="nav_bar">
                <ul>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/home">Home</NavLink></ol>
                    <ol>Create Party</ol>
                    <ol>Parties Given</ol>
                    <ol>Parties Attended</ol>
                    <ol>About</ol>
                    <ol>Contact Us</ol>
                </ul>
            </div>
            <div className="header_user">
                <NavLink className="clean_links" activeClassName="active_clean_links" to="/user">Dummy User</NavLink>
            </div>
        </div>
    )
}