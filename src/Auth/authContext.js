import React from "react";
import * as urlConstants from "../constants/urls";
import { ErrorModal } from "../Modal/Error";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (login) => {},
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: "",
        header: "Authentication Error"
    })

    async function loginHandler(login) {
        try {
            const response = await fetch(urlConstants.AUTH_TOKEN_GENERATE, {
                method:'POST',
                body: JSON.stringify(login),
                headers: {
                    'Content-Type': 'application/json',
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
            sessionStorage.setItem('access_token', data.access_token)
            setIsLoggedIn(true);
            window.location.assign('/home');
        }
        catch (error) {
            setIsLoggedIn(false);
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
    }

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler
    }}>
        {props.children}
        <div className="error-modal">
            <ErrorModal error={showModalError.error}
                onClose={toggleModalShow}
                message={showModalError.message}
                header={showModalError.header}/>
        </div>
    </AuthContext.Provider>


}

export default AuthContext;