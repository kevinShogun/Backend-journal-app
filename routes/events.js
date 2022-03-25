const { Router } = require("express");
const { check } = require("express-validator");

const {
  createEvent,
  updateEvent,
  getEvents,
  deleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validarCampos");
const { validarJWT } = require("../middlewares/validarToken");

const router = Router();

router.use(validarJWT);

router.get("/getAllEvents", getEvents);

router.post(
  "/createEvent",
  [
    check("title", "El título debe ser obligatorio").notEmpty(),
    check("bgColor", "El Background color debe ser obligatorio").notEmpty(),
    check("startDate", "La fecha de inicio es requerida").custom(isDate),
    check("endDate", "La fecha de finalización es requerida").custom(isDate),
    validarCampos,
  ],
  createEvent
);

router.put(
  "/updateEvent",
  [
    check("title", "El título debe ser obligatorio").notEmpty(),
    check("bgColor", "El Background color debe ser obligatorio").notEmpty(),
    check("startDate", "La fecha de inicio es requerida").custom(isDate),
    check("endDate", "La fecha de finalización es requerida").custom(isDate),
    validarCampos,
  ],
  updateEvent
);

router.put(
  "/deleteEvent",
  [check("id", "El id debe ser obligatorio").notEmpty(), validarCampos],
  deleteEvent
);

module.exports = router;
