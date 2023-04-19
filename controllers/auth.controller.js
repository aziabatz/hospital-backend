const { response } = require("express");
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

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


module.exports = {
    loginUser
};