import React from "react";
import "../style.css"
import AuthContext from "../Auth/authContext";

export default function HomePage() {

    const Authctx = React.useContext(AuthContext);

    return (
        <div className="container">
            <h1>Home Page</h1>
            <p>{Authctx.username}</p>
            <p>{Authctx.isLoggedIn.toString()}</p>
        </div>
    )
}