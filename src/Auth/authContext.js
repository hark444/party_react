import React from "react";
import { ErrorModal } from "../Modal/Error";
import * as urlConstants from "../constants/urls";
import { RequestHandler } from "../Helpers/RequestHandler";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (login) => {},
    username: '',
    onLogout: () => {},
    access_token: '',
    refreshToken: (token) => {},
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: "",
        header: "Authentication Error"
    })
    const [userName, setUserName] = React.useState('')
    const [accessToken, setAccessToken] = React.useState('')

    function loginHandler(login) {
        const request_obj = {
            url: urlConstants.AUTH_TOKEN_GENERATE,
            method: 'POST',
            body: login
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                sessionStorage.setItem('access_token', result.data.access_token)
                setIsLoggedIn(true);
                setUserName(result.data.username);
                setAccessToken(result.data.access_token)
            }
            else {
                setIsLoggedIn(false);
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

    function refreshToken(token) {
        if (typeof token !== 'undefined'){
        const request_obj = {
            url: urlConstants.DEFINE_ME,
            method: 'GET',
            access_token: token
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                setIsLoggedIn(true);
                setUserName(result.data.first_name);
                setAccessToken(token)
            }
            else {
                setIsLoggedIn(false);
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
        sessionStorage.removeItem('access_token')
    }
    }
    
    function logoutHandler() {
        setIsLoggedIn(false)
        sessionStorage.removeItem('access_token')
        setUserName('')
    }


    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        username: userName,
        onLogout: logoutHandler,
        access_token: accessToken,
        refreshToken: refreshToken,
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