import Button from '@mui/material/Button';


export default function ContainedButton(props) {

    return (
        <Button variant="contained" color="primary" onClick={props.submit} size="large"
            style={{ backgroundColor: '#2a9bc9', borderRadius: '25px'}}
            >
            {props.children}
        </Button>
    )
  }