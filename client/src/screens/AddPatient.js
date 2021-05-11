import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import FormPatient from '../component/FormPatient';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../component/Loader';
import api from '../api/index';
import DialogForm from '../component/DialogForm';
import Logo from '../common/Logo';

function init(initial) {
    const { patientScheme, dialogState, loadingButton, errorMessage, isLoading } = initial
    return {
        patientScheme, dialogState, errorMessage, loadingButton, isLoading
    };
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'INITIAL_SUCCESS':
            return { ...state, isLoading: false, patientScheme: payload }
        case 'INITIAL_FAILED':
            return { ...state, isLoading: false, errorMessage: payload, dialogState: true }
        case 'HANDLE_DIALOG_STATE':
            return { ...state, dialogState: !state.dialogState }
        case 'ADD_PATIENT_FAILED':
            return { ...state, dialogState: true, errorMessage: payload }
        case 'HANDLE_LOADING_BUTTON':
            return { ...state, loadingButton: !state.loadingButton }
    }
}

const initialState = {
    patientScheme: '', dialogState: false, errorMessage: '', loadingButton: false, isLoading: true
}

const useStyle = makeStyles({
    container: {
        textAlign: 'center',
        marginTop: '1rem'
    }
})

function AddPatient() {

    const [state, dispatch] = useReducer(reducer, initialState, init);
    const classes = useStyle();
    const history = useHistory();

    useEffect(async () => {
        const scheme = await api.getScheme();
        if (scheme.message) {
            dispatch({ type: 'INITIAL_FAILED', payload: scheme.message })
        } else {
            dispatch({ type: "INITIAL_SUCCESS", payload: scheme })
        }
    }, [])

    const onSubmit = async (e, newPatient) => {
        e.preventDefault()
        dispatch({ type: 'HANDLE_LOADING_BUTTON' })
        const newPat = await api.addPatient(newPatient);
        if (newPat.message) {
            dispatch({ type: 'ADD_PATIENT_FAILED', payload: newPat.message })
        } else {
            history.push(`/newPatient/${newPat.patientId}`)
        }
    }
    const DialogClose = () => {
        dispatch({ type: 'HANDLE_DIALOG_STATE' })
        dispatch({ type: 'HANDLE_LOADING_BUTTON' })
    }

    return (
        <div className={classes.container}>
            <Logo />
            <DialogForm open={state.dialogState} onClose={DialogClose} error={state.errorMessage} />
            <h2>Add Patient</h2>
            {state.isLoading ? <Loader /> : !state.patientScheme ?
                <span>{state.errorMessage}</span> :
                <FormPatient
                    schema={state.patientScheme}
                    onSubmit={onSubmit}
                    isLoading={state.loadingButton} />
            }

            <button onClick={(e) => onSubmit(e, { age: 4, surgery: 'dkang' })}>checkos</button>
        </div>
    );
}

export default AddPatient;