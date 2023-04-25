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

const updateHospital = async (req, res=response) => {

    const hospitalId = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok: true,
                msg: 'No existe el hospital'
            });
        }

        hospital.name = req.body.name;
        
        const newHospital = {
            ...req.body,
            createdBy: uid
        };

        const updatedHospital = await Hospital.findByIdAndUpdate(id, newHospital, {new: true});

        res.json({
            ok: true,
            msg: 'Hospital was updated successfully',
            hospital: updateHospital
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

};

const deleteHospital = async (req, res=response) => {

    const id = req.params.id;

    try{
        const hospital = await Hospital.findById(id);
        if(!hospital){
            return res.status(404).json({
                ok: true,
                msg: 'Hospital'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};


module.exports = {

    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital

};