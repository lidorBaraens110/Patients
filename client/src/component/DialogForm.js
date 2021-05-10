import React from 'react';
import { Dialog, DialogTitle, Button } from '@material-ui/core';


export default function DialogForm({ error, open, tryAgain, onClose, backHome }) {
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle style={{ textAlign: 'center', margin: '2rem 2rem 0' }}>error</DialogTitle>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <span>{error}</span>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Button variant='contained' onClick={tryAgain}>Try Again</Button>
            <br />
            <br />
            <Button variant='outlined' onClick={backHome}>back To Home Page</Button>
        </div>
    </Dialog>
}