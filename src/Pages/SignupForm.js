import React from "react";
import "./Pages.css"
import { ErrorModal } from "../Modal/Error";
import { Link, useHistory } from "react-router-dom"
import * as urlConstants from "../constants/urls";
import { RequestHandler } from "../Helpers/RequestHandler";
import { ToastContainer } from 'react-toastify';
import ToastNotify from "../Modal/ToastNotify"


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

    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: "",
        header: "Signup Error"
    })

    const [toast, setToast] = React.useState({
        type: '',
        message: ''
    })

    const history = useHistory();

    function handleChange(event) {
        const {name, value} = event.target
        setSignupForm(prevForm => {
            return {
                ...prevForm,
                [name]: value
            }
        })
        if (name === "confirm_password") {
            if (value !== signupForm.password){
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

    function handleSubmit(event) {
        event.preventDefault()
        if (!showError){
            setNames(signupForm.username)
            const request_obj = {
                url: urlConstants.USER,
                method: 'POST',
                body: signupForm
            }
            RequestHandler(request_obj).then((result) => {
                if (result.success) {
                    console.log("User signed up successfully.");
                    setToast({
                        type: "success",
                        message: "User signed up successfully"
                        })
                        history.push({
                            pathname: '/login',
                            state: {toast: toast}
                    });
                }
                else {
                    setShowModalError((prevError) => {
                        return {
                            ...prevError,
                            error: true,
                            message: result.data
                        } 
                    })
                }
                
            })
        }
        else {
            console.log("Not submitting")
            setToast({
                type: "error",
                message: 'Not submitting. Please try after sometime.'
            })
        }
    }

    function toggleModalShow() {
        setShowModalError((prevError) => {
            return {
                ...prevError,
                error: false,
                message: ""
            } 
        })
    }

    return (
        <div className="container">
            <div className="form_div">
                <div className="form_title">
                    <h2>Sign Up</h2>
                </div>
                <form onSubmit={handleSubmit} className="form_form">
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
                    <button className="form_button">Signup</button>
                </form>
                <p className="not_sign_up">Already signed up? Log in <Link to={'/login'}>here</Link>. </p>
            </div>
        <div className="error-modal">
            <ErrorModal error={showModalError.error}
                onClose={toggleModalShow}
                message={showModalError.message}
                header={showModalError.header}/>
        </div>
        {
                toast.type && 
                <ToastNotify props={toast} />
            }
            <ToastContainer />
        </div>
    )
}