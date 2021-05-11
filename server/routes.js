const express = require("express");
const router = express.Router();
const controller = require("./controller");

const { getScheme, getPatientById, addPatient, getIcons } = controller;

router.get('/getScheme', getScheme);
router.get('/getPatientById/:id', getPatientById);
router.post('/addPatient', addPatient);
router.get('/getIcons', getIcons);

module.exports = router;


