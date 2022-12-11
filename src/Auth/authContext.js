import React from "react";
import * as urlConstants from "../constants/urls";
import { ErrorModal } from "../Modal/Error";
import { RequestHandler } from "../Helpers/RequestHandler";


const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: (login) => {},
    username: '',
    onLogout: () => {},
    access_token: '',
})

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [showModalError, setShowModalError] = React.useState({
        error: false,
        message: "",
        header: "Authentication Error"
    })
    const [userName, setUserName] = React.useState('User')
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
    
    function logoutHandler() {
        setIsLoggedIn(false)
        sessionStorage.removeItem('access_token')
        setUserName('User')
    }


    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        username: userName,
        onLogout: logoutHandler,
        access_token: accessToken
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