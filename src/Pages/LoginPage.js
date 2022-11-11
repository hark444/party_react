import React from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Auth/authContext";


export default function LoginPage(props) {

    const ctx = React.useContext(AuthContext);
    
    const [login, setLogin] = React.useState({
        email: "",
        password: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        ctx.onLogin(login);
    }

    return (
        <div>
            <div className="sign_up_div">
                <div className="sign_up_title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="sign_up_form">
                    
                    <label htmlFor="email">Email </label>
                    <input id="email" name="email" value={login.email} onChange={handleChange} />
                    <br />
                    <label htmlFor="password">Password </label>
                    <input id="password" name="password" value={login.password} onChange={handleChange} />
                    <br />
                    
                    <button>Login</button>
                </form>
                <p className="not_sign_up">Not signed up? Sign up <Link to={'/sign-up'}>here</Link>. </p>
            </div>
        </div>
    )
}