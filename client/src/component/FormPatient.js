import { Button, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import FormField from './FormField/index';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'center'
    }
})
function FormPatient({ schema, onSubmit, isLoading }) {

    const classes = useStyle();

    const [newPat, setNewPat] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewPat(pre => {
            return { ...pre, [name]: value }
        })
    }


    return (
        <div >
            <form onSubmit={(e) => onSubmit(e, newPat)} className={classes.form}>
                {schema.map((obj, i) => {
                    return <FormField key={i}
                        options={obj.options}
                        label={obj.key}
                        type={obj.type}
                        name={obj.key}
                        onChange={handleChange}
                        required={obj.required}
                        min={obj.min}
                        max={obj.max}
                    />
                })}
                <Button type='submit' variant="contained" style={{ marginTop: '1rem' }} >
                    {isLoading ? <CircularProgress size="1rem" /> : 'Add'}
                </Button>
            </form>
        </div >
    );
}

export default FormPatient;