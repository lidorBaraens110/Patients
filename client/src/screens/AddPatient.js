import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import FormPatient from '../component/FormPatient';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../component/Loader';
import api from '../api/index';
import DialogForm from '../component/DialogForm';
import Logo from '../common/Logo';

function init(initial) {
    const { patientScheme, dialogState, loadingButton, errorMessage, isLoading, pageCount, currentPage } = initial
    return {
        patientScheme, dialogState, errorMessage, loadingButton, isLoading, pageCount, currentPage
    };
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'INITIAL_SUCCESS':
            return { ...state, isLoading: false, patientScheme: payload.patientScheme, totalPage: payload.totalPage, currentPage: 0 }
        case 'INITIAL_FAILED':
            return { ...state, isLoading: false, errorMessage: payload, dialogState: true }
        case 'HANDLE_DIALOG_STATE':
            return { ...state, dialogState: !state.dialogState }
        case 'ADD_PATIENT_FAILED':
            return { ...state, dialogState: true, errorMessage: payload }
        case 'HANDLE_LOADING_BUTTON':
            return { ...state, loadingButton: !state.loadingButton }
        case 'HANDLE_PAGE':
            return { ...state, currentPage: state.currentPage + payload }
        case 'HANDLE_CHANGE':
            state.patientScheme[payload.index].currentValue = payload.value
            return { ...state, patientScheme: [...state.patientScheme] }
        default:
            return state
    }
}

const initialState = {
    patientScheme: '', dialogState: false, errorMessage: '', loadingButton: false,
    isLoading: true,
    pageCount: 0,
    currentPage: 0
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

    useEffect(() => {
        async function fetchData() {
            const scheme = await api.getScheme();
            const icons = await api.getIcons();
            if (scheme.message) {
                dispatch({ type: 'INITIAL_FAILED', payload: scheme.message })
            } else {
                const newScheme = scheme.map(el => {
                    if (icons.icons) {
                        return { ...el, currentValue: '', icon: icons.icons[el.key] }
                    }
                    return { ...el, currentValue: '', }
                })

                dispatch({ type: "INITIAL_SUCCESS", payload: { patientScheme: newScheme, totalPage: scheme.length } })
            }
        }
        fetchData()
    }, [])

    const onSubmit = async () => {

        dispatch({ type: 'HANDLE_LOADING_BUTTON' })
        const newPat = {};
        state.patientScheme.forEach(el => {
            newPat[el.key] = el.currentValue
        })
        const newPatient = await api.addPatient(newPat);
        if (newPatient.message) {
            dispatch({ type: 'ADD_PATIENT_FAILED', payload: newPatient.message })
        } else {
            history.push(`/newPatient/${newPatient.patientId}`)
        }
        dispatch({ type: 'HANDLE_LOADING_BUTTON' })

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
                state.patientScheme.map((patient, i) => {
                    if (i === state.currentPage) {
                        return <FormPatient
                            key={i}
                            icon={patient.icon}
                            currentValue={patient.currentValue}
                            handlePage={payload => dispatch({ type: 'HANDLE_PAGE', payload })}
                            currentPage={state.currentPage}
                            totalPage={state.totalPage}
                            obj={patient}
                            onChange={e => dispatch({ type: 'HANDLE_CHANGE', payload: { value: e.target.value, index: i } })}
                            onSubmit={onSubmit}
                            isLoading={state.loadingButton} />
                    }
                })
            }

            {/* <button onClick={(e) => onSubmit(e, { age: 4, surgery: 'dkang' })}>checkos</button> */}
        </div>
    );
}

export default AddPatient;