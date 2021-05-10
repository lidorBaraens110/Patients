import React from 'react';
import MuTextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    formControl: {
        minWidth: 220,
        maxWidth: 300,
        margin: '1rem'
    },

});
const TextField = ({ name, required, label, type, onChange, value, min, max }) => {

    const classes = useStyles();

    return (
        <MuTextField
            className={classes.formControl}
            variant="outlined"
            type={type}
            value={value}
            name={name}
            required={required}
            label={label}
            onChange={onChange}
            InputProps={{ inputProps: type == 'number' && { min: min, max: max } }}

        />
    );
};

export default TextField;