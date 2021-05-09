import React from 'react';
import { Button, TextField, withStyles } from '@material-ui/core'

const classes = withStyles({
    container: {
        textAlign: 'center'
    }
})
function FormPatient({ scheme, onSubmit }) {

    return (
        <div>
            <form>
                <TextField />

            </form>
        </div>
    );
}



export default FormPatient;