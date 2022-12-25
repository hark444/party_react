import { useParams } from "react-router-dom"
import { useEffect, useContext, useState, Fragment } from "react"

import "./Pages.css"
import AuthContext from "../Auth/authContext"
import * as urlConstants from "../constants/urls"
import PartyPrint from "../components/PartyDetail"
import { RequestHandler } from "../Helpers/RequestHandler"

export default function PartyDetail(props) {

    const params = useParams();

    const authCtx = useContext(AuthContext);

    const [data, setData] = useState(null);
    
    const [paData, setPaData] = useState(null);
    
    useEffect(() => {
        const party_attended_request_obj = {
            url: urlConstants.PARTY_ATTENDED+ `?party_id=${params.partyId}`,
            method: 'GET',
            access_token: authCtx.access_token
        }
        const request_obj = {
            url: urlConstants.PARTY + `/${params.partyId}`,
            method: 'GET',
            access_token: authCtx.access_token
        }
        Promise.all([
            RequestHandler(request_obj),
            RequestHandler(party_attended_request_obj)
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response;
            }));
        }).then(function (data) {
            
            // Extracting party object
            const result = data[0]
            if (result.success) {
                setData(result.data);
            }
            else {
                console.log("Error in getting party object: " + result);
            }
            
            // Extracting party attended object
            const pa_result = data[1]
            if (pa_result.success) {
                if (!pa_result.data.data[0]){
                    setPaData({
                        party_id: params.partyId
                    })
                        }
                else {
                setPaData(pa_result.data.data[0]);
                }
            }
            else {
                console.log("Error in getting party object: " + result);
            }
            
        }).catch(function (error) {
            console.log(error);
        }
        
        )
    }, [authCtx, params.partyId])

    function handleChange(event) {
        const {name, value} = event.target
        setPaData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleSubmit(event){
        event.preventDefault()
        const request_obj = {
            url: urlConstants.PARTY_ATTENDED,
            body: paData,
            method: 'PUT',
            access_token: authCtx.access_token
        }
        if (!paData.id) {
            request_obj.method = "POST";
        }

        else {
            request_obj.url = request_obj.url + `/${paData.id}`;
        }
        
        RequestHandler(request_obj).then((result) => {
            if (result.success) {
                // To Do: Render success message on the next page.
                console.log("Party Attended data saved successfully.");
                setPaData(result.data)
            }
            else {
                console.log("result unsuccessfull")
                console.log(result)
            }
            
        })
        }
    
    return (
        <Fragment>
            <h1 className="party_list_heading">Party Detail Page</h1>
            {data && 
            <Fragment>
                <PartyPrint key={0} props={data} showEdit={true}
                        paData={paData} handleChange={handleChange}
                        handleSubmit={handleSubmit}
                />
            </Fragment>
            }
        </Fragment>
    )
}