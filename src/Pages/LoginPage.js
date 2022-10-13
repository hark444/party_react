import React from "react";
import { useHistory, Link } from "react-router-dom";
import { ErrorModal } from "../Modal/Error";

export default function LoginPage() {

    const [login, setLogin] = React.useState({
        email: "",
        password: ""
    })
    
    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: ""
    })

    const history = useHistory()


    function handleChange(event) {
        const {name, value} = event.target
        setLogin(prevLogin => {
            return {
                ...prevLogin,
                [name]: value
            }
        })
    }

    async function loginUser() {
        try {
        const response = await fetch('http://127.0.0.1:8002/api/v1/auth/token', {
            method:'POST',
            body: JSON.stringify(login),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            let errorString;
            if (response.status == 401) {
                errorString = "User is unauthorized"
            }
            else {
                errorString = "Response status: " + response.status.toString()
            }
            throw new Error(errorString)
        }

        const data = await response.json()
        // TODO: Convert this to success message
        sessionStorage.setItem('access_token', data.access_token)
        history.push('/home')
        }
        catch (error) {
            setShowModalError({
                    error: true,
                    message: error
                })
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        loginUser()
    }

    function toggleModalShow() {
        setShowModalError({
            error: false,
            message: ""
        })
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
            <div className="error-modal">
            <ErrorModal error={showModalError.error} onClose={toggleModalShow} message={showModalError.message}/>
            </div>
        </div>
    )
}