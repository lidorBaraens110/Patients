import { Button, CircularProgress } from '@material-ui/core';
import React from 'react';
import FormField from './FormField/index';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    form: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: "min-content",
        margin: "1em auto",
        padding: '3em',
    },
    next: {
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    back: {
        position: 'absolute',
        left: 0,
        bottom: 0
    }
})

function FormPatient({ obj, onSubmit, isLoading, totalPage, handlePage, icon, currentPage, onChange, currentValue }) {

    const classes = useStyle();

    const onSubmitted = (e) => {
        e.preventDefault()
        if (currentPage === totalPage - 1) {
            onSubmit()
        } else {
            handlePage(1)
        }
    }

    return (
        <div >
            <form onSubmit={onSubmitted} className={classes.form}>
                <i className={icon}></i>
                <FormField
                    currentValue={currentValue}
                    options={obj.options}
                    label={obj.key}
                    type={obj.type}
                    name={obj.key}
                    onChange={onChange}
                    required={obj.required}
                    min={obj.min}
                    max={obj.max}
                />
                {currentPage < totalPage - 1 ?
                    <Button type='submit' variant="contained" className={classes.next}>Next</Button>
                    : <Button type='submit' variant="contained" style={{ marginTop: '1rem' }} >
                        {isLoading ? <CircularProgress size="1rem" /> : 'Add'}
                    </Button>
                }
                {currentPage > 0 &&
                    <Button onClick={() => handlePage(-1)} variant="contained" className={classes.back}>
                        Back
                </Button>
                }
            </form>
        </div >

    );
}

export default FormPatient;