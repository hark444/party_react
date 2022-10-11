import React from "react";
import { useHistory } from "react-router-dom";

export default function LoginPage() {

    const [login, setLogin] = React.useState({
        email: "",
        password: ""
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
                'Access-Control-Allow-Origin': '*'
            }
        });
        if (!response.ok) {
            throw new Error('Something went wrong')
        }

        const data = await response.json()
        // TODO: Convert this to success message
        sessionStorage.setItem('access_token', data.access_token)
        history.push('/home')
        }
        catch (error) {
            // Display this Error as well
            console.log(error)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        // console.log(login)
        loginUser()
    }

    return (
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
        </div>
    )
}