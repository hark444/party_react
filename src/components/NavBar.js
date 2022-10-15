import React from "react";
import "./NavBar.css"

export default function NavBar() {
    return (
        <div className="nav_bar">
            <ul>
                <ol>Home</ol>
                <hr />
                <ol>Create Party</ol>
                <hr />
                <ol>Parties Given</ol>
                <hr />
                <ol>Parties Attended</ol>
                <hr />
                <ol>About</ol>
                <hr />
                <ol>Contact Us</ol>
            </ul>
            <div className="vl"></div>
        </div>
    )
}