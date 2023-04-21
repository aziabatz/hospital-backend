const { response } = require('express');
const Doctor = require('../models/doctors.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getDoctors = async (req, res=response) => {
    
    try {
    
        const doctors = await Doctor.find();    

        res.json({
            ok: true,
            doctors
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
    
};

const createDoctor = async (req, res=response) => {
    
    const uid = req.uid;

    const {name, hospital} = req.body;
    const doctor = new Doctor({
        name,
        createdBy: uid,
        assignedTo: hospital
    });

    try {

        const foundDoctor = await doctor.save();


        res.json({
            ok: true,
            foundDoctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const updateDoctor = (req, res=response) => {

};

const deleteDoctor = (req, res=response) => {

};


module.exports = {

    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor

};