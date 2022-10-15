import { React } from "react";
import "./User.css"

export default function User() {
    return (
        <div className="user card">
            <div className="profile">
                <img src={require(`../images/Harshad.jpg`)} alt="profile_picture" className="profile--picture"/>
            </div>
            <div>
                <hr />
            </div>
            <div className="profile--content">
                <p><b>Name: </b>Harshad Keshwani</p>
                <p><b>Team: </b>mPulse</p>
                <p><b>Role: </b>Senior Software Engineer</p>
                <p><b>Date of Joining: </b>10 July 2020</p>
            </div>
        </div>
    )
}