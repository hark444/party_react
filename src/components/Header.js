import { React, useState } from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"
import { ReactSession } from 'react-client-session';

export default function Header() {

    const [username, setUsername] = useState("User")

    if (ReactSession.get("username")) {
        setUsername(ReactSession.get("username"))
    }

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
                <NavLink className="clean_links" activeClassName="active_clean_links" to="/user">
                    Hi {username}
                </NavLink>
            </div>
        </div>
    )
}