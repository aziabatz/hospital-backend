const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser, loginGoogle } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], loginUser);

router.post('/google',
    [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validateFields
    ],
    loginGoogle
);

module.exports = router;