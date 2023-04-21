const { Router } = require('express');
const { searchAll, searchCollection } = require('../controllers/search.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validate } = require('../models/user.model');


const router = Router();

router.get('/:query', 
    validateJWT,
    searchAll);

router.get('/:collection/:query', validateJWT, searchCollection);



module.exports = router;