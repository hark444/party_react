import { React } from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"

export default function Header(props) {
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
                    Hi {props.username}
                </NavLink>
            </div>
        </div>
    )
}