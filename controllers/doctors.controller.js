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

const updateDoctor = async (req, res=response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const foundDoctor = await Doctor.findById(id);

        if(!foundDoctor) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el medico'
            });
        }

        const newDoctor = {
            ...req.body,
            createdBy: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id,
            newDoctor,
            {
                new: true
            });

        res.json({
            ok: true,
            doctor: updatedDoctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const deleteDoctor = async (req, res=response) => {

    const id = req.params.id;

    try {

        const foundDoctor = await Doctor.findById(id);

        if(!foundDoctor) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el medico'
            });
        }

        await Doctor.findByIdAndDelete(id);


        res.json({
            ok: true,
            msg: 'medico eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};


module.exports = {

    getDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor

};