import React, { useEffect, useReducer } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../component/Loader';
import { ListSubheader, List, IconButton } from '@material-ui/core';
import DialogForm from '../component/DialogForm';
import api from '../api';
import PatientDetails from '../component/PatientDetails';
import Logo from '../common/Logo';

function init(initial) {
    const { patient, dialogState, errorMessage, isLoading } = initial
    return {
        patient, dialogState, errorMessage, isLoading
    };
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'GET_PAT_FAILED':
            return { ...state, dialogState: true, errorMessage: payload }
        case 'GET_PAT_SUCCESS':
            return { ...state, patient: { ...state.patient, patient: payload } }
        case 'GET_ICONS_FAILED':
            return { ...state, dialogState: true, errorMessage: payload }
        case 'GET_ICONS_SUCCESS':
            return { ...state, patient: { ...state.patient, icons: payload } }
        case 'INITIAL_SUCCESS':
            return { ...state, isLoading: false }
        case 'CLOSE_DIALOG':
            return { ...state, dialogState: false }
        default:
            return state
    }
}

const initialState = {
    patient: {
        patient: '',
        icons: ''
    }, errorMessage: '', dialogState: false, isLoading: true
}

const useStyle = makeStyles({
    container: {
        textAlign: 'center',
        marginTop: '1rem',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: "min-content",
        margin: "1em auto",
        background: "#EFEFEF",
        border: "1px solid rgba(0,0,0,.1)",
        padding: '1em',
        fontSize: '2rem'
    },
    backIcon: {
        position: 'absolute',
        left: 5,
        top: 5
    },

})

function NewPatient() {

    const classes = useStyle()
    const history = useHistory();
    const { id } = useParams();
    const [state, dispatch] = useReducer(reducer, initialState, init)

    useEffect(() => {
        async function fetchData() {
            const newPat = await api.getPatient(id);
            const icons = await api.getIcons();
            if (newPat.message) {
                dispatch({ type: 'GET_PAT_FAILED', payload: newPat.message })
            } else {
                dispatch({ type: "GET_PAT_SUCCESS", payload: newPat.patient })
            }
            if (icons.message) {
                dispatch({ type: 'GET_ICONS_FAILED', payload: icons.message })
            } else {
                dispatch({ type: "GET_ICONS_SUCCESS", payload: icons.icons })
            }
            dispatch({ type: 'INITIAL_SUCCESS' })
        }
        fetchData()
    }, [id])

    const backHome = () => {
        history.push('/addPatient')
    }

    return (
        <div className={classes.container}>
            <Logo />
            <h2>New Patient</h2>
            <DialogForm backHome={backHome} open={state.dialogState}
                error={state.errorMessage}
                onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
            />
            {state.isLoading ? <Loader /> :
                <div>
                    <IconButton onClick={backHome}
                        className={classes.backIcon}>
                        <i className="fas fa-arrow-left"></i>
                    </IconButton>
                    <List
                        component="span"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                New Patient
                            </ListSubheader>
                        }
                        className={classes.list}
                    >
                        {Object.keys(state.patient.patient).map((el, i) => {
                            if (el !== '_id' && el !== 'createdAt' && el !== 'updatedAt' && el !== '__v') {
                                return <PatientDetails key={i}
                                    icon={state.patient.icons && state.patient.icons[el]}
                                    element={el}
                                    details={state.patient.patient[el]} />
                            }
                        })}
                    </List>
                </div>
            }
        </div >
    );
}

export default NewPatient;
