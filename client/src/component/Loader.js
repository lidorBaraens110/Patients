import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        position: 'absolute',
        left: '50%',
        top: '55%',
    },
});

const Loader = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <CircularProgress />
        </div>
    );
};

export default Loader;