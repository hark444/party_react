import { useEffect, useContext, useState, Fragment } from "react"
import { NavLink } from "react-router-dom"
import * as urlConstants from "../constants/urls"
import { RequestHandler } from "../Helpers/RequestHandler"
import AuthContext from "../Auth/authContext"
import PartyPrint from "../components/PartyDetail"
import "./Pages.css"

export default function PartyAttended() {

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    let partyElements;

    
    useEffect(() => {
        const request_obj = {
            url: urlConstants.PARTY_ATTENDED + '?created_by=true',
            method: 'GET',
            access_token: authCtx.access_token
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                // To Do: Render success message on the next page.
                const partyData = result.data.data;
                setData(partyData);
                setIsLoading(false);
            }
            else {
                console.log("Getting in else.")
            }
            
        })
    }, [authCtx])

    if (!isLoading) {
        partyElements = data.map(party => {
            console.log(party);
            const party_url = "/party-detail/" + party.id;
            return <NavLink className="clean_links" to={party_url}>
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
        </Fragment>
    )
}