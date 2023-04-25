const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise((resolve, reject) =>{

        const payload = {
            uid
        };
        jwt.sign(payload, process.env.JWTKEY, {
            expiresIn: '24h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('Error al generar JWT');
            } else{
                resolve(token);    
            }
        });
    });

};

module.exports = {
    generateJWT
};

