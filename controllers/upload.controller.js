const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const User = require('../models/user.model');
const { updateImage } = require('../helpers/update-image');
const path = require('path');

const uploadFile = (req, res=response) => {

    const collection = req.params.collection;
    const id = req.params.id;

    const collections = ['users', 'doctors', 'hospitals'];

    if(!collections.includes(collection)){
        return res.status(400).json({
            ok: false,
            msg: 'La tabla no existe'
        })
    }

    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No se ha enviado ningun archivo'
        });
    }

    const file = req.files.image;
    const nameSplit = file.name.split('.');
    const fileExtension = nameSplit[nameSplit.length -1];

    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión válida'
        });
    }

    const filename = `${uuidv4()}.${fileExtension}`;

    const path = `./uploads/${collection}/${filename}`;

    const found = updateImage(collection, id, path, filename);

    if(found){
        file.mv(path, (err) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al guardar la imagen'
                });
            }
        });

        res.json({
            ok: true,
            msg: 'Archivo subido',
            collection,
            uid: id,
            path
        })
    } else{
        res.status(404).json({
            ok: false,
            msg: 'No se encuentra el objeto en la colección'
        });
    }

    
};


const getImage = (req, res=response) =>{
    const {collection, image} = req.params;

    const pathImage = path.join(__dirname, `../uploads/${collection}/${image}`);
    
    if(fs.existsSync(pathImage)){
        res.sendFile(pathImage);
    } else{
        const pathImage = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImage);
    }
}


module.exports = {
    uploadFile,
    getImage
};