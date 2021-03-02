import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import Alert from '../Alert/Alert'
import './Home.css'
import Loader from '../Loader/Loader'

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    table_heading: {
        color: '#fff',
        fontSize: '1rem'
    },
    table_cell: {
        fontSize: '1rem'
    },
    btnStyle: {
        padding: '2px 20px',
        borderRadius: '20px'
    }
});

const Home = (props) => {
    const classes = useStyles();
    const [listItems, setListItems] = useState([])
    const [openDeleteConf, setOpenDeleteConf] = useState(false)
    const [deleteEmail, setDeleteEmail] = useState(null)
    const [deleteFirstName, setDeleteFirstName] = useState(null)
    const [deleteLastName, setDeleteLastName] = useState(null)
    const [showAlert, setShowAlert] = useState(false)
    const [message, setMessage] = useState(null)
    const [severity, setSeverity] = useState(null)
    const [isSearch, setIsSearch] = useState(false)
    const [loading, setLoading] = useState(false)

    const getListItems = () => {
        setLoading(true)
        fetch('https://j5ej5u32gg.execute-api.us-east-1.amazonaws.com/v1/fetch')
        .then(response => response.json())
        .then(data => {
            setListItems(data.data)
            setLoading(false)
        });
    }

    const search = (searchVal) => {
        if(searchVal === '') {
            setIsSearch(false)
        } else {
            setIsSearch(true)
            setLoading(true)
            const filteredData = listItems.filter(item => {
                return Object.keys(item).some(key =>
                  item[key].toLowerCase().includes(searchVal.toLowerCase())
                );
            });
            setListItems(filteredData)
            setLoading(false)
        }
    }

    const deleteListItem = (email) => {
        setLoading(true)
        fetch(`https://k6j938wg66.execute-api.us-east-1.amazonaws.com/v1/delete?param1=${email}`)
        .then(response => response.json())
        .then(data => {
            setOpenDeleteConf(false)
            setLoading(false)
            setMessage(data.Message)
            setSeverity('success')
            setShowAlert(true)
        })
        .catch(error => {
            setLoading(false)
            setMessage("Something wen't wrong")
            setSeverity('error')
            setShowAlert(true)
        })
    }

    const editListItem = (email) => {
        sessionStorage.setItem('userEmail', email)
        props.history.push('/edit')
    }

    const openDeleteConfModal = (email, fname, lname) => {
        setDeleteEmail(email)
        setDeleteFirstName(fname)
        setDeleteLastName(lname)
        setOpenDeleteConf(true)
    }

    useEffect(() => {
        if(!isSearch) {
            getListItems();
        }
        sessionStorage.removeItem('userEmail')
    }, [openDeleteConf, isSearch])
    return (
        <div style={{ margin: '20px', marginTop: '40px', textAlign: 'left'}}>
            <Typography variant="h6"
            onClick={() => props.history.push('/add')}
            style={{textAlign: 'left',
            display: 'inline-block',
            marginLeft: '10px',
            marginBottom: '10px',
            borderBottom: '5px solid',
            cursor: 'pointer',
            color: '#3D5AFE'}}
            >
            <AddIcon style={{ fontSize: '33px', verticalAlign: 'top'}}/> Add record
            </Typography>
            <TextField className='search-bar' size='small' id="outlined-basic" label="search" variant="outlined" onChange={e => search(e.target.value)}/>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow style={{backgroundColor: '#3D5AFE'}}>
                        <TableCell className={classes.table_heading}>#</TableCell>
                        <TableCell align="left" className={classes.table_heading}>First Name</TableCell>
                        <TableCell align="left" className={classes.table_heading}>Last Name</TableCell>
                        <TableCell align="left" className={classes.table_heading}>Email</TableCell>
                        <TableCell align="left" className={classes.table_heading}>State</TableCell>
                        <TableCell align="left" className={classes.table_heading}>City</TableCell>
                        <TableCell align="left" className={classes.table_heading}>Pincode</TableCell>
                        <TableCell align="center" className={classes.table_heading}>Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listItems.map((listItem, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {index+1}
                        </TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.first_name}</TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.last_name}</TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.email}</TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.states}</TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.city}</TableCell>
                        <TableCell className={classes.table_cell} align="left">{listItem.pincode}</TableCell>
                        <TableCell className={classes.table_cell} align="center">
                            <Button variant="contained" color="primary" size='small'
                            onClick={() => editListItem(listItem.email)}
                            className={`edit-btn ${classes.btnStyle}`}
                            >
                            Edit
                            </Button>
                            <Button variant="contained" color="secondary" size='small'
                            className={classes.btnStyle}
                            onClick={() => openDeleteConfModal(listItem.email, listItem.first_name, listItem.last_name)}
                            >
                            Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {openDeleteConf?
                <Delete
                open={openDeleteConf}
                close={setOpenDeleteConf}
                deleteListItem={deleteListItem}
                email={deleteEmail}
                firstName={deleteFirstName}
                lastName={deleteLastName}
                />:null
            }
            {showAlert?
                <Alert alertMessage={message} severity={severity} showAlert={showAlert} setShowAlert={setShowAlert}/>:null
            }
            {loading?
                <Loader open={loading}/>:null
            }
        </div>
    )
}

const Delete = (props) => {
    return <Dialog style={{textAlign:'center'}} fullWidth={true} onClose={() => props.close(false)} aria-labelledby="simple-dialog-title" open={props.open}>
    <Typography variant='h6' style={{fontWeight: '600', color: '#3D5AFE', padding: '40px 0'}} id="simple-dialog-title">Are you sure to Delete{' '+props.firstName+' '+props.lastName+'?'}</Typography> 
    <div>
        <Button variant="contained" color="secondary" size='small'
            onClick={() => props.deleteListItem(props.email)}
            style={{padding: '2px 20px', margin: '40px 0', marginRight: '10px', borderRadius: '20px', width: 'fit-content', textTransform: 'capitalize'}}>
            Delete
        </Button>
        <Button variant="contained" size='small'
            onClick={() => props.close(false)}
            style={{padding: '2px 20px', borderRadius: '20px', width: 'fit-content', textTransform: 'capitalize'}}>
            Cancel
        </Button>
    </div>
</Dialog>
}

export default withRouter(Home)
