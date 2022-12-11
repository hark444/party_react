export default function PartyPrint(props) {
    // console.log(props)
    return (
        <div className="card party_detail_container">
            <div className="party_detail_fields">
                <h2>Party Name</h2>
                <h2>Guests Invited</h2>
                <h2>Party Place</h2>
                <h2>Proposed Date</h2>
                <h2>Party Date</h2>
                <h2>Ratings</h2>
                <h2>Approved</h2>
            </div>
            <div className="vertical_line"></div>
            <div className="party_detail_values">
                <h2>{props.props.reason || ''}</h2>
                <h2>{props.props.guests_invited || ''}</h2>
                <h2>{props.props.party_place || ''}</h2>
                <h2>{new Date(props.props.proposed_date).toLocaleDateString() || ''}</h2>
                <h2>{new Date(props.props.party_date).toLocaleDateString() || ''}</h2>
                <h2>{props.props.ratings || 'No Ratings Yet'}</h2>
                <h2>{props.props.approved.toString() || ''}</h2>
            </div>
        </div>
    )
}