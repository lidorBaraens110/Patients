import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FormPatient from '../component/FormPatient';

function AddPatient(props) {
    const history = useHistory()
    const [patientScheme, setPatientScheme] = useState([])

    useEffect(async () => {
        const scheme = await axios.get("http://localhost:5000/api/getScheme").then(res => {
            console.log(res.data.schema)
            return res.data.schema
        }).catch(err => {
            console.log(err)
            return []
        })
        setPatientScheme(scheme)

    }, [])


    const onSubmit = (newPatient) => {
        axios.post("http://localhost:5000/api/addPatient", newPatient).then(res => {
            if (res.data.patient) {
                history.push('/patient/:id')
            }
        })
    }
    return <FormPatient schema={patientScheme} onSubmit={onSubmit} />;
}

export default AddPatient;