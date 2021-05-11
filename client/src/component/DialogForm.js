import React from 'react';
import { Dialog, DialogTitle, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    title: {
        textAlign: 'center', margin: '2rem 2rem 0'
    },
    div: {
        padding: '2rem', textAlign: 'center'
    }
})


export default function DialogForm({ error, open, onClose, backHome }) {

    const classes = useStyle();

    return <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.title}>error</DialogTitle>
        <div className={classes.div}>
            <span>{error}</span>
        </div>
        <div className={classes.div}>
            {backHome && <Button variant='outlined' onClick={backHome}>back To Home Page</Button>}
            <br />
            <br />
            <Button onClick={onClose}>close</Button>
        </div>
    </Dialog>
}