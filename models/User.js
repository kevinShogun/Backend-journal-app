const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true
  },

  lastName: {
      type: String,
      require: true
  },

  email: {
      type: String,
      require: true,
      unique: true
  },

  password: {
      type: String,
      require: true
  },

  creationDate: {
      type: Date,
      default: Date.now()
  },
  active: {
    type: Boolean,
   default: true
},
});

module.exports = model('User', UserSchema);
