import { Fragment, useState } from "react";
import EditButton from "../components/EditButton"

export default function PartyPrint(props) {
    let party_rating;
    let party_comment;

    if (props.paData) {
        party_rating = props.paData.rating
        party_comment = props.paData.comment
    }

    const [enableEdit, setEnableEdit] = useState({
        disable: true,
        buttonText: "Edit"
    })

    function enableEditing() {
        if (enableEdit.disable) {
            setEnableEdit({
                disable: false,
                buttonText: "Cancel"
            });
        }
        else {
            setEnableEdit({
                disable: true,
                buttonText: "Edit"
            });
        }
        
    }

    function resetEdit() {
        setEnableEdit({
            disable: true,
            buttonText: "Edit"
        });
    }

    return (
        <Fragment>
            <div className="card party_detail_container">
                <form onSubmit={props.handleSubmit} className="form_form">
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
                    {(props.paData || props.showEdit) &&
                    <fieldset className="form_fieldset" disabled={enableEdit.disable}>
                    <label htmlFor="rating">Your Rating </label>
                    <input id="rating" name="rating" value={party_rating} onChange={props.handleChange} />
                    <br />
                    <label htmlFor="comment">Comment </label>
                    <input id="comment" name="comment" value={party_comment} onChange={props.handleChange} />
                    <br />
                    </fieldset>
                    }
                    {(props.paData || props.showEdit) && 
                    <Fragment>
                        <EditButton buttonText={enableEdit.buttonText} onClick={enableEditing}/>
                        <button className="form_button" onClick={resetEdit}>Save</button>
                    </Fragment>
                    }
                </form>
            </div>
            <br />
            <br />
            <br />
        </Fragment>
    )
}