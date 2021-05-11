
const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const patientScheme = new Scheme({
    gender: {
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
        min: 3, max: 99,
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