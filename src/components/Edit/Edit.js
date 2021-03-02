import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Alert from '../Alert/Alert'
import Loader from '../Loader/Loader'

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 210,
      maxHeight: 40
    },
    inputLabel: {
        fontWeight: 'bold',
        color: '#3D5AFE'
    },
    btnStyle: {
        padding: '2px 20px',
        borderRadius: '20px',
        textTransform: 'capitalize',
        margin: '10px'
    }
}));

const Edit = (props) => {
    const classes = useStyles();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [state, setState] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [error, setError] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [severity, setSeverity] = useState(null)
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)

    const validatePincode = (pincode) => {
        if(isNaN(pincode)) {
            setError('Pincode should be numeric')
            return false
        } else if(pincode.length !== 5) {
            setError('Pincode should contain exactly 5 characters')
            return false
        } else {
            return true
        }
    }

    const updateData = () => {
        setLoading(true)
        fetch(`https://o1wm686yz2.execute-api.us-east-1.amazonaws.com/v1/edit?param1=${email}&param2=${firstName}&param3=${lastName}&param4=${pincode}&param5=${city}&param6=${state}`)
        .then(response => response.json())
        .then(data => {
            if(data.Success) {
                setLoading(false)
                setMessage(data.Message)
                setSeverity('success')
                setShowAlert(true)
            }
        })
        .catch(error => {
            setLoading(false)
            setMessage("Something wen't wrong")
            setSeverity('error')
            setShowAlert(true)
        })
    }

    const updateListItem = () => {
        if(firstName === "" || lastName === "" || state === "" || city === "" || pincode === "") {
            setError('Please fill all the fields')
        } else if(!validatePincode(pincode)){
            return
        } else {
            updateData()
            setError('')
        }
    }

    const getData = () => {
        setLoading(true)
        fetch('https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch')
        .then(response => response.json())
        .then(data => {
            if(sessionStorage.getItem('userEmail') && data.data) {
                var userInfo = data.data.filter(userInfo => userInfo.email === sessionStorage.getItem('userEmail'))
                setFirstName(userInfo[0].first_name)
                setLastName(userInfo[0].last_name)
                setEmail(userInfo[0].email)
                setState(userInfo[0].states)
                setCity(userInfo[0].city)
                setPincode(userInfo[0].pincode)
                setLoading(false)
            }
        })
        .catch(error => {
            setLoading(false)
            setMessage("Something wen't wrong")
            setSeverity('error')
            setShowAlert(true)
        })
    }

    useEffect(() => {
        getData()
    }, [])
    return (
        <div style={{margin: '20px', textAlign: 'left'}}>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <Typography className={classes.inputLabel} variant="body1">First Name</Typography>
                    <TextField id="outlined-basic" variant="outlined" size='small' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <Typography className={classes.inputLabel} variant="body1">Last Name</Typography>
                    <TextField id="outlined-basic1" variant="outlined" size='small' value={lastName} onChange={e => setLastName(e.target.value)}/>
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <Typography className={classes.inputLabel} variant="body1">Email</Typography>
                    <TextField style={{backgroundColor: '#f2f2f2'}} id="outlined-disabled" variant="outlined" size='small' value={email} disabled/>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={2} md={3} sm={4} xs={8}>
                    <Typography className={classes.inputLabel} variant="body1">State</Typography>
                    <Select
                        onChange={e => setState(e.target.value)}
                        variant='outlined'
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        className={classes.formControl}
                        value={state}
                        >
                        <MenuItem value="" disabled>Select state</MenuItem>
                        <MenuItem value="Maharashtra">Maharashtra</MenuItem>
                        <MenuItem value={'Goa'}>Goa</MenuItem>
                        <MenuItem value={'Gujarat'}>Gujarat</MenuItem>
                        <MenuItem value={'Delhi'}>Delhi</MenuItem>
                    </Select>
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <Typography className={classes.inputLabel} variant="body1">City</Typography>
                    <TextField id="outlined-basic3" variant="outlined" size='small' value={city} onChange={e => setCity(e.target.value)}/>
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                    <Typography className={classes.inputLabel} variant="body1">Pincode</Typography>
                    <TextField id="outlined-basic4" variant="outlined" size='small' value={pincode} onChange={e => setPincode(e.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1" style={{color: 'red', fontSize: '12px'}}>{error}</Typography>
                </Grid>
                <Grid item xs={12} style={{textAlign: 'center', marginTop: '5%'}}>
                    <Button variant="contained" color="primary"
                    onClick={() => updateListItem()}
                    className={classes.btnStyle}>
                    Update
                    </Button>
                    <Button variant="contained"
                    onClick={() => props.history.push('/')}
                    className={classes.btnStyle}
                    >Cancel</Button>
                </Grid>
                {showAlert?
                    <Alert alertMessage={message} severity={severity} showAlert={showAlert} setShowAlert={setShowAlert}/>:null
                }
                {loading?
                    <Loader open={loading}/>:null
                }
            </Grid>
        </div>
    )
}

export default withRouter(Edit)
