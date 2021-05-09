import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function newPatient(props) {
    const { id } = useParams()
    const [patient, setPatient] = useState({})

    useEffect(() => {
        const newPatient = axios.get(`http://localhost:5000/api/getPatientById/${id}`).then(res => {
            console.log(res.data)
            return res.data

        }).catch(err => {
            console.log(err)
        })
        setPatient(newPatient)
    }, [])

    return (
        <div>
            hello world
        </div>
    );
}

export default newPatient;