const { Router } = require('express');
const { check } = require('express-validator');
const { loginUser } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate');

const router = Router();

router.post('/', [
    check('email', 'El correo es obligatio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], loginUser);

module.exports = router;