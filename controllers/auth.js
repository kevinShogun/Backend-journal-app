const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const { genJWT } = require("../helpers/jwt");
const { findOne } = require("../models/User");

const registerUser = async (req = express.request, res = express.response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese email",
      });
    }

    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    if (user.active === false) {
      return res.status(404).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }
    // Generar token
    const token = await genJWT(user._id, user.name);
    return res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const loginUser = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {

    let user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Email incorrecto",
      });
    }

    const validPass = bcrypt.compareSync(password, user.password);

    if (!validPass) {
      return res.status(400).json({
        ok: false,
        msg: "Constraseña incorrecta",
      });
    }
    ///
    if (user.active === false) {
      return res.status(404).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    // Generar token
    const token = await genJWT(user._id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const reviewToken = async (req, res = express.response) => {
  const { uid, name } = req;

  const token = await genJWT(uid, name);
  return res.json({
    ok: true,
    token,
  });
};

const updtaeUser = async (req = express.request, res = express.response) => {
  const { id } = req.body;
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    if (user.active === false) {
      return res.status(404).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    const { name, lastName, email } = req.body;
    const newUser = {
      name,
      lastName,
      email,
    };

    user = await User.findByIdAndUpdate(
      { _id: id },
      { $set: newUser },
      { new: true }
    );
   
    const token = await genJWT(user._id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const updtaeUserPass = async (
  req = express.request,
  res = express.response
) => {
  const { id } = req.body;
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    if (user.active === false) {
      return res.status(404).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    const { password } = req.body;
    const newUser = {
      password
    };
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    console.log(newUser);

    user = await User.findByIdAndUpdate(
      { _id: id },
      { password: newUser.password },
      { new: true }
    );
   
    const token = await genJWT(user._id, user.name);
    return res.status(200).json({
      ok: true,
      uid: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

const updtaeUserDelete = async (
  req = express.request,
  res = express.response
) => {
  const { id } = req.body;
  try {
    let user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Esta cuenta ha sido eliminada",
      });
    }

    
    user = await User.findByIdAndUpdate(
      { _id: id },
      { active: false },
      { new: true }
    );
  
    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuniquese con soporte",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  reviewToken,
  updtaeUser,
  updtaeUserPass,
  updtaeUserDelete,
};
