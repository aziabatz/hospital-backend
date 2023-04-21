const { response } = require('express');
const Hospital = require('../models/hospital.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getHospitals = async (req, res=response) => {
    try {
        
        const hospitals = await Hospital.find()
            .populate('createdBy','name email');

        res.json({
            ok: true,
            hospitals
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
};

const createHospital = async (req, res=response) => {
    
    
    const uid = req.uid;
    const hospital = new Hospital({
        createdBy: uid,
        ...req.body
    });

    try {

        const newHospital = await hospital.save();
    
        res.json({
            ok:true,
            hospital: newHospital
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

    
};

const updateHospital = (req, res=response) => {

};

const deleteHospital = (req, res=response) => {

};


module.exports = {

    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital

};