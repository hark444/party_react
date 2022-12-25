import { React, useEffect, useState, Fragment, useContext } from "react";
import { useHistory, NavLink } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import DatePicker from "react-datepicker";

import "./Pages.css"
import { ErrorModal } from "../Modal/Error";
import AuthContext from "../Auth/authContext";
import ToastNotify from "../Modal/ToastNotify";
import * as urlConstants from "../constants/urls";
import ContainedButton from "../components/Button";
import { RequestHandler } from "../Helpers/RequestHandler";




export default function User() {

    const history = useHistory();

    const authCtx = useContext(AuthContext)

    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        disabled: false,
        role: "",
        team: "",
        date_of_joining: new Date()
    })

    const [showModalError, setShowModalError] = useState({
        error: false,
        message: "",
        header: "User Error"
    })

    const [enableEdit, setEnableEdit] = useState({
        disable: true,
        buttonText: "Edit"
    })

    const [toast, setToast] = useState({
        type: '',
        message: ''
    })

    function enableEditing() {
        resetToast()
        if (enableEdit.disable) {
            setEnableEdit({
                disable: false,
                buttonText: "Cancel"
            });
        }
        else {
            setEnableEdit({
                disable: true,
                buttonText: "Edit"
            });
        }
        
    }

    function resetEdit() {
        resetToast()
        setEnableEdit({
            disable: true,
            buttonText: "Edit"
        });
    }

    useEffect(() => {
        if (authCtx.access_token) {
            const request_obj = {
                url: urlConstants.DEFINE_ME,
                method: 'GET',
                access_token: authCtx.access_token
            }
            RequestHandler(request_obj).then((result) => {
                if (result.success) {
                    // To Do: Render success message on the next page.
                    setUser(result.data);
                    setToast({
                        type: "success",
                        message: "User profile Fetched successfully"
                    })
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
            setShowModalError((prevError) => {
                return {
                    ...prevError,
                    error: true,
                    message: "User not logged in. Redirecting to login page"
                } 
            })
        }
    }, [authCtx.access_token])

    function toggleModalShow() {
        setShowModalError((prevError) => {
            return {
                ...prevError,
                error: false,
                message: ""
            } 
        })
        history.push("/login")
    }

    function resetToast() {
        setToast({
            type: '',
            message: ''
        })
    }

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        resetToast()
        setUser((prevForm => {
            return {
                ...prevForm,
                [name]: type ==="checkbox" ? checked : value
            }
        }))
    }

    function handleSubmit(event){
        event.preventDefault()
        resetEdit()
        console.log(user)
        const request_obj = {
            url: urlConstants.USER,
            method: 'PUT',
            access_token: authCtx.access_token,
            body: user
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                const userData = result.data;
                setUser(userData);
                setToast({
                    type: "success",
                    message: "Profile saved successfully"
                })
            }
            else {
                setToast({
                    type: "error",
                    message: result.data.toString() || 'Error in Fetching'
                })
            }
            
        })
    }


    return (
        <Fragment>
        <div className="user card">
            <div className="profile">
                <img src={require(`../images/Harshad.jpg`)} alt="profile_picture" className="profile--picture"/>
            </div>
            <div>
                <hr />
            </div>
            <div className="profile--content">
                <form className="form_form">                    
                    <label htmlFor="first_name">First Name</label>
                    <input id="first_name" name="first_name" value={user.first_name} disabled={enableEdit.disable} onChange={handleChange}/>
                    <br />
                    <label htmlFor="last_name">Last Name</label>
                    <input id="last_name" name="last_name" value={user.last_name} disabled={enableEdit.disable} onChange={handleChange}/>
                    <br />
                    <label htmlFor="team">Team</label>
                    <input id="team" name="team" value={user.team || 'MPUlse'} disabled={enableEdit.disable} onChange={handleChange}/>
                    <br />
                    <label htmlFor="role">Role</label>
                    <input id="role" name="role" value={user.role} disabled={enableEdit.disable} onChange={handleChange}/>
                    <br />
                    <label htmlFor="date_of_joining">Date of Joining</label>
                    <DatePicker name="date_of_joining" className="date_picker" selected={Date.parse(user.date_of_joining)} disabled={enableEdit.disable}
                        onChange={(value) => {setUser((prevForm)=>{return {...prevForm, date_of_joining: value}})}}/>
                    <br />
                    <Fragment>
                        <ContainedButton submit={enableEditing} >{enableEdit.buttonText}</ContainedButton>
                        <ContainedButton submit={handleSubmit} >Save</ContainedButton>
                    </Fragment>
                    </form>
            </div>
        </div>
        <div className="signup-button user_update">
            <NavLink to="/user-update" className="clean_links_button">Update Profile</NavLink>
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
        </Fragment>
    )
}