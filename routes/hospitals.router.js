const { Router } = require('express');
const { check } = require('express-validator');
const {createHospital,deleteHospital,getHospitals,updateHospital} = require('../controllers/hospitals.controller');
const { validateFields } = require('../middlewares/validate');
const {validateJWT}  = require('../middlewares/validate-jwt');

const router = Router();

router.get("/", validateJWT , getHospitals);


router.post(
  "/",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    //check("createdBy", "No es un MongoID valido").isMongoId(), //desde JWT
    validateFields
  ],
  createHospital
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateFields
  ],
  updateHospital
);

router.delete(
    "/:id",
    [validateJWT],
    deleteHospital
  );



module.exports = router;