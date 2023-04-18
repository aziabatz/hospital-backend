const mongoose = require('mongoose');
const dbcon = process.env.DBCON;

const dbConnection = async() => {
    try{
        mongoose.connect(dbcon);
        console.log('Conectado a MongoDB');
    } catch(error){
        console.log(error);
        throw new Error('ERROR al conectarse a la base de datos')
    }
};

module.exports = {dbConnection};