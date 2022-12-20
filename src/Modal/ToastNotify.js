import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastNotify(props){
    if (props.props.type === 'warning') {
        toast.warning(props.props.message, {autoClose:3000})
    }
    
    else if (props.props.type === 'success') {
        toast.success(props.props.message, {position: toast.POSITION.BOTTOM_LEFT, autoClose:3000})
    }

    else if (props.props.type === 'error') {
        toast.error(props.props.message, {position: toast.POSITION.TOP_CENTER, autoClose:3000})
    }
    
    else if (props.props.type === 'info') {
        toast.info(props.props.message, {autoClose:false})
    }
    else {
        console.log("going to default state")
        toast.info("Default toast", {autoClose:false})
    }	
}
		
export default ToastNotify;
