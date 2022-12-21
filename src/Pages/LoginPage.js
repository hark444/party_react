import React, { Fragment } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../Auth/authContext";
import { ToastContainer } from 'react-toastify';
import ToastNotify from "../Modal/ToastNotify"


export default function LoginPage() {

    const location = useLocation();
    console.log(location)

    const ctx = React.useContext(AuthContext);

    const history = useHistory();
    
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
        sessionStorage.removeItem('access_token')
        ctx.onLogin(login);
        history.push('/home');
    }

    return (
        <div>
            <div className="form_div">
                <div className="form_title">
                    <h2>Login</h2>
                </div>
                <form onSubmit={handleSubmit} className="form_form">
                    
                    <label htmlFor="email">Email </label>
                    <input id="email" name="email" value={login.email} onChange={handleChange} />
                    <br />
                    <label htmlFor="password">Password </label>
                    <input id="password" name="password" value={login.password} onChange={handleChange} />
                    <br />
                    
                    <button className="form_button">Login</button>
                </form>
                <p className="not_sign_up">Not signed up? Sign up <Link to={'/sign-up'}>here</Link>. </p>
            </div>
            {
                location.state.toast && location.state.toast.type &&
                <Fragment>
                    <h2>Toast should be called</h2>
                    <ToastNotify props={location.state.toast} />
                    <ToastContainer />
                </Fragment>
            }
        </div>
    )
}