const mommet = require("moment");

const isDate = (value) => {
  if (!value) {
    return false;
  }

  const fecha = mommet(value);

  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
