const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const {
  UPLOAD_USER_IMG_DIRECTORY,
  ALLOWED_FILE_TYPES,
  MAX_FILE_SIZE,
} = require("../config");

const { upload_dir } = require("../secret");
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_USER_IMG_DIRECTORY);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(
      null,
      Date.now() + "-" + file.originalname.replace(extname, "") + extname
    );
  },
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname);
  if (!ALLOWED_FILE_TYPES.includes(extname.substring(1))) {

    return cb(new Error ("File type not allowed"),false);
  }
  cb(null, true);
};
// const fileFilter = (req, file, cb) => {
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only images files are allowed"), false);
//   }
//   if (file.size > MAX_FILE_SIZE) {
//     return cb(new Error("File size exceeds the maximum limit"), false);
//   }
//   if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
//     return cb(new Error("File type is not allowed"), false);
//   }
//   cb(null, true);
// };

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});
// const upload = multer({
//   storage: storage,
  
//   fileFilter:fileFilter,
// });

module.exports = upload;
