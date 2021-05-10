const Patient = require('./models/Patient');
const PatientSchema = require('mongoose').model('Patient').schema;
const reduce = require('lodash/reduce');
const Icon = require('./models/Icons');


// getScheme, getPatientById, addPatient
const getScheme = async (req, res) => {
    const schema = reduce(PatientSchema.obj, (result, value, key) => {
        console.log(value)
        result.push({ key, type: value.type.name, options: value.enum, min: value.min, max: value.max, required: value.required });
        return result;
    }, []);
    console.log(schema)
    if (schema) return res.json({ schema })
    return res
        .status(500)
        .json({ message: "The Server is busy, please try again later" });
}


const getPatientById = async (req, res) => {

    Patient.findById(req.params.id).exec((err, patient) => {
        if (err) return res.json({ message: 'patient did not find ,or server busy' })
        return res.json({ patient: patient })
    })
}

const addPatient = async (req, res) => {

    const { sex, age, surgery, language } = req.body;
    const newPatient = new Patient({
        sex, age, surgery, language
    });

    newPatient.save((err, patient) => {
        if (err) return res.json({ message: "patient not added", err })
        return res.json({ patient: patient })
    })
}

const getIcons = async (req, res) => {

    Icon.find().exec((err, icons) => {
        if (err) return res.json({ message: "icons did'nt find ", err })
        return res.json({ icons: icons[0] })
    });
}


exports.addPatient = addPatient
exports.getPatientById = getPatientById
exports.getScheme = getScheme
exports.getIcons = getIcons