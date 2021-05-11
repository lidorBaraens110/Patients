import React from 'react';
import MuTextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 220,
        maxWidth: 300,
        margin: '1rem'
    },
    asterisk: {
        color: 'red'
    },

}));
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
            InputLabelProps={{
                classes: {
                    asterisk: classes.asterisk
                }
            }}

        />
    );
};

export default TextField;