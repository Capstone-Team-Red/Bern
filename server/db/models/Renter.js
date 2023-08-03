const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 5;

const Renter = db.define("renter", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  role: {
    type: Sequelize.ENUM("Renter"),
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    get() {
      return this.getDataValue("password");
    },
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Renter;

/**
 * instanceMethods
 */
Renter.prototype.correctPassword = function (candidatePwd) {
  return bcrypt.compare(candidatePwd, this.password);
};

Renter.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
Renter.authenticateRenter = async function ({ username, password }) {
  console.log('Authenticating renter: ', username);
  const renter = await Renter.findOne({ where: { username } });
  if (!renter || !(await renter.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return renter;
};

Renter.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const renter = await Renter.findByPk(id);
    if (!renter) {
      throw new Error('Renter not found');
    }
    return renter;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (renter) => {
  if (renter.changed("password")) {
    renter.password = await bcrypt.hash(renter.password, SALT_ROUNDS);
  }
};

Renter.beforeCreate(hashPassword);
Renter.beforeUpdate(hashPassword);
Renter.beforeBulkCreate((renters) => Promise.all(renters.map(hashPassword)));
