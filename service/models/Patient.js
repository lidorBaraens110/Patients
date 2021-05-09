
const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const patientScheme = new Scheme({
    sex: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    language: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    surgery: {
        type: String,
        required: true
    },
},
    {
        timestamps: true
    }
)

const Patient = mongoose.model('Patient', patientScheme);

module.exports = Patient;