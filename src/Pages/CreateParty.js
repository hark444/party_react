import React from "react";
import "./Pages.css"
import AuthContext from "../Auth/authContext";
import * as urlConstants from "../constants/urls";
import { RequestHandler } from "../Helpers/RequestHandler";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function CreateParty() {

    const authCtx = React.useContext(AuthContext)

    const [partyForm, setPartyForm] = React.useState({
        reason: "",
        proposed_date: new Date(),
        guests_invited: 0,
        party_date: new Date(),
        party_place: ""
    })

    const [showError, setShowError] = React.useState({
        error: false,
        message: ''
    })

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setPartyForm((prevForm => {
            return {
                ...prevForm,
                [name]: type ==="checkbox" ? checked : value
            }
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()
        validateForm()
        const request_obj = {
            url: urlConstants.CREATE_PARTY,
            method: 'POST',
            access_token: authCtx.access_token,
            body: partyForm
        }
        RequestHandler(request_obj).then((result) => {
            // To Do: Handle success and push to Detail page
            console.log(result.success.toString())
            console.log(result.data)
        })
    }

    function validateForm() {
        // To Do: Add further validations over here.
    }

    return (
        <div className="container">
            <div className="form_div">
                <div className="form_title">
                    <h2>Create a Party</h2>
                </div>
                <form onSubmit={handleSubmit} className="form_form">
                    <label htmlFor="username">Name </label>
                    <input id="username" name="reason" value={partyForm.reason} onChange={handleChange} />
                    <br />
                    <label htmlFor="guests_invited">Guests Invited </label>
                    <input id="guests_invited" name="guests_invited" value={partyForm.guests_invited} onChange={handleChange} />
                    <br />
                    <label htmlFor="proposed_date">Proposed Date </label>
                    <DatePicker className="date_picker" selected={partyForm.proposed_date} onChange={handleChange} />
                    <br />
                    <label htmlFor="party_date">Party Date </label>
                    <DatePicker className="date_picker" selected={partyForm.party_date} onChange={handleChange} />
                    <br />
                    <label htmlFor="party_place">Party Place</label>
                    <input id="party_place" name="party_place" value={partyForm.party_place} onChange={handleChange} />
                    <br />

                    {showError.error && <p className="form_error" id="form_error">{showError.message}</p>}

                    <br />
                    <br />
                    <button className="form_button">Signup</button>
                </form>
            </div>
        </div>
    )
}