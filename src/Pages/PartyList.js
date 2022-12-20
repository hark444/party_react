import { NavLink } from "react-router-dom"
import { useEffect, useContext, useState, Fragment } from "react"
import * as urlConstants from "../constants/urls"
import { RequestHandler } from "../Helpers/RequestHandler"
import AuthContext from "../Auth/authContext"
import PartyPrint from "../components/PartyDetail"
import "./Pages.css"
import { ToastContainer } from 'react-toastify';
import ToastNotify from "../Modal/ToastNotify"

export default function PartyList(props) {

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [toast, setToast] = useState({
        type: '',
        message: ''
    })

    let partyElements;

    useEffect(() => {
        const url = props.all ? urlConstants.LIST_PARTY_ALL : urlConstants.PARTY
        const request_obj = {
            url: url,
            method: 'GET',
            access_token: authCtx.access_token
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                // To Do: Render success message on the next page.
                const partyData = result.data.data;
                setData(partyData);
                setIsLoading(false);
                setToast({
                    type: "success",
                    message: "All Parties Fetched successfully"
                })
            }
            else {
                setToast({
                    type: "error",
                    message: result.data.toString() || 'Error in Fetching'
                })
            }
            
        })
    }, [props.all, authCtx])

    if (!isLoading) {
        partyElements = data.map(party => {
            const party_url = "/party-detail/" + party.id;
            return <NavLink className="clean_links" to={party_url}>
                <PartyPrint 
                key={party.id}
                props={party}
                showEdit={false}
                />
            </NavLink>
        })
    }


    return (
        <Fragment>
            <h1 className="party_list_heading">Party List</h1>
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