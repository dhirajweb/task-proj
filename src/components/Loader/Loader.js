import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Loader = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Backdrop className={classes.backdrop} open={props.open}>
                <CircularProgress style={{color: '#fff'}}/>
            </Backdrop>
        </div>
    )
}

export default Loader
