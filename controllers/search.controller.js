const { response } = require('express');
const User = require('../models/user.model')
const Doctor = require('../models/doctors.model')
const Hospital = require('../models/hospital.model')

const searchAll = async (req, res=response) => {


    const search = req.params.query;
    const regex = new RegExp(search, 'i');



    const [users, doctors, hospitals] = await Promise.all([
        User.find({name: regex}),
        Doctor.find({name: regex}),
        Hospital.find({name: regex})
    ]);


    res.json({
        ok: true,
        msg: search,
        users,
        doctors,
        hospitals
    })

};

const searchCollection = async (req, res=response) => {

    const collection = req.params.collection;
    const search = req.params.query;
    const regex = new RegExp(search, 'i');

    result = [];

    switch(collection){
        case 'doctors':
            result = await Doctor.find({name: regex});
            break;
        case 'users':
            result = await User.find({name: regex});    
            break;
        case 'hospitals':
            result = await Hospital.find({name: regex});
            break;
        default:
            return res.status(404).json({
                ok: false,
                msg: 'No se encuentra la tabla'
            })
    }

    res.json({
        ok: true,
        result
    })

};

module.exports = {
    searchAll,
    searchCollection
};