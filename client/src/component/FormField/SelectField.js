import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 220,
        maxWidth: 300,
        margin: '1rem'
    },
    asterisk: {
        color: theme.palette.error.main,
    },
}));

const SelectField = ({ name, options, required, label, onChange, }) => {
    const classes = useStyles();
    const [val, setVal] = useState('');
    const handleChange = (e) => {
        onChange(e);
        setVal(e.target.value)
    }
    return (
        <FormControl className={classes.formControl} required={required} variant="outlined" >
            <InputLabel classes={{ asterisk: classes.asterisk }} htmlFor="age-native-simple">{label}</InputLabel>
            <Select onChange={handleChange} value={val}
                inputProps={{
                    name: name,
                    id: 'age-native-simple',
                }}
            >
                {
                    options.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))
                }
            </Select>

        </FormControl>
    );
};

export default SelectField;