const { Router } = require('express');
const { check } = require('express-validator');
const { createDoctor, updateDoctor, deleteDoctor, getDoctors } = require('../controllers/doctors.controller');
const { validateFields } = require('../middlewares/validate');
const {validateJWT}  = require('../middlewares/validate-jwt');

const router = Router();

router.get("/", validateJWT , getDoctors);


router.post(
  "/",
  [ 
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    //check("user", "No es un MongoID válido").isMongoId(),
    check("hospital", "No es un MongoID válido").isMongoId(),
    validateFields
  ],
  createDoctor
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("hospital", "No es un MongoID válido").isMongoId(),
    validateFields
  ],
  updateDoctor
);

router.delete(
    "/:id",
    [validateJWT],
    deleteDoctor
  );



module.exports = router;