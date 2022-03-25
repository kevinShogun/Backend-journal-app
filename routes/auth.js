const { Router } = require("express");
const { check } = require("express-validator");

const { registerUser, loginUser, reviewToken, updtaeUser, updtaeUserPass, updtaeUserDelete } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarToken");

const router = Router();

router.post(
  "/register",
  [
    //  Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").normalizeEmail().isEmail(),
    check("password", "El contraseña es obligatorio").isLength({ min: 6 }),
    validarCampos
  ],
  registerUser
);

router.put(
  "/updateUser",
  [
    //  Middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").normalizeEmail().isEmail(),
    validarJWT,
    validarCampos
  ],
  updtaeUser
);

router.put(
  "/updateUserPass",
  [
    //  Middlewares
    check("password", "El contraseña es obligatorio").isLength({ min: 6 }),
    validarJWT,
    validarCampos
  ],
  updtaeUserPass
);

router.put(
  "/updateUserDelete",
  [
    //  Middlewares
    [check("id", "El id debe ser obligatorio").notEmpty(), validarCampos],
    validarCampos
  ],
  updtaeUserDelete
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").normalizeEmail().isEmail(),
    check("password", "El contraseña es obligatorio").isLength({ min: 6 }),
    validarCampos
  ],
  loginUser
);



router.get("/ReviewToken", validarJWT, reviewToken);

module.exports = router;
