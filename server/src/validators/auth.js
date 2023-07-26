const { body } = require("express-validator");

//registration validation
const validateUserRegistration = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required. Enter your full name")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name should be at least 3-31 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required. Enter your email")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required. Enter your Password")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 character long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])[A-Za-z\d@$!*?&]+$/)
    .withMessage(
      "Password should contain at least one uppercase letter,One lowercase letter, one number, and one special Character"
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required. Enter your address")
    .isLength({ min: 3 })
    .withMessage("Address should be at least 3 character long"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required. Enter your phone"),
  body("image")
  // .custom((value,{req})=>{
  //   if(!req.file || !req.file.buffer){
  //     throw new Error("User image is required");

  //   }
  //   return true;
  // })
  .optional()
  .isString()
  .withMessage("Image upload is required"),
];
//sign in validation

module.exports = {
  validateUserRegistration,
};
