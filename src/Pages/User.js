import { React, useEffect, useState, Fragment } from "react";
import "./User.css"
import { ErrorModal } from "../Modal/Error";
import * as urlConstants from "../constants/urls";
import { useHistory, NavLink } from "react-router-dom"

export default function User() {

    const history = useHistory();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        disabled: false,
        role: "",
        team: "",
        date_of_joining: ""
    })

    const [showModalError, setShowModalError] = useState({
        error: false,
        message: "",
        header: "User Error"
    })

    useEffect(() => {
        console.log("Running use effect in user");
        if (sessionStorage.getItem("access_token")) {
            defineMe();
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
    }, [])

    function setUserState(data) {
        setUser({
            firstName: data.first_name,
            lastName: data.last_name,
            disabled: data.disabled,
            role: data.role,
            team: data.team,
            date_of_joining: data.date_of_joining
        })
    }

    async function defineMe() {
        try {
            const response = await fetch(urlConstants.DEFINE_ME, {
                method:'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("access_token")
                }
            });
            if (!response.ok) {
                let errorString;
                if (response.status === 401) {
                    errorString = "User is unauthorized"
                }
                else {
                    errorString = "Response status: " + response.status.toString()
                }
                throw new Error(errorString)
            }
    
            const data = await response.json()
            setUserState(data);
            }
            catch (error) {
                setShowModalError((prevError) => {
                    return {
                        ...prevError,
                        error: true,
                        message: error
                    } 
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
        history.push("/login")
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
                <p><b>Name: </b>{user.firstName} {user.lastName}</p>
                <p><b>Team: </b>{user.team}</p>
                <p><b>Role: </b>{user.role}</p>
                <p><b>Date of Joining: </b>{user.date_of_joining}</p>
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
        </Fragment>
    )
}