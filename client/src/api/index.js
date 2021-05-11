import axios from 'axios';

export default {
    getScheme: () => axios.get("http://localhost:5000/api/getScheme").then(res => {
        return res.data.schema
    }).catch(err => {
        console.log(err)
        return { message: 'Server Problem Please Try Again Later' }
    }),
    addPatient: (newPatient) => axios.post("http://localhost:5000/api/addPatient", newPatient).then(res => {
        if (res.data.patient) {
            let { _id } = res.data.patient
            return { patientId: _id }
        } else {
            return { message: res.data.message }
        }
    }).catch(err => {
        console.log(err)
        return { message: 'Server Problem Please Try Again Later' }
    }),
    getPatient: (id) => axios.get(`http://localhost:5000/api/getPatientById/${id}`).then(res => {
        if (res.data.message) {
            return { message: res.data.message }
        } else {
            return { patient: res.data.patient }
        }
    }).catch(err => {
        console.log(err);
        return { message: 'Server Problem Please Try Again Later ' }
    }),
    getIcons: () => axios.get(`http://localhost:5000/api/getIcons`).then(res => {
        if (res.data.icons) {
            return { icons: res.data.icons }
        } else {
            return { message: res.data.message }
        }
    }).catch(err => {
        console.log(err)
        return { message: 'Server Problem Please Try Again Later ' }
    })
}

