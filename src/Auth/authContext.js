import React from "react";
import * as urlConstants from "../constants/urls";
import { ErrorModal } from "../Modal/Error";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (login) => {},
    username: '',
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: "",
        header: "Authentication Error"
    })
    const [userName, setUserName] = React.useState('User')

    function loginHandler(login) {
        token_generate(login).then((user) => {
            sessionStorage.setItem('access_token', user.access_token)
            setIsLoggedIn(true);
            setUserName(user.username);
        })
    }

    async function token_generate(login) {
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
            return data
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
        window.location.assign('/login')
    }

    // if (!isLoggedIn) {
    //     window.location.assign('/login');
    // }

    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        username: userName,
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