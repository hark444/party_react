import { useParams } from "react-router-dom"
import { useEffect, useContext, useState, Fragment } from "react"
import * as urlConstants from "../constants/urls"
import { RequestHandler } from "../Helpers/RequestHandler"
import AuthContext from "../Auth/authContext"
import PartyPrint from "../components/PartyDetail"
import "./Pages.css"

export default function PartyDetail(props) {

    const params = useParams();

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);
    
    useEffect(() => {
        const partyId = params.partyId;
        const request_obj = {
            url: urlConstants.PARTY_ATTENDED,
            method: 'GET',
            access_token: authCtx.access_token
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                // To Do: Render success message on the next page.
                const partyData = result.data;
                setData(partyData);
            }
            else {
                // setShowModalError((prevError) => {
                //     return {
                //         ...prevError,
                //         error: true,
                //         message: result.data
                //     } 
                // })
                console.log("Getting in else.")
            }
            
        })
    }, [authCtx, params.partyId])

    return (
        <Fragment>
            <h1 className="party_list_heading">Party Detail Page</h1>
            {data && <PartyPrint key={0} props={data} />}
        </Fragment>
    )
}