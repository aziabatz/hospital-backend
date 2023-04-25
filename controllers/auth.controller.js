const { response } = require("express");
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { googleVerify } = require("../helpers/google-verify");

const loginUser = async (req, res=response) => {

    const {email, password} = req.body;

    try{

        const foundUser = await User.findOne({email});
        if(!foundUser){
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valida',
                code: 001
            });
        }

        console.log(password, foundUser.password)
        const validPassword = bcrypt.compareSync(password, foundUser.password);

        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Email o contraseña no valida',
                code: 002
            });
        }

        const token = await generateJWT(foundUser.id);

        res.status(200).json({
            ok: true,
            msg: 'Logged in',
            token
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const loginGoogle = async (req,res=response) => {

    
    try {
        const { email, name, picture} = await googleVerify(req.body.token);

        const user = await User.findOne({email});
        let newUser;

        if(!user){
            newUser = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else{
            newUser = user;
            newUser.google = true;
        }

        await newUser.save();

        //generar JWT

        const token = await generateJWT(newUser.id);


        res.json({
            ok: true,
            email,
            name,
            picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Bad google token'
        });
    }

    
};


module.exports = {
    loginUser,
    loginGoogle
};