const Patient = require('./models/Patient');
const PatientSchema = require('mongoose').model('Patient').schema;
const reduce = require('lodash/reduce');


// getScheme, getPatientById, addPatient
const getScheme = async (req, res) => {
    const schema = reduce(PatientSchema.obj, (result, value, key) => {
        result.push({ key, type: value.type.name, options: value.enum, required: value.required });
        return result;
    }, []);

    if (schema) return res.json({ schema })
    return res
        .status(500)
        .json({ message: "The Server is busy, please try again later" });
}


const getPatientById = async (req, res) => {

    const existPatient = await Patient.findById(req.body.id).exec((err, patient) => {
        if (err) return res.json({ message: 'patient did not find ,or server busy' })
        return res.json({ patient: patient })
    })
    console.log(existPatient)

    return res.json({ message: "hello" })
}

const addPatient = async (req, res) => {

    const { sex, age, surgery, language } = req.body.item;

    const newPatient = new Patient({
        sex, age, surgery, language
    });

    newPatient.save((err, patient) => {
        if (err) return res.json({ message: "patient not added", err })
        return res.json({ patient: patient })
    })

    return res.json({ message: "hello" })
}


exports.addPatient = addPatient
exports.getPatientById = getPatientById
exports.getScheme = getScheme