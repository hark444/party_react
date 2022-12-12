import { Fragment, useState } from "react";

export default function PartyPrint(props) {

    const [paData, setPaData] = useState({
        "rating": null,
        "comment": null
    })

    function handleSubmit(event){
        event.preventDefault()
        console.log("form submitted.")
        console.log(paData)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setPaData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    let paFormData;

   
    return (
        <Fragment>
            <div className="card party_detail_container">
                <form onSubmit={handleSubmit} className="form_form">
                <fieldset disabled="disabled" className="form_fieldset">
                    
                    <label htmlFor="party_name">Party Name</label>
                    <input id="party_name" value={props.props.reason} readOnly={true}/>
                    <br />
                    <label htmlFor="guests">Guests Invited</label>
                    <input id="guests" value={props.props.guests_invited} readOnly={true} />
                    <br />
                    <label htmlFor="party_place">Party Place</label>
                    <input id="party_place" value={props.props.party_place} readOnly={true} />
                    <br />
                    <label htmlFor="proposed_date">Proposed Date</label>
                    <input id="proposed_date" value={new Date(props.props.proposed_date).toLocaleDateString()} readOnly={true} />
                    <br />
                    <label htmlFor="party_date">Party Date</label>
                    <input id="party_date" value={new Date(props.props.party_date).toLocaleDateString()} readOnly={true} />
                    <br />
                    <label htmlFor="party_rating">Party Rating</label>
                    <input id="party_date" value={props.props.ratings || 'No Ratings Yet'} readOnly={true} />
                    <br />
                    <label htmlFor="approved">Approved</label>
                    <input id="approved" value={props.props.approved.toString()} readOnly={true} />
                    </fieldset>
                    <br />
                    {props.paData &&
                    <fieldset className="form_fieldset">
                    <label htmlFor="rating">Your Rating </label>
                    <input id="rating" name="rating" value={paData.rating} onChange={handleChange} />
                    <br />
                    <label htmlFor="comment">Comment </label>
                    <input id="comment" name="comment" value={paData.comment} onChange={handleChange} />
                    <br />
                    </fieldset>
                    }
                    {props.paData && <button className="form_button">Save</button>}
                </form>
            </div>
            <br />
            <br />
            <br />
        </Fragment>
    )
}