import { useEffect, useContext, useState, Fragment } from "react"
import { NavLink } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import "./Pages.css"
import AuthContext from "../Auth/authContext"
import ToastNotify from "../Modal/ToastNotify"
import * as urlConstants from "../constants/urls"
import PartyPrint from "../components/PartyDetail"
import { RequestHandler } from "../Helpers/RequestHandler"

export default function PartyAttended() {

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [toast, setToast] = useState({
        type: '',
        message: ''
    })

    let partyElements;

    
    useEffect(() => {
        const request_obj = {
            url: urlConstants.PARTY_ATTENDED + '?created_by=true',
            method: 'GET',
            access_token: authCtx.access_token
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                const partyData = result.data.data;
                setData(partyData);
                setIsLoading(false);
                setToast({
                    type: "success",
                    message: "All Parties Attended Fetched successfully"
                })
            }
            else {
                setToast({
                    type: "error",
                    message: result.data.toString() || 'Error in Fetching'
                })
            }
            
        })
    }, [authCtx])

    if (!isLoading) {
        partyElements = data.map(party => {
            const party_url = "/party-detail/" + party.id;
            return <NavLink key={party.id} className="clean_links" to={party_url}>
                <PartyPrint 
                key={party.id}
                props={party.party}
                showEdit={false}
                />
            </NavLink>
        })
    }

    return (
        <Fragment>
            <h1 className="party_list_heading">Parties  You've  Attended</h1>
            <div className="party_list_container">
                {!isLoading && partyElements}
            </div>
            {
                toast.type && 
                <ToastNotify props={toast} />
            }
            <ToastContainer />
        </Fragment>
    )
}