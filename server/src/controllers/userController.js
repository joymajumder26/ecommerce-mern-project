const createError = require("http-errors");


const getUsers = (req, res, next) => {
  try {
    res.status(200).send({ message: "User profile is returned" }); //json format a dekhabe
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
};
