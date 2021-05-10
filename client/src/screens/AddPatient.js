import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormPatient from '../component/FormPatient';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../component/Loader';

const useStyle = makeStyles({
    container: {
        textAlign: 'center'
    }
})

function AddPatient() {

    const classes = useStyle();
    const history = useHistory();
    const [patientScheme, setPatientScheme] = useState();

    useEffect(() => {
        axios.get("http://localhost:5000/api/getScheme").then(res => {
            console.log(res.data.schema)
            setPatientScheme(res.data.schema)
            return res.data.schema
        }).catch(err => {
            console.log(err)
            return []
        })
    }, [])


    const onSubmit = (e, newPatient) => {
        e.preventDefault()
        console.log(newPatient)
        axios.post("http://localhost:5000/api/addPatient", newPatient).then(res => {
            console.log(res.data)
            if (res.data.patient) {
                let { _id } = res.data.patient
                history.push(`/newPatient/${_id}`)
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className={classes.container}>

            <h2>Add Patient</h2>
            {!patientScheme ? <Loader /> :
                <FormPatient schema={patientScheme} onSubmit={onSubmit} />
            }
        </div>
    );
}

export default AddPatient;