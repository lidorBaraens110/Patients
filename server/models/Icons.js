
const mongoose = require('mongoose');

const Scheme = mongoose.Schema;

const iconsScheme = new Scheme({
    gender: {
        type: String,
    },
    language: {
        type: String,
    },
    age: {
        type: String,
    },
    surgery: {
        type: String,
    },
},
    {
        timestamps: true
    }
);


const Icons = mongoose.model('Icons', iconsScheme);

module.exports = Icons;