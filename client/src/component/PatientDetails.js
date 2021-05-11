import React from 'react';
import { Typography, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    item: {
        fontSize: '0.75rem',
        color: 'blue',
    },
    icon: {
        color: 'green',
        textAlign: 'center'
    }
})

function PatientDetails({ icon, element, details }) {

    const classes = useStyle();
    return (
        <ListItem >
            <ListItemIcon className={classes.icon}>
                <i className={icon}></i>
            </ListItemIcon>
            <ListItemText>
                <Typography className={classes.item}>{element}</Typography>
                <Typography>{details}</Typography>
            </ListItemText>
        </ListItem>
    );
}

export default PatientDetails;