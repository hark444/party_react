import React from "react";
import "./SignupForm.css"

export default function SignupForm() {
    
    const [signupForm, setSignupForm] = React.useState({
        username: "",
        email: "",
        password: "",
        confirm_password: "",
        first_name: "",
        last_name: ""
    })

    const [showError, setShowError] = React.useState(false)

    function handleChange(event) {
        const {name, value} = event.target
        setSignupForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
        if (name == "confirm_password") {
            if (value != signupForm.password){
                setShowError(true)
            }
            else {
                setShowError(false)
            }
        }
    }

    function setNames(username) {
        const userName = signupForm.username.split(" ")
        const first_name = userName[0]
        const last_name = userName.slice(1, ).join(" ")
        setSignupForm(prevForm => {
            return {
                ...prevForm,
                first_name: first_name,
                last_name: last_name
            }
        })
    }

    async function createUser() {
        setNames(signupForm.username)
        try {
        const response = await fetch('http://127.0.0.1:8002/api/v1/users/create', {
            method:'POST',
            body: JSON.stringify(signupForm),
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
        console.log(data)
        }
        catch (error) {
            // Display this Error as well
            console.log(error)
        }
    }


    function handleSubmit(event) {
        event.preventDefault()
        if (!showError){
            createUser()
        }
        else {
            // TODO: Convert this to error message
            console.log("Not submitting")
        }
    }

    return (
        <div className="sign_up_div">
            <div className="sign_up_title">
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit} className="sign_up_form">
                <label htmlFor="username">Name </label>
                <input id="username" name="username" value={signupForm.username} onChange={handleChange} />
                <br />
                <label htmlFor="email">Email </label>
                <input id="email" name="email" value={signupForm.email} onChange={handleChange} />
                <br />
                <label htmlFor="password">Password </label>
                <input id="password" name="password" value={signupForm.password} onChange={handleChange} />
                <br />
                <label htmlFor="confirm_password">Confirm Password </label>
                <input id="confirm_password" name="confirm_password" value={signupForm.confirm_password} onChange={handleChange} />

                {showError && <p className="form_error" id="form_error">Passwords don't match!</p>}

                <br />
                <br />
                <button>Signup</button>
            </form>
        </div>
    )
}