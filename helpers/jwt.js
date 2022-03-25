const jwt = require("jsonwebtoken");

const genJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_WORD,
      {
        expiresIn: "5h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No pudo crearse el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  genJWT,
};
