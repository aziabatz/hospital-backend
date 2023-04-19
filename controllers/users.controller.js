const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


const getUsers = async (req,res) => {

    const users = await User.find();

    res.json({
        ok: true,
        users,
        uid: req.uid
    })
};

const createUser = async (req, res = response) => {
    
    const {email, password, name} = req.body;

    try{
        
        const emailExists = await User.findOne({email});
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await generateJWT(user);
        
        res.json({
            ok: true,
            users: [user],
            token
        })

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

};

const updateUser = async(req, res = response) => {
    
    const uid = req.params.id;
    try{

        const foundUser = await User.findById(uid);

        if(!foundUser){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con ese ID'
            });
        }

        //TODO validar TOKEN

        const {password, google, email, ...campos} = req.body;

        if(foundUser.email !== email){
            const emailExists = await User.findOne({email});
            if(emailExists){
                return res.status(400).json({
                    ok: false,
                    msg: 'Usuario ya existe con ese email'
                });
            }
        }

        //Añadir nuevo email otra vez a los campos
        campos.email = email;

        const updatedUser = await User.findByIdAndUpdate(uid, campos, {new: true});

        res.status(201).json({
            ok: true,
            user: updatedUser
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const deleteUser = async (req, res = response) => {
    try{

        const uid = req.params.id;

        const foundUser = await User.findById(uid);
        
        if(!foundUser){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el usuario con el id'
            });
        }

        await User.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};