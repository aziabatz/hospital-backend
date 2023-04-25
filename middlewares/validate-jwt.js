const jwt = require("jsonwebtoken");
const { generateJWT } = require("../helpers/jwt");


const validateJWT = (req,res,next) => {

    const token = req.header('x-token');

    console.log(token);

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWTKEY, {});
        req.uid = uid;
        next();
        

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        })
    }

};

const renewToken = async (req,res,next) => {

    const uid = req.uid;
    const token = await generateJWT(uid)

    res.json({
        ok:true,
        token,
        uid
    });
};

module.exports = {
    validateJWT,
    renewToken
};