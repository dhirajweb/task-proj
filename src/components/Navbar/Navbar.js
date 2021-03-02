import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      color: '#727375',
      fontWeight: 800
    },
}));

const Navbar = (props) => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="static" style={{backgroundColor: '#fff'}}>
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Task
                </Typography>
                <Button onClick={() => props.history.push('/')} style={{color:"#727375"}}>Home</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(Navbar)
