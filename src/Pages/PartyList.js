import { NavLink } from "react-router-dom"
import { useEffect, useContext, useState, Fragment } from "react"
import * as urlConstants from "../constants/urls"
import { RequestHandler } from "../Helpers/RequestHandler"
import AuthContext from "../Auth/authContext"
import PartyPrint from "../components/PartyDetail"
import "./Pages.css"

export default function PartyList() {

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let partyElements;

    useEffect(() => {
        console.log("Getting all party records");
        const request_obj = {
            url: urlConstants.LIST_PARTY_ALL,
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
                // setShowModalError((prevError) => {
                //     return {
                //         ...prevError,
                //         error: true,
                //         message: result.data
                //     } 
                // })
            }
            
        })
    }, [])

    if (!isLoading) {
        partyElements = data.map(party => {
            const party_url = "/party-detail/" + party.id;
            return <NavLink className="clean_links" to={party_url}>
                <PartyPrint 
                key={party.id}
                props={party}
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
        </Fragment>
    )
}