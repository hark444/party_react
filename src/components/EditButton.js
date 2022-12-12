import "./Header.css"

export default function EditButton(props) {

    return (
        <button type="button" className="form_button" onClick={props.onClick}>{props.buttonText}</button>
    )
}