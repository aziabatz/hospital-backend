const { Router } = require('express');
const { uploadFile, getImage } = require('../controllers/upload.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const fileUpload = require('express-fileupload')

const router = Router();

router.use(fileUpload());

router.get('/:collection/:image', validateJWT, getImage)

router.put('/:collection/:id',
    validateJWT,
    uploadFile);



module.exports = router;