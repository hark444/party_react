import { React, Fragment, useContext } from "react";
import {NavLink} from "react-router-dom"
import "./Header.css"
import AuthContext from "../Auth/authContext";

export default function Header() {

    const authCtx = useContext(AuthContext);

    return (
        <div className="header">
            <h1 className="header_title">Party Counter App</h1>
            <div className="nav_bar">
                <ul>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/home">Home</NavLink></ol>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/create-party">Create Party</NavLink></ol>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/view-parties">View Parties</NavLink></ol>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/your-parties">Your Parties</NavLink></ol>
                    <ol><NavLink className="clean_links" activeClassName="active_clean_links" to="/parties-attended">Parties Attended</NavLink></ol>
                    <ol>About</ol>
                    <ol>Contact Us</ol>
                </ul>
            </div>
            <div className="header_user">
                {authCtx.username !== 'User' && 
                <Fragment>
                <NavLink className="clean_links" activeClassName="active_clean_links" to="/user">
                    Hi, {authCtx.username}
                </NavLink>
                <NavLink className="clean_links" activeClassName="active_clean_links" to="/login" onClick={authCtx.onLogout}>
                    Logout
                </NavLink>
                </Fragment>}
                {authCtx.username === 'User' && <NavLink className="clean_links" activeClassName="active_clean_links" to="/login">
                    Login
                </NavLink>}
            </div>
        </div>
    )
}