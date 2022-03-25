const express = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req = express.request, res = express.response, next) => {
  //  x-token en los headers

  const token = req.header("x-token");

  if (!token) {
    return res.status(400).json({
      ok: false,
      msg: "Acceso denegado favor de volver a iniciar sesión",
    });
  }

  try {
    
    const {uid, name} = jwt.verify(token, process.env.SECRET_WORD);

    req.uid = uid;
    req.name = name

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token invalido",
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
