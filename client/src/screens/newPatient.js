import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../component/Loader';
import { Typography, ListSubheader, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@material-ui/core';
import DialogForm from '../component/DialogForm';

const useStyle = makeStyles({
    container: {
        textAlign: 'center'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: "-webkit-min-content",
        width: "-moz-min-content",
        width: "min-content",
        margin: "1em auto",
        background: "#EFEFEF",
        border: "1px solid rgba(0,0,0,.1)",
        padding: '1em',
        fontSize: '2rem'
    }
})

function NewPatient(props) {
    const classes = useStyle()
    const history = useHistory();
    const { id } = useParams()
    const [patient, setPatient] = useState({
        patient: '',
        icons: ''
    });
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [dialogState, setDialogState] = useState(false)

    useEffect(async () => {
        getPatient();
    }, [])

    const tryAgain = () => {
        window.location.reload(false);
    }
    const backHome = () => {
        history.push('/addPatient')
    }

    const getPatient = () => {
        axios.get(`http://localhost:5000/api/getPatientById/${id}`).then(res => {
            if (res.data.message) {
                setErrorMessage(res.data.message)
                setDialogState(true)
            } else {
                console.log(res.data.patient)
                setPatient(pre => {
                    return { ...pre, patient: res.data.patient }
                })
            }
        }).then(() => {
            getIcons()
        }).catch(err => console.log(err))
    }

    const getIcons = () => {
        axios.get(`http://localhost:5000/api/getIcons`).then(res => {
            console.log(res.data.icons)
            if (res.data.icons) {
                setPatient(pre => {
                    return { ...pre, icons: res.data.icons }
                })
            } else {
                setErrorMessage(res.data.message)
                setDialogState(true)
            }
        }).then(() => {
            setLoaded(true)
        }).catch(err => console.log(err))
    }

    return (
        <div className={classes.container}>
            {!loaded ? <Loader /> :
                errorMessage ?
                    <DialogForm backHome={backHome} open={dialogState} tryAgain={tryAgain} error={errorMessage} onClose={() => setDialogState} />
                    :
                    <div>
                        <IconButton onClick={backHome}
                            style={{ position: 'absolute', left: 5, top: 5 }}>
                            <i class="fas fa-arrow-left"></i>
                        </IconButton>
                        <h2>New Patient</h2>
                        <List
                            component="span"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    New Patient
                            </ListSubheader>
                            }
                            className={classes.list}
                        >
                            {Object.keys(patient.icons).map(prop => {

                                if (prop !== '_id' && prop !== 'createdAt' && prop !== 'updatedAt' && prop !== '__v') {
                                    return <ListItem >
                                        <ListItemIcon style={{ color: 'green' }}><i className={patient.icons[prop]}></i> </ListItemIcon>
                                        <ListItemText>
                                            <Typography style={{ fontSize: '0.75rem', color: 'blue' }}>{prop}</Typography>
                                            <Typography>{patient.patient[prop]}</Typography>
                                        </ListItemText>
                                    </ListItem>
                                }
                            })}
                        </List>
                    </div>
            }
        </div >
    );
}



export default NewPatient;
