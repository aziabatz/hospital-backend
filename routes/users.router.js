const { Router, application } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT , getUsers);
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "COntraseña obligatoria").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete(
    "/:id",
    [validateJWT],
    deleteUser
  );

module.exports = router;
