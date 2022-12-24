import React from "react";
import "./Pages.css"
import AuthContext from "../Auth/authContext";
import * as urlConstants from "../constants/urls";
import { RequestHandler } from "../Helpers/RequestHandler";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer } from 'react-toastify';
import ToastNotify from "../Modal/ToastNotify"


export default function CreateParty() {

    const authCtx = React.useContext(AuthContext)

    const [partyForm, setPartyForm] = React.useState({
        reason: "",
        proposed_date: new Date(),
        guests_invited: 0,
        party_date: new Date(),
        party_place: ""
    })

    const [toast, setToast] = React.useState({
        type: '',
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
        console.log(partyForm)
        const request_obj = {
            url: urlConstants.PARTY,
            method: 'POST',
            access_token: authCtx.access_token,
            body: partyForm
        }
        RequestHandler(request_obj).then((result) => {
            if (result.success){
            setToast({
                type: "success",
                message: "Party created successfully"
                })
            }
            else {
                setToast({
                    type: "error",
                    message: result.data.toString() || 'Error in Fetching'
                })
            }

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
                    {/* TODO: change onChange handler here. */}
                    <DatePicker className="date_picker" selected={partyForm.proposed_date}
                        onChange={(value) => {setPartyForm((prevForm)=>{return {...prevForm, proposed_date: value}})}} />
                    <br />
                    <label htmlFor="party_date">Party Date </label>
                    <DatePicker className="date_picker" selected={partyForm.party_date}
                        onChange={(value) => {setPartyForm((prevForm)=>{return {...prevForm, party_date: value}})}}/>
                    <br />
                    <label htmlFor="party_place">Party Place</label>
                    <input id="party_place" name="party_place" value={partyForm.party_place} onChange={handleChange} />
                    <br />

                    <br />
                    <br />
                    <button className="form_button">Create Party!</button>
                </form>
            </div>
            {
                toast.type && 
                <ToastNotify props={toast} />
            }
            <ToastContainer />
        </div>
    )
}