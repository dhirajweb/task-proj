import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const AlertMessage = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const Alert = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Snackbar open={props.showAlert} anchorOrigin={{vertical: 'top', horizontal: 'center'}} autoHideDuration={3000} onClose={() => props.setShowAlert(false)}>
                <AlertMessage onClose={() => props.setShowAlert(false)} severity={props.severity}>
                {props.alertMessage}
                </AlertMessage>
            </Snackbar>
        </div>
    )
}

export default Alert
